"use client";

import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const FeaturedListings = ({ data, colstyle }) => {
  const [favorites, setFavorites] = useState([]);
  const { t } = useTranslation('common');
  // Load favorites from cookies on initial render
  useEffect(() => {
    const favoriteItems = Cookies.get("favorites");
    if (favoriteItems) {
      setFavorites(JSON.parse(favoriteItems));
    }
  }, []);

  // Save favorites to cookies whenever it changes
  useEffect(() => {
    Cookies.set("favorites", JSON.stringify(favorites), { expires: 365 });
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
            className={` ${colstyle ? "col-sm-4 col-lg-4 skeleton-pulse" : "col-sm-12 skeleton-pulse"}  `}
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
            <Link href={`/property/${listing.id}`}>
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
                {new Intl.NumberFormat('pl-PL', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(listing.price)}{listing.forRent ? " / mo" : ""}
              </div>
            </Link>
            </div>
            <div className="list-content">
            <Link href={`/property/${listing.id}`}>
              <h6 className="list-title">
                {listing.title}
              </h6>
              <p className="list-text">{listing.location}</p>
              </Link>
              {/*
              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.bed} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.bath} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.sqft} m2
                </a>
              </div>
                      */}
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">
                    {listing.forRent ? t('for_rent') : t('for_sale')}
                  </span>
                <div className="icons d-flex align-items-center">
                  <a href={`/property/${listing.id}`} target="_blank" rel="noopener noreferrer">
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
