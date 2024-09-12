// /pages/api/listing/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
}
