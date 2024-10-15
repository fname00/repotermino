'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const OverView = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: t("bedroom"), // Use translation for label
      value: data.bed,
    },
    {
      icon: "flaticon-shower",
      label: t("bath"), // Use translation for label
      value: data.bath,
    },
    {
      icon: "flaticon-garage",
      label: t("garage"), // Use translation for label
      value: data.garage ? t("yes") : t("no"), // Use translation for Yes/No
    },
    {
      icon: "flaticon-expand",
      label: t("sqft"), // Use translation for label
      value: data.sqft,
    },
    {
      icon: "flaticon-home-1",
      label: t("propertyType"), // Use translation for label
      value: data.propertyType,
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-xl-2">
          <div className="overview-element mb30 d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
