// /pages/api/listings.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    locale = 'pl', // Default locale is English
    listingStatus = "All",
    propertyTypes = [],
    priceRange = [0, 2000000],
    bedrooms = 0,
    bathrooms = 0,
    location = "All Cities",
    squirefeet = [],
    yearBuild = [0, 2050],
    categories = [],
    searchQuery = "",
    pageNumber = 1,
    pageSize = 12,
    currentSortingOption = "Price High",
  } = req.query;

  try {
    // Fetch listings from the database
    let listings = await prisma.listing.findMany();

    // Translate or filter listings based on locale
    listings = listings.map(listing => {
      if (locale === 'pl') {
        // Transform fields for Polish locale
        listing.title = listing.title_pl; // Assume title_pl exists in the database
        listing.description = listing.description_pl; // Assume description_pl exists
        // Add more fields as necessary
      } else if (locale === 'es') {
        // Transform fields for Spanish locale
        listing.title = listing.title_es; // Assume title_es exists in the database
        listing.description = listing.description_es; // Assume description_es exists
        // Add more fields as necessary
      }
      // Return the listing with localized content
      return listing;
    });

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
    if (bathrooms > 0) {
      listings = listings.filter(elm => elm.bath >= bathrooms);
    }
    if (searchQuery) {
      listings = listings.filter(elm =>
        elm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elm.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elm.features.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (categories.length > 0) {
      listings = listings.filter(elm => categories.every(cat => elm.features.includes(cat)));w
    }
    if (location !== "All Cities") {
      listings = listings.filter(elm => elm.city === location);
    }
    // Parse price range into an array of numbers
    const parsedPriceRange = Array.isArray(priceRange) 
      ? priceRange.map(Number) 
      : priceRange.split(',').map(Number); // Ensure parsing works

    console.log("Parsed price range:", parsedPriceRange); // Log parsed price range
    console.log("Listing prices:", listings.map(elm => elm.price)); // Log listing prices

    // Apply price range filtering
    if (parsedPriceRange.length === 2) {
      listings = listings.filter(elm =>
        elm.price >= parsedPriceRange[0] && elm.price <= parsedPriceRange[1]
      );
    }
    
    if (squirefeet.length === 2) {
      const minSqft = parseInt(squirefeet[0], 10); // Convert to integer
      const maxSqft = parseInt(squirefeet[1], 10); // Convert to integer
    
      listings = listings.filter(elm => elm.sqft >= minSqft && elm.sqft <= maxSqft);
    }

    if (yearBuild.length === 2) {dashboard
      listings = listings.filter(elm => elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1]);
    }

  // Apply sorting
  listings.sort((a, b) => {
    if (currentSortingOption === "Newest") {
      return b.yearBuilding - a.yearBuilding;
    } else if (currentSortingOption.trim() === "Price Low") {
      return a.price - b.price; // Direct integer comparison
    } else if (currentSortingOption.trim() === "Price High") {
      return b.price - a.price; // Direct integer comparison
    }
    return 0; // Default case, no sorting
  });

    // Pagination
    const paginatedListings = listings.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

    res.status(200).json({
      data: paginatedListings,
      total: listings.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching listings', details: error.message });
  }
}
