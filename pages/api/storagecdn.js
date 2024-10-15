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

// Konfiguracja maksymalnego czasu trwania funkcji API
export const config = {
  maxDuration: 300, // Maksymalny czas działania funkcji
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const bunnyStorageZone = 'tenerife';
  const bunnyApiKey = process.env.BUNNY;
  const bunnyRegion = ''; // Zostaw puste, jeśli używasz domyślnego regionu
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
      take:  parseInt(process.env.CDNTAKE, 10),
    });

    // Wyświetlenie pobranych listingów do debugowania
    console.log('Listingi wybrane do przetworzenia:', listings.map(listing => ({
      id: listing.id,
      title: listing.title,
      pictures: listing.pictures,
    })));

    // Używamy Promise.all do równoległego przetwarzania listingów
    await Promise.all(
      listings.map(async (listing) => {
        const { id, pictures } = listing;

        // Rozdziel zdjęcia w kolumnie pictures
        const pictureLinks = pictures.split(',');

        console.log(`Przetwarzanie zdjęć dla listing ID: ${id}`);

        // Przetwarzanie obrazów równolegle z Promise.all
        const uploadedLinks = await Promise.all(
          pictureLinks.map(async (picture, index) => {
            const trimmedPicture = picture.trim();

            // Generuj losowy ciąg znaków i dodaj {id} na końcu
            const randomString = generateRandomString(20);
            const newFileName = `${randomString}${id}${index + 1}`;

            console.log(`Przesyłanie zdjęcia: ${trimmedPicture} jako ${newFileName}`);

            // Pobierz obraz jako strumień bajtów
            const imageResponse = await axios.get(trimmedPicture, {
              responseType: 'arraybuffer',
            });
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
              console.log(`Zdjęcie zostało pomyślnie przesłane: ${newFileName}`);
              // Stwórz nowy link do zdjęcia po wysłaniu do Bunny.net
              return `https://teneryfa.b-cdn.net/${newFileName}`;
            } else {
              console.error(`Nie udało się przesłać zdjęcia ${newFileName}`);
              return null;
            }
          })
        );

        // Zaktualizowanie kolumn w bazie danych dla danego rekordu
        const mainImage = uploadedLinks[0] || '';
        const validUploadedLinks = uploadedLinks.filter((link) => link !== null);

        await prisma.listing.update({
          where: { id },
          data: {
            image: mainImage, // główne zdjęcie
            images: validUploadedLinks, // wszystkie zdjęcia
            published: true,
          },
        });
      })
    );

    // Zwrócenie statusu OK po zakończeniu
    res.status(200).json({ message: 'Listings updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating listings' });
  }
}
