'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const PropertyDetails = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  if (!data) return null;

  const columns = [
    [
      {
        label: t('propertyID'), // Translate the label
        value: data.id,
      },
      {
        label: t('price'), // Translate the label
        value: `${data.price} €`, // Append euro symbol to the price
      },
      {
        label: t('bathrooms'), // Translate the label
        value: data.bath,
      },
      {
        label: t('bedrooms'), // Translate the label
        value: data.bed,
      },
    ],
    [
      {
        label: t('propertySize'), // Translate the label
        value: `${data.sqft} m2`,
      },
      {
        label: t('garage'), // Translate the label
        value: data.garage ? t("yes") : t("no"), // Use translation for Yes/No
      },
      {
        label: t('propertyType'), // Translate the label
        value: data.propertyType,
      },
      {
        label: t('propertyStatus'), // Translate the label
        value: data.forRent ? t('forRent') : t('forSale'), // Translate the value based on condition
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
