'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const OtherInArea = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const [otherListings, setOtherListings] = useState([]);

  useEffect(() => {
    const fetchOtherListings = async () => {
      try {
        const response = await fetch(`/api/listings/other-in-area?city=${data.city}&id=${data.id}`);
        const result = await response.json();
        setOtherListings(result);

      } catch (error) {
        console.error(t('fetchError'), error);
      }
    };

    if (data?.city) {
      fetchOtherListings();
    }
  }, [data]);

  return (
    <>
      <div className="new-listings">
        <h4 className="title fz17 mb30">
          {t('otherListingsIn')} {data.city}
        </h4>
        <div className="row">
          {otherListings.length === 0 ? (
            <p>{t('noOtherListings')}</p>
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
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(listing.price)} {listing.forRent ? `${t('perMonth')}` : ''}
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
