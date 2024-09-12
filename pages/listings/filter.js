// /pages/api/listings/filter.js
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
      bathroms,
      squirefeet,
      yearBuild,
      categories,
      searchQuery,
      holiday, // Add holiday filter
    } = req.query;

    const whereClause = {
      ...(location && location !== "All Cities" ? { city: location } : {}),
      ...(listingStatus !== "All" ? { forRent: listingStatus === "Rent" } : {}),
      ...(propertyTypes.length ? { propertyType: { in: propertyTypes } } : {}),
      ...(bedrooms ? { bed: { gte: parseInt(bedrooms) } } : {}),
      ...(bathroms ? { bath: { gte: parseInt(bathroms) } } : {}),
      ...(priceRange.length ? {
        price: {
          gte: parseFloat(priceRange[0]),
          lte: parseFloat(priceRange[1]),
        },
      } : {}),
      ...(squirefeet.length ? {
        sqft: {
          gte: parseInt(squirefeet[0]),
          lte: parseInt(squirefeet[1]),
        },
      } : {}),
      ...(yearBuild.length ? {
        yearBuilding: {
          gte: parseInt(yearBuild[0]),
          lte: parseInt(yearBuild[1]),
        },
      } : {}),
      ...(categories.length ? { features: { hasEvery: categories } } : {}),
      ...(searchQuery ? {
        OR: [
          { city: { contains: searchQuery, mode: 'insensitive' } },
          { location: { contains: searchQuery, mode: 'insensitive' } },
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { features: { hasSome: searchQuery.split(' ') } }
        ]
      } : {}),
      ...(holiday === "true" ? { holiday: true } : {}) // Add holiday filter
    };

    const listings = await prisma.listing.findMany({
      where: whereClause,
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
}
