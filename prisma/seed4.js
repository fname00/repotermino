const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("haslo", 10); // Zmień "twoje_haslo_admina" na wybrane hasło

  await prisma.user.upsert({
    where: { email: "123@123.com" }, // Zmień na e-mail administratora
    update: {},
    create: {
      name: "Administrator",
      email: "1234@123.com", // Zmień na e-mail administratora
      hashedPassword: hashedPassword,
      role: "admin", // Przypisz rolę "admin"
    },
  });

  console.log("Administrator został dodany do bazy danych.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
