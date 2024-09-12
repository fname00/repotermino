// /pages/api/listings.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    listingStatus = "All",
    propertyTypes = [],
    priceRange = [0, 10000000],
    bedrooms = 0,
    bathroms = 0,
    location = "All Cities",
    squirefeet = [],
    yearBuild = [0, 2050],
    categories = [],
    searchQuery = "",
    pageNumber = 1,
    pageSize = 12,
    currentSortingOption = "Newest",
  } = req.query;

  try {
    // Fetch listings from the database
    let listings = await prisma.listing.findMany();

    // Apply filters
    if (listingStatus !== "All") {
      listings = listings.filter(elm => 
        listingStatus === "Holiday" ? elm.holiday : 
        (listingStatus === "Buy" ? !elm.forRent : elm.forRent)
      );
    }
    if (propertyTypes.length > 0) {
      listings = listings.filter(elm => propertyTypes.includes(elm.propertyType));
    }
    if (bedrooms > 0) {
      listings = listings.filter(elm => elm.bed >= bedrooms);
    }
    if (bathroms > 0) {
      listings = listings.filter(elm => elm.bath >= bathroms);
    }
    if (searchQuery) {
      listings = listings.filter(elm =>
        elm.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elm.features.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (categories.length > 0) {
      listings = listings.filter(elm => categories.every(cat => elm.features.includes(cat)));
    }
    if (location !== "All Cities") {
      listings = listings.filter(elm => elm.city === location);
    }
    if (priceRange.length === 2) {
      listings = listings.filter(elm =>
        Number(elm.price.replace(/[^0-9.-]+/g, "")) >= priceRange[0] &&
        Number(elm.price.replace(/[^0-9.-]+/g, "")) <= priceRange[1]
      );
    }
    if (squirefeet.length === 2) {
      listings = listings.filter(elm => elm.sqft >= squirefeet[0] && elm.sqft <= squirefeet[1]);
    }
    if (yearBuild.length === 2) {
      listings = listings.filter(elm => elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1]);
    }

    // Apply sorting
    listings.sort((a, b) => {
      if (currentSortingOption === "Newest") {
        return b.yearBuilding - a.yearBuilding;
      } else if (currentSortingOption.trim() === "Price Low") {
        return Number(a.price.replace(/[^0-9.-]+/g, "")) - Number(b.price.replace(/[^0-9.-]+/g, ""));
      } else if (currentSortingOption.trim() === "Price High") {
        return Number(b.price.replace(/[^0-9.-]+/g, "")) - Number(a.price.replace(/[^0-9.-]+/g, ""));
      }
      return 0;
    });

    // Pagination
    const paginatedListings = listings.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

    res.status(200).json({
      data: paginatedListings,
      total: listings.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching listings' });
  }
}
