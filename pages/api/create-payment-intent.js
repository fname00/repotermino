// /api/create-payment-intent.js

import Stripe from 'stripe';
import prisma from '../../lib/prisma';  // Assuming you're using Prisma for your database

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { activityId, adultCount, youthCount, infantCount } = req.body;

    try {
      // Fetch activity details from the database using Prisma
      const activity = await prisma.activity.findUnique({
        where: {
          id: activityId,
        },
      });

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      // Calculate total price based on number of participants
      const totalPersons = adultCount + youthCount + infantCount;
      const totalPrice = totalPersons * activity.price;  // Assuming price is per person

      // Create Payment Intent in Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalPrice * 100),  // Stripe expects amounts in cents
        currency: 'usd',  // Set currency, can be dynamic based on user location
        metadata: {
          activityId: activity.id,
          activityName: activity.title,
        },
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });

    } catch (error) {
      console.error('Error creating Payment Intent:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
