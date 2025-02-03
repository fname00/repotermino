'use client';

import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyHeader from "@/components/property/property-single-style/single-activity/PropertyHeader";
import PropertyGallery from "@/components/property/property-single-style/single-activity/PropertyGallery";
import OverView from "@/components/property/property-single-style/single-activity/OverView";
import ProperytyDescriptions from "@/components/property/property-single-style/single-activity/ProperytyDescriptions";
import PropertyDetails from "@/components/property/property-single-style/single-activity/PropertyDetails";
import PropertyAddress from "@/components/property/property-single-style/single-activity/PropertyAddress";
import OtherInArea from "@/components/property/property-single-style/single-activity/OtherInArea";
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const SingleV2 = ({ params }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const [activityData, setActivityData] = useState(null);

  // Retrieve the locale from cookies, or fall back to a default if not set
  const locale = Cookies.get('NEXT_LOCALE') || 'pl';

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        // Include locale in the API request
        const response = await fetch(`/api/activity/${params.id}?locale=${locale}`);
        const data = await response.json();
        setActivityData(data);
      } catch (error) {
        console.error("Failed to fetch activity data:", error);
      }
    };

    fetchActivityData();
  }, [params.id, locale]); // Re-fetch data when params.id or locale changes

  if (!activityData) {
    return (
      <>
        <DefaultHeader />
        <MobileMenu />
        <section className="pt30 pb0 bgc-white">
          
          <div className="container">
            <div className="row">
              <Skeleton height={60} width="100%" />
            </div>
            <div className="row mb30 mt30">
              <Skeleton height={400} width="100%" />
            </div>
            <div className="row mt30">
              <Skeleton height={200} width="100%" />
            </div>
          </div>
        </section>
        <section className="pt60 pb90 bgc-f7">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <Skeleton height={50} width="100%" />
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <Skeleton height={50} width="100%" />
                  <Skeleton count={3} />
                </div>
                <div id="custom-background-input" className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <Skeleton height={50} width="100%" />
                  <Skeleton count={3} />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="column">
                  <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                    <Skeleton height={200} width="100%" />
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
            <PropertyHeader data={activityData} />
          </div>
          <div className="row mb30 mt30">
            <PropertyGallery data={activityData} />
          </div>
          <div className="row mt30">
            <OverView data={activityData} />
          </div>
        </div>
      </section>
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">{t('aboutActivity')}</h4>
                <ProperytyDescriptions data={activityData} />
              </div>
              <div id="custom-background-input" className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <PropertyAddress data={activityData} />
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
