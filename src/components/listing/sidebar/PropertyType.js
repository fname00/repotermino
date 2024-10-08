'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const PropertyType = ({ filterFunctions }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const options = [
    { label: "houses" },    // Use lowercase keys for consistency in translation files
    { label: "apartments", defaultChecked: true },
    { label: "office" },
    { label: "villa" },
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
