// scripts/duplicateRows.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function duplicateRows() {
  try {
    // Fetch all rows from the table
    const rows = await prisma.Listing.findMany();

    // Prepare the data for duplication
    const duplicatedRows = rows.map(row => {
      const { id, ...data } = row; // Remove the ID (assuming it's an auto-incremented field)
      return data;
    });

    // Insert duplicated rows
    await prisma.Listing.createMany({
      data: duplicatedRows,
    });

    console.log('Rows duplicated successfully!');
  } catch (error) {
    console.error('Error duplicating rows:', error);
  } finally {
    await prisma.$disconnect();
  }
}

duplicateRows();