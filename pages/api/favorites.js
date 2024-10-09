// /pages/api/favorites.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { ids, locale = 'en' } = req.query;

  if (!ids) {
    return res.status(400).json({ error: 'No listing IDs provided.' });
  }

  // Convert the comma-separated ids string into an array of integers
  const listingIds = ids.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));

  try {
    // Fetch listings from the database using the provided IDs
    const listings = await prisma.listing.findMany({
      where: {
        id: { in: listingIds },
      },
    });

    // Translate or filter listings based on locale
    const localizedListings = listings.map(listing => {
      if (locale === 'pl') {
        listing.title = listing.title_pl; // Assume title_pl exists in the database
        listing.description = listing.description_pl; // Assume description_pl exists
      } else if (locale === 'es') {
        listing.title = listing.title_es; // Assume title_es exists in the database
        listing.description = listing.description_es; // Assume description_es exists
      }
      return listing;
    });

    res.status(200).json(localizedListings); // Return an array
  } catch (error) {
    console.error('Error fetching favorite listings:', error);
    res.status(500).json({ error: 'Error fetching favorite listings' });
  }
}
