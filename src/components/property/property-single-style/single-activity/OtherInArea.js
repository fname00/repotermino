"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe outside the component's render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BookingSidebar = ({ voucherDetails }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Call your backend to create the Checkout session.
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: voucherDetails.priceId,
        quantity: voucherDetails.totalPersons,
      }),
    });

    const session = await response.json();

    // Redirect to the Stripe checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="box box-shadow box-padding">
      <div>
        <h5>Price breakdown</h5>
        <ul className="breakdown-checkout p-0 pt-3">
          {voucherDetails ? (
            <li>
              <span>{voucherDetails.productName}</span>
              <span>{voucherDetails.totalPersons} persons</span>
              <span>${voucherDetails.totalPrice.toFixed(2)}</span>
            </li>
          ) : (
            <span style={{ color: "#b4b4b4" }}>
              Cart is empty. Check availability.
            </span>
          )}
        </ul>
        <hr />
        <button
          onClick={handleCheckout}
          className="btn"
          style={{ background: "#26272b" }}
          disabled={!voucherDetails}
        >
          Book and pay
        </button>
      </div>
    </div>
  );
};

export default BookingSidebar;
