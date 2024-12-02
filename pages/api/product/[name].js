const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default async function handler(req, res) {
  const { name } = req.query;

  try {
    // Search for the product by name
    const products = await stripe.products.search({
      query: `name~'${name}'`,
    });

    if (products.data.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Assume you only want the first matching product
    const product = products.data[0];

    // Fetch the price using the default_price from the product
    const price = await stripe.prices.retrieve(product.default_price);

    res.status(200).json({
      id: product.id,
      name: product.name,
      metadata: product.metadata,
      price: price.unit_amount / 100, // Convert price from cents to dollars
      default_price: product.default_price,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
