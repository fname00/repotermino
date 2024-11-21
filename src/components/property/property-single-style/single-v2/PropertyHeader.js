'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { useEffect, useState} from "react";
import Cookies from "js-cookie";

// Funkcja obliczająca, ile czasu temu dodano post
const getTimeAgo = (dateAdd, t) => {
  const currentDate = new Date();
  const postDate = new Date(dateAdd);

  const diffInMs = currentDate - postDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return t('daysAgo', { count: diffInDays });
  } else if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return t('monthsAgo', { count: diffInMonths });
  } else {
    const diffInYears = Math.floor(diffInDays / 365);
    return t('yearsAgo', { count: diffInYears });
  }
};

const PropertyHeader = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
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
  if (!data) {
    return <p>{t('loading')}</p>;
  }

  // Obliczanie, ile czasu temu został dodany post
  const timeAgo = getTimeAgo(data.dateAdd, t);

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.title}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {data.location}
            </p>
            <a
              className="ff-heading bdrr1 text-thm fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              {t(data.forRent ? 'forRent' : 'forSale')}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="far fa-clock pe-2" />
              {timeAgo}
            </a>
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              {data.id}
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
            <a 
                    onClick={() => toggleFavorite(data.id)}
                    style={{ color: favorites.includes(data.id) ? "red" : "black" }}
                  >
                    <span className="flaticon-like" />
                  </a>
            </div>
            <h3 className="price mb-0">
              {new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(data.price)}
            </h3>
            <p className="text space fz15">
            {t('pricePerSqFt', {
              pricePerSqFt: data.price && data.sqft 
                ? new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(data.price / data.sqft) // Format as currency
                : 'N/A'
            })}
          </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
