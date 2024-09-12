// /prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const listings = require(path.resolve(__dirname, '../src/data/listings'));

async function seed() {
  for (const listing of listings) {
    await prisma.listing.create({
      data: {
        image: listing.image,
        images: listing.images,
        title: listing.title,
        city: listing.city,
        location: listing.location,
        address: listing.address,
        zipCode: listing.zipCode,
        area: listing.area,
        country: listing.country,
        lat: listing.lat,
        long: listing.long,
        clientPhone: listing.clientPhone,
        bed: parseInt(listing.bed, 10),
        bath: parseInt(listing.bath, 10),
        garage: parseInt(listing.garage, 10),
        garageSize: parseInt(listing.garageSize, 10),
        sqft: listing.sqft,
        propertyType: listing.propertyType,
        yearBuilding: listing.yearBuilding,
        price: listing.price,
        forRent: listing.forRent,
        tags: listing.tags,
        features: listing.features,
        description: listing.description,
        dateAdd: new Date(listing.dateAdd),
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
