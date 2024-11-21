'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const FeaturedListings = ({ data, colstyle }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

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
            <Link href={`/activity/${listing.id}`}>
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
                      {t('featured')}
                    </div>
                  )}
                </div>
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  {listing.title}
                </h6>
                <p className="list-text">{listing.location}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="grid-price">
                    <span className="price-label">{t('from')}</span><br></br>
                    <strong className="price-value">{listing.price} €</strong><br></br>
                    <span className="price-label">{t('per_person')}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="activity-button">{t('buy_voucher')}</button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
