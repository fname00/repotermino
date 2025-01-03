'use client';

import React from "react";
import Funfact from "./Funfact";
import ProductSingle from "./ProductSingle";
import Image from "next/image";
import VideoBox from "./VideoBox";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const About = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  return (
    <div className="row mt80 mt0-md">
      <div className="col-md-6 col-xl-6">
        <div className="position-relative">
          <div className="img-box-7">
            <Image
              width={591}
              height={768}
              className="w-100 h-100 cover img-1"
              src="/images/about/about-2.jpg"
              alt="about"
            />
          </div>
          <div className="img-box-8 position-relative">
            <Image
              width={193}
              height={193}
              className="img-1 spin-right"
              src="/images/about/element-1.png"
              alt="about"
            />
          </div>
          <VideoBox />
          {/*<div className="img-box-10 position-relative">
            <ProductSingle />
          </div>*/}
        </div>
      </div>
      {/* End col */}

      <div className="col-md-6 col-xl-4 offset-xl-2">
        <div className="about-box-1">
          <h2 className="title mb30">{t('aboutTitle')}</h2>
          <p className="text mb20 fz15">
            {t('aboutText')}
          </p>
          <Funfact />
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default About;
