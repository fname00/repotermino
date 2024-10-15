import axios from 'axios';
import { PrismaClient } from '@prisma/client'; // Assuming Prisma is being used
const prisma = new PrismaClient();

const TRANSLATION_API_KEY = process.env.TRANSLATION; // Use the TRANSLATION environment variable

export default async function handler(req, res) {
  try {
    console.log('Fetching listings with untranslated fields...');
    
    // Fetch up to 10 listings with translated = false
    const listings = await prisma.listing.findMany({
      where: {
        translated: false,
      },
      take: 10, // Limit the result to 10 listings
    });

    console.log(`Found ${listings.length} listings to translate.`);

    for (let listing of listings) {
      const translatedFields = {};
      console.log(`Translating listing ID: ${listing.id} with title: "${listing.title}"`);

      // Prepare translation requests for title
      const requests = [];
      if (!listing.title_en) {
        requests.push(translateText(listing.title, 'en'));
      }
      if (!listing.title_es) {
        requests.push(translateText(listing.title, 'es'));
      }
      if (!listing.title_pl) {
        requests.push(translateText(listing.title, 'pl'));
      }

      // Prepare translation requests for description
      if (!listing.description_en) {
        requests.push(translateText(listing.description, 'en'));
      }
      if (!listing.description_es) {
        requests.push(translateText(listing.description, 'es'));
      }
      if (!listing.description_pl) {
        requests.push(translateText(listing.description, 'pl'));
      }

      // Prepare translation requests for features
      if (!listing.features_en) {
        requests.push(translateText(listing.features, 'en'));
      }
      if (!listing.features_es) {
        requests.push(translateText(listing.features, 'es'));
      }
      if (!listing.features_pl) {
        requests.push(translateText(listing.features, 'pl'));
      }

      const translations = await Promise.all(requests);

      // Map translations to fields
      let translationIndex = 0;
      if (!listing.title_en) {
        translatedFields.title_en = translations[translationIndex++];
      }
      if (!listing.title_es) {
        translatedFields.title_es = translations[translationIndex++];
      }
      if (!listing.title_pl) {
        translatedFields.title_pl = translations[translationIndex++];
      }

      if (!listing.description_en) {
        translatedFields.description_en = translations[translationIndex++];
      }
      if (!listing.description_es) {
        translatedFields.description_es = translations[translationIndex++];
      }
      if (!listing.description_pl) {
        translatedFields.description_pl = translations[translationIndex++];
      }

      if (!listing.features_en) {
        translatedFields.features_en = translations[translationIndex++];
      }
      if (!listing.features_es) {
        translatedFields.features_es = translations[translationIndex++];
      }
      if (!listing.features_pl) {
        translatedFields.features_pl = translations[translationIndex++];
      }

      // Log translations
      console.log(`Translations for listing ID: ${listing.id}`, translatedFields);

      // Update the database with the translated values and set translated to true
      await prisma.listing.update({
        where: { id: listing.id },
        data: {
          ...translatedFields,
          translated: true, // Set translated to true
        },
      });

      console.log(`Updated listing ID: ${listing.id} with translations: ${JSON.stringify(translatedFields)}`);
    }

    res.status(200).json({ message: 'Translations updated successfully' });
  } catch (error) {
    console.error('Error translating data:', error);
    res.status(500).json({ error: 'Failed to translate data' });
  }
}

// Function to call Google Translation API
async function translateText(text, targetLanguage) {
  try {
    // Send the API key as a query parameter in the URL
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${TRANSLATION_API_KEY}`, {
      q: text,
      target: targetLanguage,
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(`Error translating "${text}" to ${targetLanguage}:`, error.response ? error.response.data : error.message);
    return null; // Return null if translation fails
  }
}
