// /pages/api/listings/other-in-area.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { city, id } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const listings = await prisma.listing.findMany({
      where: {
        city,
        id: {
          not: parseInt(id),
        },
      },
      take: 3, // Fetch only 3 other listings
    });


    res.status(200).json(listings);
  } catch (error) {
    console.error('Failed to fetch other listings:', error); // Log error
    res.status(500).json({ error: 'Failed to fetch other listings' });
  }
}
