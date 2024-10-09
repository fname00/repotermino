import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: {
    async getAdapter() {
      return {
        async createUser(user) {
          return await prisma.user.create({ data: user });
        },
        async getUser(id) {
          return await prisma.user.findUnique({ where: { id: id } });
        },
        async getUserByEmail(email) {
          return await prisma.user.findUnique({ where: { email: email } });
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.hashedPassword) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
          if (isValidPassword) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          role: token.role, // Dodanie roli do sesji
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; // Dodanie roli do tokena JWT
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
