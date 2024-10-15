import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const { locale } = req.query; // Get the requested locale from the query parameters

  try {
    // Fetch the listing with the relevant localized fields based on the requested locale
    const listing = await prisma.listing.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        image: true,
        images: true,
        title: true,
        city: true,
        location: true,
        country: true,
        bed: true,
        bath: true,
        garage: true,
        sqft: true,
        propertyType: true,
        price: true,
        forRent: true,
        features: true,
        description: true,
        dateAdd: true,
        holiday: true,
        // Conditionally include localized fields based on the requested locale
        ...(locale === 'en' && {
          title_en: true,
          features_en: true,
          description_en: true,
        }),
        ...(locale === 'pl' && {
          title_pl: true,
          features_pl: true,
          description_pl: true,
        }),
        ...(locale === 'es' && {
          title_es: true,
          features_es: true,
          description_es: true,
        }),
      },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Map the listing to return the correct localized fields based on the locale
    const localizedListing = {
      ...listing,
      title:
        locale === 'en'
          ? listing.title_en || listing.title
          : locale === 'pl'
          ? listing.title_pl || listing.title
          : locale === 'es'
          ? listing.title_es || listing.title
          : listing.title,
      location:
        locale === 'en'
          ? listing.location_en || listing.location
          : locale === 'pl'
          ? listing.location_pl || listing.location
          : locale === 'es'
          ? listing.location_es || listing.location
          : listing.location,
      propertyType:
        locale === 'en'
          ? listing.propertyType_en || listing.propertyType
          : locale === 'pl'
          ? listing.propertyType_pl || listing.propertyType
          : locale === 'es'
          ? listing.propertyType_es || listing.propertyType
          : listing.propertyType,
      features:
        locale === 'en'
          ? listing.features_en || listing.features
          : locale === 'pl'
          ? listing.features_pl || listing.features
          : locale === 'es'
          ? listing.features_es || listing.features
          : listing.features,
      description:
        locale === 'en'
          ? listing.description_en || listing.description
          : locale === 'pl'
          ? listing.description_pl || listing.description
          : locale === 'es'
          ? listing.description_es || listing.description
          : listing.description,
    };

    res.status(200).json(localizedListing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
}
