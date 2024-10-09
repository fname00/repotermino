'use client';

import React from "react";
import listings from "@/data/activity";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const PropertyDetails = ({ id }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];

  const columns = [
    [
      {
        icon: "flaticon-close",
        label: t('cancellation'), // Use translation key for 'Cancellation'
        value: data.cancellation,
      },
      {
        icon: "flaticon-user",
        label: t('duration'), // Use translation key for 'Duration'
        value: data.duration,
      },
      {
        icon: "flaticon-user",
        label: t('pickup'), // Use translation key for 'Pickup'
        value: t('pickupIncluded'), // Use translation key for 'Pickup Included'
      },
      {
        icon: "flaticon-user",
        label: t('guide'), // Use translation key for 'Guide'
        value: t('guideIncluded'), // Use translation key for 'Guide Included'
      },
      {
        icon: "flaticon-user",
        label: t('location'), // Use translation key for 'Location'
        value: data.location,
      },
    ]
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-6${
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
