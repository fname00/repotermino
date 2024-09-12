"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
const OtherInArea = ({ data }) => {
  const [otherListings, setOtherListings] = useState([]);

  useEffect(() => {
    const fetchOtherListings = async () => {
      try {
        const response = await fetch(`/api/listings/other-in-area?city=${data.city}&id=${data.id}`);
        const result = await response.json();
        setOtherListings(result);
        console.log('Other listings data:', result); // Log to verify
      } catch (error) {
        console.error("Failed to fetch other listings:", error);
      }
    };

    if (data?.city) {
      fetchOtherListings();
    }
  }, [data]);

  return (
    <>
      <div className="new-listings">
        <h4 className="title fz17 mb30">Other Listings in {data.city}</h4>
        <div className="row">
          {otherListings.length === 0 ? (
            <p>No other listings available</p>
          ) : (
            otherListings.map((listing) => (
              <div key={listing.id} className="col-12 mb30">
                <a className="listing-item" href={`/property/${listing.id}`}>
                  <Image
                    width={300}
                    height={200}
                    src={listing.image}
                    alt={listing.title}
                    className="w-100"
                  />
                  <h5 className="listing-title mt10">{listing.title}</h5>
                  <p className="listing-location">{listing.location}</p>
                  <p className="listing-price">
                    {listing.price} {listing.forRent ? '/mo' : ''}
                  </p>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
      {/* End new listings */}
    </>
  );
};

export default OtherInArea;
