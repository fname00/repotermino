"use client";
import React, { useState } from "react";
import Slider from "rc-slider";

// Funkcja do formatowania ceny
const formatPrice = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}m`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

const PriceRange = ({ filterFunctions }) => {
  const [price, setPrice] = useState([20, 10000000]);

  // Obsługa zmiany zakresu cen
  const handleOnChange = (value) => {
    setPrice(value); // Aktualizacja lokalnego stanu
  };

  // Wywoływane po zakończeniu zmiany suwaka
  const handleAfterChange = (value) => {
    filterFunctions?.handlepriceRange([value[0] || 0, value[1]]); // Wywołanie API z finalnymi wartościami
  };

  return (
    <div className="range-wrapper">
      <Slider
        range
        formatLabel={() => ``}
        max={10000000}
        min={0}
        defaultValue={[
          filterFunctions?.priceRange[0],
          filterFunctions?.priceRange[1],
        ]}
        onChange={handleOnChange} // Wywołanie przy każdej zmianie
        onAfterChange={handleAfterChange} // Wywołanie po zakończeniu zmiany
        id="slider"
      />
      <div className="d-flex align-items-center">
        <span id="slider-range-value1">{formatPrice(price[0])}</span>
        <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
        <span id="slider-range-value2">{formatPrice(price[1])}</span>
      </div>
    </div>
  );
};

export default PriceRange;
