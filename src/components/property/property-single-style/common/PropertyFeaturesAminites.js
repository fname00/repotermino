import React from "react";

const PropertyFeaturesAminites = ({ data }) => {
  // Extract features from the data prop and split into an array
  const features = data?.features 
    ? data.features.split(',').map(feature => feature.trim()) // Split by comma and trim whitespace
    : [];

  // Function to split features into chunks of 4
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const featuresAmenitiesData = chunkArray(features, 4);

  return (
    <>
      {featuresAmenitiesData.map((row, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            {row.map((item, index) => (
              <p key={index} className="text mb10">
                <i className="fas fa-circle fz6 align-middle pe-2" />
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertyFeaturesAminites;
