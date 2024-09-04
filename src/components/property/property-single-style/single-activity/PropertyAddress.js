"use client";

import React, { useState } from "react";

const BookingForm = () => {
  const [adultCount, setAdultCount] = useState(1);
  const [youthCount, setYouthCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const adultPrice = 60;
  const youthPrice = 45;
  const infantPrice = 40;

  const handleIncrement = (setter, count) => {
    if (adultCount + youthCount + infantCount < 5) {
      setter(count + 1);
    }
  };

  const handleDecrement = (setter, count, min = 0) => {
    if (count > min) {
      setter(count - 1);
    }
  };

  const totalPersons = adultCount + youthCount + infantCount;
  const totalPrice = adultCount * adultPrice + youthCount * youthPrice + infantCount * infantPrice;

  const isAvailable = totalPersons >= 2 && totalPersons <= 5 && adultCount >= 1;

  return (
    <div className="row my-3">
      <div className="col-12">
        <h3 className="title font-white">Booking</h3>
        <p className="title font-white">Select number of poeple and add voucher to cart.</p>
        <form className="box box-shadow activity-select">
          <div className="input-group ">
            <label className="input flex param-per-adult custom-input-number">
              <span><b>Adult</b> (Age 12-99)</span>
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
          <div className="input-group ">
            <label className="input flex param-per-youth custom-input-number">
              <span><b>Youth</b> (Age 6-11)</span>
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
              <span><b>Infant</b> (Age 5 and younger)</span>
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
            <p><strong>Total Price: ${totalPrice}</strong></p>
          </div>
          {isAvailable ? (
            <button id="submit-activity-select-btn" className="btn" type="button">
              <strong>Add Voucher</strong>
            </button>
          ) : (
            <p className="text-danger font-white"><strong>Add at least 2 people</strong></p>
          )}
        </form>
      </div>
      <div id="packages-wrapper" className="col-12"></div>
    </div>
  );
};

export default BookingForm;