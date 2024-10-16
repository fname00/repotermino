const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.activity.create({
    data: {
      id: 2,
      image: "/images/activity/activity-11.jpg",
      images: [
        "/images/activity/activity-11.jpg",
        "/images/activity/activity-13.jpg",
        "/images/activity/activity-12.jpg"
      ],
      title: "Luxury Catamaran Cruise with Brunch and Unlimited Drinks",
      city: "Tenerife",
      location: "Costa Adeje, Tenerife, Spain",
      duration: "240 min",
      price: 60.00,  // Base price
      discount: null,  // Nullable discount field
      forRent: false,
      tags: ["cruise", "luxury", "brunch"],
      cancellation: "Free cancellation",
      featured: true,
      availability: "Limited offer",
      description: "Enjoy a luxurious cruise on a catamaran with brunch and unlimited drinks, exploring the beautiful coastline of Tenerife.",
      
      // New fields representing participant limits and discounts
      maxPersons: 20,  // Maximum total participants
      minAdults: 2,    // Minimum 2 adults
      maxAdults: 10,   // Maximum 10 adults
      minKids: 0,      // No minimum kids required
      maxKids: 5,      // Maximum 5 kids allowed
      minYouth: 0,     // No minimum youth required
      maxYouth: 5,     // Maximum 5 youth allowed
      discountAdults: 10.00,  // 10% discount for adults
      discountKids: 15.00,    // 15% discount for kids
      discountYouth: 5.00     // 5% discount for youth
    }
  });
  
  console.log('Activity data with new fields inserted successfully.');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
