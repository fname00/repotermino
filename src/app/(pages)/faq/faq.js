'use client';
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Faq2 from "@/components/pages/faq/Faq2";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Image from "next/image";
const Faq = () => {
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
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">{t('faq.title')}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}
      {/* FAQ Section Area */}
      <section className="our-faq pb90 pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-12">
              <div className="ui-content">
                <div className="accordion-style1 faq-page mb-4 mb-lg-5">
                  <div className="accordion" id="accordionExample">
                    {[...Array(10)].map((_, index) => (
                      <div className="accordion-item" key={index}>
                        <h2 className="accordion-header" id={`heading${index + 1}`}>
                          <button
                            className={`accordion-button ${index === 2 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index + 1}`}
                            aria-expanded={index === 2 ? "true" : "false"}
                            aria-controls={`collapse${index + 1}`}
                          >
                            {t(`faq.questions.question${index + 1}`)}
                          </button>
                        </h2>
                        <div
                          id={`collapse${index + 1}`}
                          className={`accordion-collapse collapse ${index === 2 ? "show" : ""}`}
                          aria-labelledby={`heading${index + 1}`}
                          data-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>{t(`faq.answers.answer${index + 1}`, { parse: (data) => data.split('\n').map((item, i) => <span key={i}>{item}<br /></span>) })}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End FAQ Section Area */}

      {/* Closing Banner */}
      <section className="closing-banner pt0 mt0">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>{t('faq.end')}</p>
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

export default Faq;