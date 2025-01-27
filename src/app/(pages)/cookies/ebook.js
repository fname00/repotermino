"use client";
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
  const { t } = useTranslation("common"); // korzystamy z namespace "common"

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav */}
      <MobileMenu />
      {/* End Mobile Nav */}

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
            <div className="center">

              {/* SECTION 1 */}
              <h3>{t("section_1.title")}</h3>
              <p>{t("section_1.paragraph_1")}</p>
              <p>{t("section_1.paragraph_2")}</p>
              <p>{t("section_1.paragraph_3")}</p>
              <p>{t("section_1.paragraph_4")}</p>
              <p>{t("section_1.paragraph_5")}</p>
              <p>{t("section_1.paragraph_6")}</p>
              <p>{t("section_1.paragraph_7")}</p>
              <p>{t("section_1.paragraph_8")}</p>
              <p>{t("section_1.paragraph_9")}</p>
              <p>{t("section_1.paragraph_10")}</p>
              <p>{t("section_1.paragraph_11")}</p>

              {/* SECTION 2 */}
              <h3>{t("section_2.title")}</h3>
              <p>{t("section_2.paragraph_1")}</p>
              <p>{t("section_2.paragraph_2")}</p>
              <p>{t("section_2.paragraph_3")}</p>

              {/* SECTION 3 */}
              <h3>{t("section_3.title")}</h3>
              <p>{t("section_3.paragraph_1")}</p>
              <p>{t("section_3.paragraph_2")}</p>
              <p>{t("section_3.paragraph_3")}</p>
              <p>{t("section_3.paragraph_4")}</p>
              <p>{t("section_3.paragraph_5")}</p>
              <p>{t("section_3.paragraph_6")}</p>
              <p>{t("section_3.paragraph_7")}</p>
              <p>{t("section_3.paragraph_8")}</p>
              <p>{t("section_3.paragraph_9")}</p>
              <p>{t("section_3.paragraph_10")}</p>

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
