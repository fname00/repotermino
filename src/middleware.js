import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Możesz tu dodać dodatkową logikę, jeśli potrzebujesz
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Autoryzuj tylko użytkowników z rolą "admin"
        return token?.role === "admin";
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard-home/:path*"],
};
