import axios from 'axios';
import fs from 'fs'; // File system module to write files
import path from 'path'; // Module to handle file paths

const TRANSLATION_API_KEY = process.env.TRANSLATION; // Use the TRANSLATION environment variable

// Original dictionary to be translated, assumed to be loaded from ./public/locales/pl
const dictionaryPath = path.join(__dirname, '../../../../public/locales/pl/common.json');
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));



// Function to call Google Translation API
async function translateText(text, targetLanguage) {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATION_API_KEY}`,
      {
        q: text,
        target: targetLanguage
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(`Error translating "${text}" to ${targetLanguage}:`, error.response ? error.response.data : error.message);
    return null; // Return null if translation fails
  }
}

// Recursive function to translate dictionary, including nested objects
async function translateDictionary(dictionary, targetLanguage) {
  const translatedDictionary = {};

  for (const [key, value] of Object.entries(dictionary)) {
    if (typeof value === 'object' && value !== null) {
      // If the value is an object, recursively translate its keys
      translatedDictionary[key] = await translateDictionary(value, targetLanguage);
    } else {
      // Translate string values
      const translatedText = await translateText(value, targetLanguage);
      translatedDictionary[key] = translatedText || value;
    }
  }

  return translatedDictionary;
}

// Function to write the translated dictionary to a file
function saveToFile(translatedDictionary, languageCode) {
  const fileName = path.join('./public/locales', languageCode, 'common.json');
  fs.mkdirSync(path.dirname(fileName), { recursive: true }); // Ensure directory exists
  fs.writeFileSync(fileName, JSON.stringify(translatedDictionary, null, 2));
  console.log(`Dictionary saved to ${fileName}`);
}

export default async function handler(req, res) {
  try {
    console.log('Translating dictionary...');

    // Translate dictionary to English
    const englishDictionary = await translateDictionary(dictionary, 'en');
    saveToFile(englishDictionary, 'en');

    // Translate dictionary to Spanish
    const spanishDictionary = await translateDictionary(dictionary, 'es');
    saveToFile(spanishDictionary, 'es');

    res.status(200).json({ message: 'Dictionaries translated and saved successfully.' });
  } catch (error) {
    console.error('Error translating dictionary:', error);
    res.status(500).json({ error: 'Failed to translate dictionary.' });
  }
}
