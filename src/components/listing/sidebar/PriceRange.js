"use client";
import React, { useState } from "react";
import Slider from "rc-slider";

const PriceRange = ({ filterFunctions }) => {
  const [price, setPrice] = useState([20, 15000000]);

  // Price range handler
  const handleOnChange = (value) => {
    setPrice(value); // Update local state
  };

  // Triggered when the user stops moving the slider
  const handleAfterChange = (value) => {
    filterFunctions?.handlepriceRange([value[0] || 0, value[1]]); // Call API with final values
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          formatLabel={() => ``}
          max={15000000}
          min={0}
          defaultValue={[
            filterFunctions?.priceRange[0],
            filterFunctions?.priceRange[1],
          ]}
          onChange={handleOnChange} // Call on every change
          onAfterChange={handleAfterChange} // Call after user stops changing
          id="slider"
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">{price[0]}</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">{price[1]}</span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
