// /prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const activities = require(path.resolve(__dirname, '../src/data/activity'));

async function seed() {
  for (const activity of activities) {
    await prisma.activity.create({
      data: {
        image: activity.image,
        images: activity.images,
        title: activity.title,
        city: activity.city,
        location: activity.location,
        duration: activity.duration,
        price: activity.price,
        discount: activity.discount || null, // Optional field
        forRent: activity.forRent,
        tags: activity.tags,
        cancellation: activity.cancellation || null, // Optional field
        featured: activity.featured,
        availability: activity.availability || null, // Optional field
        description: activity.description,
      },
    });
  }
  console.log('Data imported successfully');
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
