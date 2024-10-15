// /pages/api/locations.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const cities = await prisma.listing.groupBy({
      by: ['city'],
      _count: {
        city: true,
      },
      orderBy: {
        _count: {
          city: 'desc',
        },
      },
      take: 200, // Limit to 100 results
    });

    // Map the results to a more readable format for react-select
    const formattedCities = cities.map(city => ({
      value: city.city,          // Use the city name as the value
      label: city.city,          // Use the city name as the label
      count: city._count.city,   // Optionally include count if needed
    }));

    res.status(200).json(formattedCities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
