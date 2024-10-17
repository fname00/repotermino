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
      <section className="breadcumb-section23 p-0">
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

      {/* About Section */}
      <section className="about-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start">
              <h3>{t('about.section1.col1')}</h3>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start">
              <p>{t('about.section1.col2')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* End About Section */}

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start">
              <ul>
                <li>{t('about.section2.col1.li1')}</li>
                <li>{t('about.section2.col1.li2')}</li>
                <li>{t('about.section2.col1.li3')}</li>
                <li>{t('about.section2.col1.li4')}</li>
              </ul>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start">
              <ul>
                <li>{t('about.section2.col2.li1')}</li>
                <li>{t('about.section2.col2.li2')}</li>
                <li>{t('about.section2.col2.li3')}</li>
                <li>{t('about.section2.col2.li4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* End Features Section */}

      {/* Second Banner */}
      <section className="second-banner py-5">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <Image
                src="/images/about/banner2.jpg" // Zastąp 'banner2.jpg' nazwą pliku
                alt={t('about.banner2.alt')}
                width={1206} // Dopasuj szerokość
                height={515} // Dopasuj wysokość
                priority
                className="w-100 custom-400px cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Second Banner */}

      {/* Fun Facts Section */}
      <section className="fun-facts-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
              <h2>515+</h2>
              <p>{t('about.funfacts.item1')}</p>
            </div>
            <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
              <h2>12K</h2>
              <p>{t('about.funfacts.item2')}</p>
            </div>
            <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
              <h2>100+</h2>
              <p>{t('about.funfacts.item3')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* End Fun Facts Section */}

      {/* Team & Values Section */}
      <section className="team-values-section py-5">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-6">
              <h3>{t('about.section4.h3')}</h3>
              <p>{t('about.section4.col1')}</p>
            </div>
            <div className="col-lg-6">
              <Image
                src="/images/about/team.jpg" // Zastąp 'team.jpg' nazwą pliku
                alt={t('about.team.alt')}
                width={800} // Dopasuj szerokość
                height={600} // Dopasuj wysokość
                priority
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Team & Values Section */}

      {/* Closing Banner */}
      <section className="closing-banner py-5">
        <div className="container">

          <div className="row">
            <div className="col-12 text-center py-5">
              <p>{t('about.section5.text')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* End Closing Banner */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;