"use client";

import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const FeaturedListings = ({ data, colstyle }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from cookies on initial render
  useEffect(() => {
    const favoriteItems = Cookies.get("favorites");
    if (favoriteItems) {
      setFavorites(JSON.parse(favoriteItems));
    }
  }, []);

  // Save favorites to cookies whenever it changes
  useEffect(() => {
    Cookies.set("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (listingId) => {
    if (favorites.includes(listingId)) {
      setFavorites(favorites.filter((id) => id !== listingId));
    } else {
      setFavorites([...favorites, listingId]);
    }
  };
  if (!data || data.length === 0) {
    // Render skeletons if data is not available
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <div
            className={` ${colstyle ? "col-sm-4 col-lg-4" : "col-sm-12"}  `}
            key={index}
          >
            <div
              className={
                colstyle
                  ? "listing-style1"
                  : "listing-style1 listCustom listing-type"
              }
            >
              <div className="list-thumb">
                <Skeleton height={253} width={"100%"} />
                <div className="sale-sticker-wrap">
                  <Skeleton width={80} height={20} />
                </div>
                <div className="list-price">
                  <Skeleton width={100} height={20} />
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Skeleton width={150} height={20} />
                </h6>
                <p className="list-text">
                  <Skeleton width={100} height={20} />
                </p>
                <div className="list-meta d-flex align-items-center">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                </div>
                <p className="list-text2">
                  <Skeleton count={2} width={"100%"} height={20} />
                </p>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <Skeleton width={80} height={20} />
                  <div className="icons d-flex align-items-center">
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                colstyle
                  ? "listing-style1"
                  : "listing-style1 listCustom listing-type"
              }
            >
              <div className="list-thumb">
                <Skeleton height={253} width={"100%"} />
                <div className="sale-sticker-wrap">
                  <Skeleton width={80} height={20} />
                </div>
                <div className="list-price">
                  <Skeleton width={100} height={20} />
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Skeleton width={150} height={20} />
                </h6>
                <p className="list-text">
                  <Skeleton width={100} height={20} />
                </p>
                <div className="list-meta d-flex align-items-center">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                </div>
                <p className="list-text2">
                  <Skeleton count={2} width={"100%"} height={20} />
                </p>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <Skeleton width={80} height={20} />
                  <div className="icons d-flex align-items-center">
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                colstyle
                  ? "listing-style1"
                  : "listing-style1 listCustom listing-type"
              }
            >
              <div className="list-thumb">
                <Skeleton height={253} width={"100%"} />
                <div className="sale-sticker-wrap">
                  <Skeleton width={80} height={20} />
                </div>
                <div className="list-price">
                  <Skeleton width={100} height={20} />
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Skeleton width={150} height={20} />
                </h6>
                <p className="list-text">
                  <Skeleton width={100} height={20} />
                </p>
                <div className="list-meta d-flex align-items-center">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                </div>
                <p className="list-text2">
                  <Skeleton count={2} width={"100%"} height={20} />
                </p>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <Skeleton width={80} height={20} />
                  <div className="icons d-flex align-items-center">
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                colstyle
                  ? "listing-style1"
                  : "listing-style1 listCustom listing-type"
              }
            >
              <div className="list-thumb">
                <Skeleton height={253} width={"100%"} />
                <div className="sale-sticker-wrap">
                  <Skeleton width={80} height={20} />
                </div>
                <div className="list-price">
                  <Skeleton width={100} height={20} />
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Skeleton width={150} height={20} />
                </h6>
                <p className="list-text">
                  <Skeleton width={100} height={20} />
                </p>
                <div className="list-meta d-flex align-items-center">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                  <Skeleton width={60} height={20} />
                </div>
                <p className="list-text2">
                  <Skeleton count={2} width={"100%"} height={20} />
                </p>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <Skeleton width={80} height={20} />
                  <div className="icons d-flex align-items-center">
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                    <Skeleton width={20} height={20} circle={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${colstyle ? "col-sm-4 col-lg-4" : "col-sm-12"}  `}
          key={listing.id}
        >
          <div
            className={
              colstyle
                ? "listing-style1"
                : "listing-style1 listCustom listing-type"
            }
          >
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                className="w-100 cover"
                style={{ height: "253px" }}
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

              <div className="list-price">
                {listing.price} {listing.forRent ? "/ mo" : ""}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link href={`/property/${listing.id}`}>{listing.title}</Link>
              </h6>
              <p className="list-text">{listing.location}</p>
              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.bed} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.bath} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.sqft} sqft
                </a>
              </div>

              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">
                  {listing.forRent ? "For Rent" : "For Sale"}
                </span>
                <div className="icons d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a 
                    onClick={() => toggleFavorite(listing.id)}
                    style={{ color: favorites.includes(listing.id) ? "red" : "black" }}
                  >
                    <span className="flaticon-like" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
