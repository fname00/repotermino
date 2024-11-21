'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Mark = ({ filterFunctions }) => { // Usuń selectedMarks z props
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const markOptions = [
    { label: "Nowości", value: "new" },
    { label: "Ekskluzywne", value: "exclusive" },
    // Dodaj więcej opcji według potrzeb
  ];

  const selectedMarks = filterFunctions.mark || []; // Pobierz aktualnie wybrane mark z filterFunctions

  return (
    <>
      {markOptions.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {t(option.label)}
          <input
            type="checkbox"
            checked={selectedMarks.includes(option.value)}
            onChange={() => filterFunctions.handleMark(option.value)}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default Mark;
