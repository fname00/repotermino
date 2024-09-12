import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const {
      location,
      listingStatus,
      propertyTypes,
      priceRange,
      bedrooms,
      bathrooms,
      squarefeet,
      yearBuild,
      categories,
      searchQuery,
      holiday,
    } = req.query;

    const whereClause = {
      ...(location && location !== "All Cities" ? { city: location } : {}),
      ...(listingStatus && listingStatus !== "All" ? { forRent: listingStatus === "Rent" } : {}),
      ...(propertyTypes && propertyTypes.length ? { propertyType: { in: propertyTypes.split(',') } } : {}),
      ...(bedrooms ? { bed: { gte: parseInt(bedrooms, 10) } } : {}),
      ...(bathrooms ? { bath: { gte: parseInt(bathrooms, 10) } } : {}),
      ...(priceRange && priceRange.length ? {
        price: {
          gte: parseFloat(priceRange.split(',')[0]),
          lte: parseFloat(priceRange.split(',')[1]),
        },
      } : {}),
      ...(squarefeet && squarefeet.length ? {
        sqft: {
          gte: parseInt(squarefeet.split(',')[0], 10),
          lte: parseInt(squarefeet.split(',')[1], 10),
        },
      } : {}),
      ...(yearBuild && yearBuild.length ? {
        yearBuilding: {
          gte: parseInt(yearBuild.split(',')[0], 10),
          lte: parseInt(yearBuild.split(',')[1], 10),
        },
      } : {}),
      ...(categories && categories.length ? { features: { hasEvery: categories.split(',') } } : {}),
      ...(searchQuery ? {
        OR: [
          { city: { contains: searchQuery, mode: 'insensitive' } },
          { location: { contains: searchQuery, mode: 'insensitive' } },
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { features: { hasSome: searchQuery.split(' ') } }
        ]
      } : {}),
      ...(holiday === "true" ? { holiday: true } : {})
    };

    const listings = await prisma.listing.findMany({
      where: whereClause,
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error('Error in /api/listings/filter:', error);
    res.status(500).json({ error: 'Failed to fetch listings', details: error.message });
  }
}