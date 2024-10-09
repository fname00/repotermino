'use client';
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import Skeleton from "react-loading-skeleton";
import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyHeader from "@/components/property/property-single-style/single-v2/PropertyHeader";
import PropertyGallery from "@/components/property/property-single-style/single-v2/PropertyGallery";
import OverView from "@/components/property/property-single-style/single-v2/OverView";
import CustomContact from "@/components/property/property-single-style/common/CustomContact";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import OtherInArea from "@/components/property/property-single-style/common/OtherInArea";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const SingleV2 = ({ params }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const [listingData, setListingData] = useState(null);

  // Retrieve the locale from cookies, or fall back to default locale
  const locale = Cookies.get('NEXT_LOCALE') || 'en';

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await fetch(`/api/listing/${params.id}?locale=${locale}`); // Include locale in the API request
        const data = await response.json();
        setListingData(data);
      } catch (error) {
        console.error("Failed to fetch listing data:", error);
      }
    };

    fetchListingData();
  }, [params.id, locale]); // Re-fetch data when params.id or locale changes

  if (!listingData) {
    return (
      <>
        <DefaultHeader />
        <MobileMenu />
        <section className="pt30 pb0 bgc-white">
          <div className="container">
            <div className="row">
              <Skeleton height={60} width={600} />
            </div>
            <div className="row mb30 mt0">
              <Skeleton height={400} />
            </div>
            <div className="row mt30">
              <Skeleton height={200} />
            </div>
          </div>
        </section>
        <section className="pt60 pb90 bgc-f7">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <Skeleton height={100} />
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <Skeleton height={50} />
                  <Skeleton count={3} />
                </div>
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <Skeleton height={50} />
                  <Skeleton count={3} />
                </div>
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <Skeleton height={50} />
                  <Skeleton count={3} />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="column">
                  <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                    <Skeleton height={200} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="footer-style1 pt60 pb-0">
          <Footer />
        </section>
      </>
    );
  }

  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <section className="pt30 pb0 bgc-white">
        <div className="container">
          <div className="row">
            <PropertyHeader data={listingData} />
          </div>
          <div className="row mb30 mt0">
            <PropertyGallery data={listingData} />
          </div>
          <div className="row mt30">
            <OverView data={listingData} />
          </div>
        </div>
      </section>
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <CustomContact data={listingData} />
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">{t('propertyDescription')}</h4>
                <p>{listingData.description}</p>
                <h4 className="title fz17 mb30 mt50">{t('propertyDetails')}</h4>
                <PropertyDetails data={listingData} />
              </div>
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">{t('address')}</h4>
                <PropertyAddress data={listingData} />
              </div>
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">{t('featuresAndAmenities')}</h4>
                <PropertyFeaturesAminites data={listingData} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <OtherInArea data={listingData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default SingleV2;
