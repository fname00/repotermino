// pages/api/activity/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  
  try {
    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(id) }
    });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
}
