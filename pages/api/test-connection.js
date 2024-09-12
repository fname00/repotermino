import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    await client.connect(); // Establish a connection
    const result = await client.query('SELECT NOW()'); // Run a simple query
    await client.end(); // Close the connection

    res.status(200).json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
