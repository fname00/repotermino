'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const OtherFeatures = ({ filterFunctions }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const featuresLeftColumn = [
    { label: t('attic') },
    { label: t('basketballCourt'), defaultChecked: true },
    { label: t('airConditioning'), defaultChecked: true },
    { label: t('lawn'), defaultChecked: true },
    { label: t('tvCable') },
    { label: t('dryer') },
  ];

  const featuresRightColumn = [
    { label: t('outdoorShower') },
    { label: t('washer') },
    { label: t('lakeView') },
    { label: t('wineCellar') },
    { label: t('frontYard') },
    { label: t('refrigerator') },
  ];

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="checkbox-style1">
          {featuresLeftColumn.map((feature, index) => (
            <label className="custom_checkbox" key={index}>
              {feature.label}
              <input
                checked={filterFunctions?.categories.includes(feature.label)}
                type="checkbox"
                onChange={() => filterFunctions?.handlecategories(feature.label)}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      {/* End .col-6 */}

      <div className="col-lg-6">
        <div className="checkbox-style1">
          {featuresRightColumn.map((feature, index) => (
            <label className="custom_checkbox" key={index}>
              {feature.label}
              <input
                type="checkbox"
                onChange={() => filterFunctions?.handlecategories(feature.label)}
                defaultChecked={feature.defaultChecked}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      {/* End .col-6 */}
    </div>
  );
};

export default OtherFeatures;
