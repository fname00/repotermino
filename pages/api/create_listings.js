import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        title,
        city,
        location,
        country,
        bed,
        bath,
        garage,
        storage,
        sqft,
        propertyType,
        price,
        forRent,
        description,
        features,
        images,
        published,
        link,
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
    const garageValue = garage > 0;

      // Create a new listing in the database
      const newListing = await prisma.listing.create({
        data: {
          title: title || "Real estate", // Default value if none provided
          city: city || "No information provided",
          location: location || "No information provided",
          country: country || "No information provided",
          bed: bed || 0,
          bath: bath || 0,
          garage: garageValue || false,
          storage: storage || false,
          sqft: sqft || 0,
          propertyType: propertyType || "Unknown",
          price: price || 0.00,
          forRent: forRent || false,
          description: description || "No description provided",
          features: features || "No features provided",
          images: images || ["/images/listings/default.jpg", "/images/listings/default.jpg"],
          published: published || false,
          link: link || link_random,
        },
      });

      // Send back success response
      res.status(200).json({ success: true, data: newListing });

    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to create listing.' });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ message: 'Method not allowed. Use POST method.' });
  }
}
