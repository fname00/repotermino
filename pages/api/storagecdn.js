// /pages/api/updateListings.js

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// Funkcja generująca losowy ciąg alfanumeryczny
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const bunnyStorageZone = 'tenerife';
  const bunnyApiKey = '5449eb98-6cf5-42ec-a56db87b08ee-4ccd-42ba';
  const bunnyRegion = ''; // Leave empty if using default region
  const baseUrl = bunnyRegion ? `${bunnyRegion}.storage.bunnycdn.com` : `storage.bunnycdn.com`;

  try {
    // Pobierz 10 rekordów, gdzie published jest false
    const listings = await prisma.listing.findMany({
      where: {
        published: false,
        pictures: {
          startsWith: 'https://',
        },
      },
      take: 1000,
    });

    for (const listing of listings) {
      const { id, pictures } = listing;

      // Rozdziel zdjęcia w kolumnie pictures
      const pictureLinks = pictures.split(',');

      // Zmienna na nowe linki po wysłaniu do Bunny.net
      let updatedLinks = [];
      let mainImage = '';

      // Wysłanie zdjęć do Bunny.net i nazwanie ich wg losowego ciągu znaków + {id}
      for (let i = 0; i < pictureLinks.length; i++) {
        const picture = pictureLinks[i].trim();

        // Generuj losowy ciąg znaków i dodaj {id} na końcu
        const randomString = generateRandomString(20);
        const newFileName = `${randomString}${id}${i + 1}`;

        // Pobierz obraz jako strumień bajtów
        const imageResponse = await axios.get(picture, { responseType: 'arraybuffer' });
        const imageBuffer = imageResponse.data;

        // Konstruowanie odpowiedniego URL dla Bunny.net
        const bunnyUrl = `https://${baseUrl}/${bunnyStorageZone}/${newFileName}`;

        // Prześlij obraz do Bunny.net za pomocą PUT
        const uploadResponse = await axios.put(bunnyUrl, imageBuffer, {
          headers: {
            AccessKey: bunnyApiKey,
            'Content-Type': 'application/octet-stream',
          },
        });

        if (uploadResponse.status === 201) {
          // Stwórz nowy link do zdjęcia po wysłaniu do Bunny.net
          const newLink = `https://teneryfa.b-cdn.net/${newFileName}`;
          updatedLinks.push(newLink);

          // Pierwsze zdjęcie staje się głównym obrazem
          if (i === 0) {
            mainImage = newLink;
          }
        } else {
          console.error(`Failed to upload image ${newFileName}`);
        }
      }

      // Zaktualizowanie kolumn w bazie danych dla danego rekordu
      await prisma.listing.update({
        where: { id },
        data: {
          image: mainImage, // główne zdjęcie
          images: updatedLinks, // wszystkie zdjęcia
          published: true,
        },
      });
    }

    // Zwrócenie statusu OK po zakończeniu
    res.status(200).json({ message: 'Listings updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating listings' });
  }
}
