'use client';

import Link from "next/link";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import Social from "./Social";
import ProSidebarContent from "./ProSidebarContent";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Select from "react-select"; // Import Select for language selection
import i18n from 'i18next'; // Import i18n instance
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import { useState, useEffect } from "react";

const MobileMenu = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const [currentLocale, setCurrentLocale] = useState(i18n.language); // Add state to keep track of the current language

  useEffect(() => {
    // Check for a saved language in cookies and set it on initial load
    const savedLocale = Cookies.get('NEXT_LOCALE'); // Get the saved locale from cookies
    if (savedLocale && savedLocale !== i18n.language) {
      i18n.changeLanguage(savedLocale); // Change the language in i18next
      setCurrentLocale(savedLocale); // Update the state to trigger a re-render
    }
  }, []);

  // Define language options for the select component
  const languageOptions = [
    { value: "en", label: <><img src="/images/gb.svg" alt="English" width="20" /> English</> },
    { value: "es", label: <><img src="/images/es.svg" alt="Spanish" width="20" /> Spanish</> },
    { value: "pl", label: <><img src="/images/pl.svg" alt="Polish" width="20" /> Polish</> },
  ];

  // Handle language change
  const handleLanguageChange = (selectedOption) => {
    const newLocale = selectedOption.value; // Get the selected language code

    if (newLocale !== currentLocale) { // Only change if the new locale is different
      Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 }); // Save the new locale in a cookie for 365 days
      i18n.changeLanguage(newLocale); // Change language in i18next
      setCurrentLocale(newLocale); // Update the state to trigger a re-render
    }
  };

  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <a
                className="menubar"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <Image
                  width={25}
                  height={9}
                  src="/images/mobile-dark-nav-icon.svg"
                  alt={t('mobileIcon')}
                />
              </a>
              <Link className="mobile_logo" href="/">
                <Image
                  width={138}
                  height={44}
                  src="/images/logo-b.png"
                  alt={t('logo')}
                />
              </Link>
              <a className="pl25"></a>
            </div>
          </div>
        </div>
      </div>
      {/* /.mobile-menu meta */}

      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label={t('close')}
            >
              <span className="far fa-times"></span>
            </div>
            <h4 className="title">{t('welcomeToSite', { siteName: 'Teneryfa.org.pl' })}</h4>
          </div>
          {/* End header */}

          <div className="hsidebar-content">
            <div className="hiddenbar_navbar_content">
              <ProSidebarContent />
              {/* End .hiddenbar_navbar_menu */}

              <div className="hiddenbar_footer position-relative bdrt1">
                <div className="row pt45 pb30 pl30">
                  <ContactInfo />
                </div>
                {/* End .row */}

                <div className="row pt30 pb30 justify-content-center">
                  <div className="col-auto">
                    <div className="language-selector">
                      <Select
                        options={languageOptions}
                        value={languageOptions.find(option => option.value === currentLocale)} // Use state for the default value
                        isSearchable={false}
                        onChange={handleLanguageChange} // Handle change event
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* hiddenbar_footer */}
            </div>
          </div>
          {/* End hsidebar-content */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;