import React from "react";
import listings from "@/data/listings";

const PropertyAddress = ({ id }) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  return (
    <>
        <div
          className={`col-md-6 col-xl-4 "offset-xl-2" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">City</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{data.city}</p>
            </div>
          </div>
        </div>
      {/* End col */}

      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${data.address},${data.city}&t=m&z=14&output=embed&iwloc=near`}
          title={data.address}
          aria-label={data.address}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
