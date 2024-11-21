'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Garage = ({ filterFunctions }) => { // Usuń selectedMarks z props
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const garageOptions = [
    { label: "Garaż", value: "garage" },
    { label: "Schowek", value: "storage" },
    // Dodaj więcej opcji według potrzeb
  ];

  const selectedGarages = filterFunctions.garage || []; // Pobierz aktualnie wybrane mark z filterFunctions

  return (
    <>
      {garageOptions.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {t(option.label)}
          <input
            type="checkbox"
            checked={selectedGarages.includes(option.value)}
            onChange={() => filterFunctions.handleGarage(option.value)}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default Garage;
