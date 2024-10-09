'use client';

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

// Load Stripe outside the component's render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BookingForm = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const [adultCount, setAdultCount] = useState(1);
  const [youthCount, setYouthCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [maxPersons, setMaxPersons] = useState(null);
  const [minAdults, setMinAdults] = useState(null);
  const [kidsAllowed, setKidsAllowed] = useState(null);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceId, setPriceId] = useState(null);
  const productName = t("flightTour");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/product/${encodeURIComponent(productName)}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();

        console.log('Product data received from API:', data);

        // Extract and set the relevant metadata
        setMinAdults(Number(data.metadata.min_adult));
        setMaxPersons(Number(data.metadata.max_person));
        setKidsAllowed(data.metadata.kids === 'allowed');
        setPrice(data.price);
        setPriceId(data.default_price);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productName]); // Include productName to re-fetch if it changes

  const handleIncrement = (setter, count) => {
    if (adultCount + youthCount + infantCount < maxPersons) {
      setter(count + 1);
    }
  };

  const handleDecrement = (setter, count, min = 0) => {
    if (count > min) {
      setter(count - 1);
    }
  };

  const totalPersons = adultCount + youthCount + infantCount;
  const totalPrice = (adultCount + youthCount + infantCount) * (price || 0);
  const isAvailable =
    totalPersons >= minAdults &&
    totalPersons <= maxPersons &&
    adultCount >= minAdults &&
    (kidsAllowed || (youthCount === 0 && infantCount === 0));

  const handleCheckout = async () => {
    if (price) {
      const stripe = await stripePromise;

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          quantity: totalPersons,
        }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    }
  };

  console.log('Form state:', {
    adultCount,
    youthCount,
    infantCount,
    totalPersons,
    totalPrice,
    minAdults,
    maxPersons,
    kidsAllowed,
    isAvailable,
    loading
  });

  return (
    <div className="row my-3">
      <div className="col-12">
        <h3 className="title font-white">{t('booking')}</h3>
        <p className="title font-white">{t('selectNumberOfPeople')}</p>
        <form className="box box-shadow activity-select">
          <div className="input-group">
            <label className="input flex param-per-adult custom-input-number">
              <span><b>{t('adult')}</b> {t('ageRangeAdult')}</span>
              <label className="input input-number">
                <span
                  className={adultCount === 1 ? "disable" : ""}
                  data-type="minus"
                  onClick={() => handleDecrement(setAdultCount, adultCount, 1)}
                >
                  <i className="fa-regular fa-minus"></i>
                </span>
                <input type="text" name="adult_count" value={adultCount} readOnly />
                <span data-type="plus" onClick={() => handleIncrement(setAdultCount, adultCount)}>
                  <i className="fa-regular fa-plus"></i>
                </span>
              </label>
            </label>
          </div>
          <div className="input-group">
            <label className="input flex param-per-youth custom-input-number">
              <span><b>{t('youth')}</b> {t('ageRangeYouth')}</span>
              <label className="input input-number">
                <span
                  className={youthCount === 0 ? "disable" : ""}
                  data-type="minus"
                  onClick={() => handleDecrement(setYouthCount, youthCount)}
                >
                  <i className="fa-regular fa-minus"></i>
                </span>
                <input type="text" name="youth_count" value={youthCount} readOnly />
                <span data-type="plus" onClick={() => handleIncrement(setYouthCount, youthCount)}>
                  <i className="fa-regular fa-plus"></i>
                </span>
              </label>
            </label>
          </div>
          <div className="input-group">
            <label className="input flex param-per-infant custom-input-number">
              <span><b>{t('infant')}</b> {t('ageRangeInfant')}</span>
              <label className="input input-number">
                <span
                  className={infantCount === 0 ? "disable" : ""}
                  data-type="minus"
                  onClick={() => handleDecrement(setInfantCount, infantCount)}
                >
                  <i className="fa-regular fa-minus"></i>
                </span>
                <input type="text" name="infant_count" value={infantCount} readOnly />
                <span data-type="plus" onClick={() => handleIncrement(setInfantCount, infantCount)}>
                  <i className="fa-regular fa-plus"></i>
                </span>
              </label>
            </label>
          </div>
          <div className="total-price font-white custom-total-price">
            <p><strong>{t('totalPrice')}: ${totalPrice.toFixed(2)}</strong></p>
          </div>
          <button
            id="submit-activity-select-btn"
            className={`btn ${!loading && isAvailable ? "" : "inactive-custom-button"}`}
            type="button"
            onClick={handleCheckout}
            disabled={!loading && !isAvailable}
          >
            <strong>{t('bookAndPay')}</strong>
          </button>
        </form>
      </div>
      <div id="packages-wrapper" className="col-12"></div>
    </div>
  );
};

export default BookingForm;
