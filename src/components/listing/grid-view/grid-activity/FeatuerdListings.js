'use client';

import Image from "next/image";
import Link from "next/link";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"}  `}
          key={listing.id}
        >
          <div
            className={colstyle ? "listing-style1 listCustom listing-type" : "listing-style1"}
          >
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                className="w-100 cover"
                style={{ height: "230px" }}
                src={listing.image}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {listing.featured && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link href={`/activity/${listing.id}`}>{listing.title}</Link>
              </h6>
              <p className="list-text">{listing.location}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="me-2 align-middle" style={{ opacity: 0.8 }}>
                    <i className="flaticon-clock custom-icon align-middle" /> <span className="align-middle">{listing.duration}</span>
                  </span><br></br>
                  <span className="align-middle" style={{ opacity: 0.8 }}>
                    <i className="flaticon-protection custom-icon align-middle" /> <span className="align-middle">{listing.cancellation}</span>
                  </span>
                </div>
                <div className="grid-price">
                  <span className="price-label">From</span><br></br>
                  <strong className="price-value">{listing.price}</strong><br></br>
                  <span className="price-label">per person</span>
                </div>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="d-flex justify-content-end">
                <button className="activity-button">Buy Voucher</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;