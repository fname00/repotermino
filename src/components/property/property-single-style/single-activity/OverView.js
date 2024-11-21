import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const OverView = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  // Function to handle cancellation logic, where cancellation is a string
  const handleCancellation = (cancellation) => {
    return cancellation === "TRUE" ? t('can_be_cancelled') : t('no_cancellation');
  };

  const overviewData = [
    {
      icon: "flaticon-play",
      label: t('price_from'), // Translation for "Price from"
      value: `${data.price} €`, // Add the Euro sign
    },
    {
      icon: "flaticon-map",
      label: t('location'), // Translation for "Location"
      value: data.location,
    },
    {
      icon: "flaticon-clock",
      label: t('duration'), // Translation for "Duration"
      value: `${data.duration} ${t('hour')}`,
    },
    {
      icon: "flaticon-like",
      label: t('cancellation'), // Translation for "Cancellation"
      value: handleCancellation(data.cancellation),
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div key={index} className="">
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
