import React from "react";
import listings from "@/data/activity";

const PropertyDetails = ({ id }) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];

  const columns = [
    [
      {
        icon: "flaticon-close",
        label: "Cancellation",
        value: data.cancellation,
      },
      {
        icon: "flaticon-user",
        label: "Duration",
        value: data.duration,
      },
      {
        icon: "flaticon-user",
        label: "Pickup",
        value: "Pickup Included",
      },
      {
        icon: "flaticon-user",
        label: "Guide",
        value: "Guide Included",
      },
      {
        icon: "flaticon-user",
        label: "Location",
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
