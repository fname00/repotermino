import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { locale } = req.query; // Get the requested locale from query parameters

  try {
    // Fetch all activities with the relevant localized fields based on the requested locale
    const activities = await prisma.activity.findMany({
      select: {
        id: true,
        image: true,
        images: true,
        title: true,
        city: true,
        location: true,
        duration: true,
        price: true,
        discount: true,
        forRent: true,
        tags: true,
        cancellation: true,
        featured: true,
        availability: true,
        description: true,
        // Conditionally include localized fields based on the requested locale
        ...(locale === 'en' && { 
          title_en: true, 
          location_en: true, 
          duration_en: true, 
          cancellation_en: true, 
          description_en: true 
        }),
        ...(locale === 'pl' && { 
          title_pl: true, 
          location_pl: true, 
          duration_pl: true, 
          cancellation_pl: true, 
          description_pl: true 
        }),
        ...(locale === 'es' && { 
          title_es: true, 
          location_es: true, 
          duration_es: true, 
          cancellation_es: true, 
          description_es: true 
        }),
      },
    });

    // Map the activities to return the correct localized fields based on the locale
    const localizedActivities = activities.map(activity => {
      return {
        ...activity,
        title: locale === 'en' ? activity.title_en || activity.title :
               locale === 'pl' ? activity.title_pl || activity.title :
               locale === 'es' ? activity.title_es || activity.title : activity.title,
        location: locale === 'en' ? activity.location_en || activity.location :
                  locale === 'pl' ? activity.location_pl || activity.location :
                  locale === 'es' ? activity.location_es || activity.location : activity.location,
        duration: locale === 'en' ? activity.duration || activity.duration :
                  locale === 'pl' ? activity.duration || activity.duration :
                  locale === 'es' ? activity.duration || activity.duration : activity.duration,
        cancellation: locale === 'en' ? activity.cancellation_en || activity.cancellation :
                      locale === 'pl' ? activity.cancellation_pl || activity.cancellation :
                      locale === 'es' ? activity.cancellation_es || activity.cancellation : activity.cancellation,
        description: locale === 'en' ? activity.description_en || activity.description :
                      locale === 'pl' ? activity.description_pl || activity.description :
                      locale === 'es' ? activity.description_es || activity.description : activity.description,
      };
    });

    // Respond with the localized activities data
    res.status(200).json(localizedActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    // If there's an error, respond with a 500 status and error message
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
}
