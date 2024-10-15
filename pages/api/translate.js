import axios from 'axios';
import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();

const TRANSLATION_API_KEY = process.env.TRANSLATION; 

export default async function handler(req, res) {
  try {
    console.log('Fetching listings with untranslated fields...');

    // Fetch up to 100 listings with translated = true
    const listings = await prisma.listing.findMany({
      where: {
        translated: false,
      },
      take: 1000,
    });

    console.log(`Found ${listings.length} listings to translate.`);

    for (let listing of listings) {
      const translatedFields = {};
      console.log(`Translating listing ID: ${listing.id} with title: "${listing.title}"`);

      // Prepare translation requests for title, description, and features
      const requests = [
        translateText(listing.title, 'en'),
        translateText(listing.title, 'es'),
        translateText(listing.title, 'pl'),
        translateText(listing.description, 'en'),
        translateText(listing.description, 'es'),
        translateText(listing.description, 'pl'),
        translateText(listing.features, 'en'),
        translateText(listing.features, 'es'),
        translateText(listing.features, 'pl'),
      ];

      const translations = await Promise.all(requests);

      // Map translations to corresponding fields
      translatedFields.title_en = translations[0];
      translatedFields.title_es = translations[1];
      translatedFields.title_pl = translations[2];
      translatedFields.description_en = translations[3];
      translatedFields.description_es = translations[4];
      translatedFields.description_pl = translations[5];
      translatedFields.features_en = translations[6];
      translatedFields.features_es = translations[7];
      translatedFields.features_pl = translations[8];

      // Log translations
      console.log(`Translations for listing ID: ${listing.id}`, translatedFields);

      // Update the database with the translated values and keep translated: true
      await prisma.listing.update({
        where: { id: listing.id },
        data: {
          ...translatedFields,
          translated: true,
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
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATION_API_KEY}`,
      {
        q: text,
        target: targetLanguage,
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(`Error translating "${text}" to ${targetLanguage}:`, error.response ? error.response.data : error.message);
    return null;
  }
}
