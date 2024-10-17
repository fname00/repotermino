'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const ListingStatus = ({ filterFunctions }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const options = [
    { id: "flexRadioDefault3", value: "All", label: t('all'), defaultChecked: true },
    { id: "flexRadioDefault1", value: "Buy", label: t('buy') },
    { id: "flexRadioDefault2", value: "Rent", label: t('rent') },
    { id: "flexRadioDefault4", value: "Holiday", label: t('holiday') }, 
  ];

  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.listingStatus === option.label}
            onChange={() => filterFunctions.handlelistingStatus(option.value)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
