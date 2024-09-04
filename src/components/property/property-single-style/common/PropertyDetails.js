import React from "react";
import listings from "@/data/listings";

const PropertyDetails = ({ id }) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];

  const columns = [
    [
      {
        label: "Property ID",
        value: data.id,
      },
      {
        label: "Price",
        value: data.price,
      },
      {
        label: "Property Size",
        value: data.sqft,
      },
      {
        label: "Bathrooms",
        value: data.bath,
      },
      {
        label: "Bedrooms",
        value: data.bed,
      },
    ],
    [
      {
        label: "Garage",
        value: data.garage,
      },
      {
        label: "Garage Size",
        value: data.garageSize,
      },
      {
        label: "Year Built",
        value: data.yearBuilding,
      },
      {
        label: "Property Type",
        value: data.propertyType,
      },
      {
        label: "Property Status",
        value: data.forRent ? "For Rent" : "For Sale",
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
