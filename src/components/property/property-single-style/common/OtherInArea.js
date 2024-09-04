import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OtherInArea = ({ id }) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];

  // Find listings in the same city and sort by id (assuming higher id means newer)
  const sameCityListings = listings
    .filter((elm) => elm.city === data.city && elm.id !== data.id)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3); // Get the 3 newest listings

  return (
    <>
      <div className="new-listings">
        <h4 className="title fz17 mb30">Newest Listings in {data.city}</h4>
        <div className="row">
          {sameCityListings.map((listing) => (
            <div key={listing.id} className="col-12 mb30">
                <a className="listing-item" href={`/single-v2/${listing.id}`}>
                  <Image
                    width={300}
                    height={200}
                    src={listing.image}
                    alt={listing.title}
                    className="w-100"
                  />

                  <h5 className="listing-title mt10">{listing.title}</h5>
                  <p className="listing-location">{listing.location}</p>

                </a>
            </div>
          ))}
        </div>
      </div>
      {/* End new listings */}
    </>
  );
};

export default OtherInArea;