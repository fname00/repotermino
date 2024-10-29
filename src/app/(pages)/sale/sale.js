'use client';
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Office from "@/components/pages/contact/Office";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Image from "next/image";

const Contact = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Our Contact With Map */}
      <section className="p-0">
        <iframe
          className="home8-map contact-page"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56124.87261258764!2d-16.333890393292158!3d28.455308000373734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc41cceccc254171%3A0x43111473d277e52e!2sSanta%20Cruz%20de%20Tenerife%2C%20Spain!5e0!3m2!1sen!2spl!4v1725454625102!5m2!1sen!2spl"
          title="Santa Cruz de Tenerife"
          aria-label="Santa Cruz de Tenerife"
        />
      </section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section>
        <div className="container">
          <div className="row d-flex align-items-end">
            <div className="col-lg-5 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                <h4 className="form-title mb25">
                  {t('contactsale.form.title')}
                </h4>
                <ul>
                    <li>{t('contactsale.form.li1')}<a href="tel:+34605376399"> +34 605376399</a></li>
                    <li>{t('contactsale.form.li2')}</li>
                </ul>
                <h5 className="pt10">{t('contactsale.form.h5')}</h5>
                <p className="text">
                  {t('contactsale.form.description')}
                </p>
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

      {/* Team & Values Section */}
      <section className="team-values-section py-5">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-5">
              <Image
                src="https://teneryfa.b-cdn.net/photo4-m.jpg" // Zastąp 'team.jpg' nazwą pliku
                alt={t('contactsale.team.alt')}
                width={800} // Dopasuj szerokość
                height={600} // Dopasuj wysokość
                priority
                className="img-fluid bdrs12"
              />
            </div>
            <div className="col-lg-7">
              <h3 className="text-center">{t('contactsale.team.h3')}</h3>
              <p>{t('contactsale.team.description')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* End Team & Values Section */}

      {/* Team & Values Section (Reversed) */}
      <section className="team-values-section py-5">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">

              <p className="text-center">{t('contactsale.offer.description')}</p>
              <p className="text-center">{t('contactsale.offer.1description')}</p>
              <p className="text-center">{t('contactsale.offer.2description')}</p>
              <p className="text-center">{t('contactsale.offer.3description')}</p>
              <p className="text-center">{t('contactsale.offer.4description')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* End Team & Values Section (Reversed) */}

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
                <h3>{t('contactsale.offer.h3')}</h3>
                <p className="pb20">{t('contactsale.features.li1')}</p>
                <p className="pb20">{t('contactsale.features.li2')}</p>
                <p className="pb20">{t('contactsale.features.li3')}</p>
                <p className="pb20">{t('contactsale.features.li4')}</p>
                <p className="pb20">{t('contactsale.features.li5')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* End Features Section */}

      {/* Closing Banner */}
      <section className="closing-banner py-5">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <Image
                src="https://teneryfa.b-cdn.net/photo1-m.jpg" // Zastąp 'banner3.jpg' nazwą pliku
                alt={t('contactsale.closing.alt')}
                width={1206} // Dopasuj szerokość
                height={515} // Dopasuj wysokość
                priority
                className="w-100 custom-400px cover"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center py-5">
              <p>{t('contactsale.closing.description')}</p>
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

export default Contact;