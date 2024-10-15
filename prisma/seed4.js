const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash("", 10); // Change "haslo" to your desired admin password

    await prisma.user.create({
      data: {
        name: "Administrator",
        email: "toka.poland@gmail.com", // Change to admin email
        hashedPassword: hashedPassword,
        role: "admin", // Assign role as "admin"
      },
    });

    console.log("Administrator został dodany do bazy danych.");
  } catch (error) {
    if (error.code === 'P2002') {
      console.error("User already exists.");
    } else {
      console.error("An error occurred:", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
