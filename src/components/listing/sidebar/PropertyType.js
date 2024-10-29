'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const PropertyType = ({ filterFunctions }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const options = [
    { label: "villa", value: "villa" },
    { label: "penthouse", value: "penthouse" },
    { label: "duplex", value: "duplex" },
    { label: "flat", value: "flat" },
    { label: "bungalow", value: "bungalow" },
    { label: "country house", value: "country-house" },
    { label: "building", value: "building" },
    { label: "land", value: "land" },
    { label: "studio", value: "studio" },
    { label: "office", value: "office" },
    { label: "shop", value: "shop" },
    { label: "parking", value: "parking" },
  ];
  
  
  return (
    <>
      <label className="custom_checkbox">
        {t('all')}
        <input
          type="checkbox"
          checked={!filterFunctions?.propertyTypes.length}
          onChange={() => filterFunctions?.setPropertyTypes([])}
        />
        <span className="checkmark" />
      </label>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {t(option.label)}  {/* Use t function for translation */}
          <input
            type="checkbox"
            checked={filterFunctions?.propertyTypes.includes(option.label)}
            onChange={() => filterFunctions.handlepropertyTypes(option.label)}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
