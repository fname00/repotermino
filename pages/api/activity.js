import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Fetch all activities from the database
    const activities = await prisma.activity.findMany();
    // Respond with the activities data
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    // If there's an error, respond with a 500 status and error message
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
}
