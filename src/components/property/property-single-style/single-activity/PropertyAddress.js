'use client';

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";

// Load Stripe outside the component's render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BookingForm = ({ data }) => {
  const { t } = useTranslation('common');

  // State to track participants
  const [adultCount, setAdultCount] = useState(1);
  const [youthCount, setYouthCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  // Fetch initial activity data from props
  const [maxPersons, setMaxPersons] = useState(data.maxPersons || 4);
  const [minAdults, setMinAdults] = useState(data.minAdults || 1);
  const [maxAdults, setMaxAdults] = useState(data.maxAdults || 1);
  const [minKids, setMinKids] = useState(data.minKids || 0);
  const [maxKids, setMaxKids] = useState(data.maxKids || 0);
  const [minYouth, setMinYouth] = useState(data.minYouth || 0);
  const [maxYouth, setMaxYouth] = useState(data.maxYouth || 0);

  // Discounts
  const [discountAdults, setDiscountAdults] = useState(data.discountAdults || 0);
  const [discountKids, setDiscountKids] = useState(data.discountKids || 0);
  const [discountYouth, setDiscountYouth] = useState(data.discountYouth || 0);

  // Base price and discount
  const [price, setPrice] = useState(data.price || 0);
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState(data.title || t('activity'));

  // Increment function
  const handleIncrement = (setter, count, max) => {
    if (adultCount + youthCount + infantCount < maxPersons && count < max) {
      setter(count + 1);
    }
  };

  // Decrement function
  const handleDecrement = (setter, count, min = 0) => {
    if (count > min) {
      setter(count - 1);
    }
  };

  // Total participants and price calculation
  const totalPersons = adultCount + youthCount + infantCount;
  
  // Calculate the total price by applying discounts based on participant type
  const calculateTotalPrice = () => {
    const adultPrice = adultCount * price * (1 - discountAdults / 100);
    const youthPrice = youthCount * price * (1 - discountYouth / 100);
    const kidPrice = infantCount * price * (1 - discountKids / 100);
    return adultPrice + youthPrice + kidPrice;
  };

  const totalPrice = calculateTotalPrice();

  const isAvailable =
    totalPersons >= minAdults &&
    totalPersons <= maxPersons &&
    adultCount >= minAdults &&
    adultCount <= maxAdults &&
    youthCount >= minYouth &&
    youthCount <= maxYouth &&
    infantCount >= minKids &&
    infantCount <= maxKids;

  const handleCheckout = async () => {
    if (totalPrice > 0) {
      const stripe = await stripePromise;

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityName: productName,
          totalPersons,
          totalPrice,
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

  return (
    <div className="booking-form-container" style={{ position: "relative" }}>
      <div className="row my-3">
        <div className="col-12">
          <h3 className="title font-white">{t('booking')}</h3>
          <p className="title font-white">{t('selectNumberOfPeople')}</p>
          <form className="box box-shadow activity-select">
            
            {/* Adult Count */}
            <div className="input-group">
              <label className="input flex param-per-adult custom-input-number">
                <span><b>{t('adult')}</b> {t('ageRangeAdult')}</span>
                <label className="input input-number">
                  <span
                    className={adultCount === minAdults ? "disable" : ""}
                    data-type="minus"
                    onClick={() => handleDecrement(setAdultCount, adultCount, minAdults)}
                  >
                    <i className="fa-regular fa-minus"></i>
                  </span>
                  <input type="text" name="adult_count" value={adultCount} readOnly />
                  <span data-type="plus" onClick={() => handleIncrement(setAdultCount, adultCount, maxAdults)}>
                    <i className="fa-regular fa-plus"></i>
                  </span>
                </label>
              </label>
            </div>

            {/* Youth Count */}
            <div className="input-group">
              <label className="input flex param-per-youth custom-input-number">
                <span><b>{t('youth')}</b> {t('ageRangeYouth')}</span>
                <label className="input input-number">
                  <span
                    className={youthCount === minYouth ? "disable" : ""}
                    data-type="minus"
                    onClick={() => handleDecrement(setYouthCount, youthCount, minYouth)}
                  >
                    <i className="fa-regular fa-minus"></i>
                  </span>
                  <input type="text" name="youth_count" value={youthCount} readOnly />
                  <span data-type="plus" onClick={() => handleIncrement(setYouthCount, youthCount, maxYouth)}>
                    <i className="fa-regular fa-plus"></i>
                  </span>
                </label>
              </label>
            </div>

            {/* Infant Count */}
            <div className="input-group">
              <label className="input flex param-per-infant custom-input-number">
                <span><b>{t('infant')}</b> {t('ageRangeInfant')}</span>
                <label className="input input-number">
                  <span
                    className={infantCount === minKids ? "disable" : ""}
                    data-type="minus"
                    onClick={() => handleDecrement(setInfantCount, infantCount, minKids)}
                  >
                    <i className="fa-regular fa-minus"></i>
                  </span>
                  <input type="text" name="infant_count" value={infantCount} readOnly />
                  <span data-type="plus" onClick={() => handleIncrement(setInfantCount, infantCount, maxKids)}>
                    <i className="fa-regular fa-plus"></i>
                  </span>
                </label>
              </label>
            </div>

            {/* Total Price */}
            <div className="total-price font-white custom-total-price">
              <p><strong>{t('totalPrice')}: {totalPrice.toFixed(2)} €</strong></p>
            </div>

            {/* Checkout Button */}
            <button
              id="submit-activity-select-btn"
              className={`btn ${!loading && isAvailable ? "" : "inactive-custom-button"}`}
              type="button"
              disabled={!loading && !isAvailable}
            >
              <strong>{t('bookAndPay')}</strong>
            </button>
          </form>
        </div>
        <div id="packages-wrapper" className="col-12"></div>
      </div>

      {/* Półprzeźroczysta nakładka */}
      <div
        className="temporary-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <a
          href="mailto:kontakt@teneryfa.org.pl"
          className="btn btn-primary"
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            color: "white"
          }}
        >
          {t('mailres')}
        </a>
      </div>
    </div>
  );
};

export default BookingForm;
