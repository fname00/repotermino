'use client';
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/home/home-v2/Header";
import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Agents from "@/components/pages/about/Agents";
import Features from "@/components/pages/about/Features";
import FunFact from "@/components/pages/about/FunFact";
import Mission from "@/components/pages/about/Mission";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const About = () => {
    const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      <section className="breadcumb-section22 p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                {/* Placeholder for breadcrumb */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}

      {/* Our About Area */}
      <section className="our-about pb90">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <h1 className="text mb25">
                {t('lanzarote.h1')} {/* Translation of the first description */}
              </h1>
              <p className="text mb20">
                {t('lanzarote.p1')} {/* Translation of the second description */}
              </p>
              <h2 className="text mb25">
                {t('lanzarote.h2')} {/* Translation of the first description */}
              </h2>
              <p className="text mb20">
                {t('lanzarote.p2')} {/* Translation of the second description */}
              </p>
              <h2 className="text mb25">
                {t('lanzarote.h3')} {/* Translation of the first description */}
              </h2>
              <p className="text mb20">
                {t('lanzarote.p3')} {/* Translation of the second description */}
              </p>
              <h2 className="text mb25">
                {t('lanzarote.h4')} {/* Translation of the first description */}
              </h2>
              <p className="text mb20">
                {t('lanzarote.p4')} {/* Translation of the second description */}
              </p>
              <h2 className="text mb25">
                {t('lanzarote.h5')} {/* Translation of the first description */}
              </h2>
              <p className="text mb20">
                {t('lanzarote.p5')} {/* Translation of the second description */}
              </p>
              <h2 className="text mb25">
                {t('lanzarote.h6')} {/* Translation of the first description */}
              </h2>
              <p className="text mb20">
                {t('lanzarote.p6')} {/* Translation of the second description */}
              </p>
              <h2 className="text mb25">
                {t('lanzarote.h7')} {/* Translation of the first description */}
              </h2>
              <p className="text mb20">
                {t('lanzarote.p7')} {/* Translation of the second description */}
              </p>
              <h2 className="text mb25">
                {t('lanzarote.h8')} {/* Translation of the first description */}
              </h2>
              <p className="text mb20">
                {t('lanzarote.p8')} {/* Translation of the second description */}
              </p>

            </div>
          </div>
        </div>
      </section>
      {/* End Our About Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;
