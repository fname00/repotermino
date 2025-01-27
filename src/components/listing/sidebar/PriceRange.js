import React, { useState } from "react";
import Slider from "rc-slider";

// Nasza funkcja formatowania liczb
const formatPrice = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}m`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

// -- FUNKCJE TRANSFORMUJĄCE (z powyższego kodu) --
function priceToPercentage(value) {
  if (value <= 1_000_000) {
    return (value / 1_000_000) * 75;
  } else {
    const rest = value - 1_000_000;
    const range = 9_000_000;
    return 75 + (rest / range) * 25;
  }
}

function percentageToPrice(percentage) {
  if (percentage <= 75) {
    return (percentage / 75) * 1_000_000;
  } else {
    const restPct = percentage - 75;
    return 1_000_000 + (restPct / 25) * 9_000_000;
  }
}

// ----------------------------

const PriceRange = ({ filterFunctions }) => {
  // Zakładam, że dostajesz z zewnątrz aktualny zakres cen np. 0–10_000_000
  const minPrice = filterFunctions?.priceRange?.[0] || 0;
  const maxPrice = filterFunctions?.priceRange?.[1] || 10_000_000;

  // Konwertujemy ceny na procenty 0–100
  const [sliderValues, setSliderValues] = useState([
    priceToPercentage(minPrice),
    priceToPercentage(maxPrice),
  ]);

  // Przy każdej zmianie suwaka - aktualizujemy stan (w %)
  const handleOnChange = (values) => {
    setSliderValues(values);
  };

  // Po "puszczeniu" suwaka - konwertujemy % na faktyczną cenę i wołamy API
  const handleAfterChange = (values) => {
    const realMin = percentageToPrice(values[0]);
    const realMax = percentageToPrice(values[1]);

    filterFunctions?.handlepriceRange([realMin, realMax]);
  };

  // Dla wyświetlenia: konwertujemy % → cena
  const [realMin, realMax] = [
    percentageToPrice(sliderValues[0]),
    percentageToPrice(sliderValues[1]),
  ];

  return (
    <div className="range-wrapper">
      <Slider
        range
        min={0}
        max={100}
        // w rc-slider nazwa własności 'value' zamiast 'defaultValue' 
        value={sliderValues}
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          width: "calc(100% - 40px)",}}
        onChange={handleOnChange}
        onAfterChange={handleAfterChange}
      />
      <div className="d-flex align-items-center">
        <span>{formatPrice(realMin)}</span>
        <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
        <span>{formatPrice(realMax)}</span>
      </div>
    </div>
  );
};

export default PriceRange;
