import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        title,
        city,
        location,
        duration,
        price,
        discount,
        maxPersons,
        minAdults,
        maxAdults,
        minKids,
        maxKids,
        minYouth,
        maxYouth,
        discountAdults,
        discountKids,
        discountYouth,
        forRent,
        cancellation,
        tags,
        featured,
        availability,
        description,
        images,
      } = req.body;

      // Function to generate random 20-character string
      const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };

      const link_random = generateRandomString(20);

      // Convert string values to integers where needed
      const priceValue = parseFloat(price) || 0.00;
      const discountValue = discount ? parseFloat(discount) : null;
      const maxPersonsValue = parseInt(maxPersons, 10) || 0;
      const minAdultsValue = parseInt(minAdults, 10) || 0;
      const maxAdultsValue = parseInt(maxAdults, 10) || 0;
      const minKidsValue = parseInt(minKids, 10) || 0;
      const maxKidsValue = parseInt(maxKids, 10) || 0;
      const minYouthValue = parseInt(minYouth, 10) || 0;
      const maxYouthValue = parseInt(maxYouth, 10) || 0;
      const discountAdultsValue = parseFloat(discountAdults) || 0.00;
      const discountKidsValue = parseFloat(discountKids) || 0.00;
      const discountYouthValue = parseFloat(discountYouth) || 0.00;

      // Get the first image or set a default value
      const mainImage = images && images.length > 0 ? images[0] : "/images/listings/default.jpg";

      // Create a new activity in the database
      const newActivity = await prisma.activity.create({
        data: {
          title: title || "Activity",
          city: city || "No information provided",
          location: location || "No information provided",
          duration: duration,
          price: priceValue,
          discount: discountValue,
          maxPersons: maxPersonsValue,
          minAdults: minAdultsValue,
          maxAdults: maxAdultsValue,
          minKids: minKidsValue,
          maxKids: maxKidsValue,
          minYouth: minYouthValue,
          maxYouth: maxYouthValue,
          discountAdults: discountAdultsValue,
          discountKids: discountKidsValue,
          discountYouth: discountYouthValue,
          forRent: forRent || false,
          tags: tags || [],
          cancellation: cancellation || "No cancellation policy provided",
          featured: featured || false,
          availability: availability || "No availability information",
          description: description || "No description provided",
          images: images || ["/images/listings/default.jpg", "/images/listings/default.jpg"],
          image: mainImage, // Save the first image as a separate column
          dateAdd: new Date(), // Automatically add current date
        },
      });

      // Send back success response
      res.status(200).json({ success: true, data: newActivity });

    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to create activity.' });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ message: 'Method not allowed. Use POST method.' });
  }
}
