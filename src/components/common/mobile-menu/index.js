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

  // Define language options for the select component (only flags, no text)
  const languageOptions = [
    { value: "en", label: <div className="flag-container"><img src="/images/gb.svg" alt="English" width="30" /></div> },
    { value: "es", label: <div className="flag-container"><img src="/images/es.svg" alt="Spanish" width="30" /></div> },
    { value: "pl", label: <div className="flag-container"><img src="/images/pl.svg" alt="Polish" width="30" /></div> },
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

  // SVG Icon as React Component
  const PhoneIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="24"
      height="24"
      fill="green" // Set the icon color to green
      aria-hidden="true"
      focusable="false"
    >
      {/* Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com */}
      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
    </svg>
  );

  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              
              {/* Lewa Sekcja: Logo */}
              <Link className="mobile_logo" href="/">
                <Image
                  width={138}
                  height={44}
                  src="/images/logo-b.png"
                  alt={t('logo')}
                />
              </Link>

              {/* Prawa Sekcja: Ikona Telefonu, Selektor Języka, Ikona Menu */}
              <div className="d-flex align-items-center">
                
                {/* Ikona Telefonu */}
                <a
                  href="https://api.whatsapp.com/send/?phone=447799856875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                  aria-label={t('contactViaWhatsApp')}
                >
                  <PhoneIcon />
                </a>

                {/* Selektor Języka */}
                <div className="language-selector me-3">
                  <Select
                    options={languageOptions}
                    value={languageOptions.find(option => option.value === currentLocale)} // Use state for the default value
                    isSearchable={false}
                    onChange={handleLanguageChange} // Handle change event
                    getOptionLabel={e => e.label} // Ensure only the flag is shown
                    components={{ DropdownIndicator: () => null }} // Hide the dropdown indicator if necessary
                    classNamePrefix="react-select"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minWidth: '40px',
                        height: '40px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '0px',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: state.isSelected ? '#e0e0e0' : '#fff',
                        ':hover': {
                          backgroundColor: '#f0f0f0',
                        },
                        lineHeight: '0px',
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 1000, // Ensure the menu is above other elements
                      }),
                      dropdownIndicator: () => ({
                        display: 'none',
                      }),
                      indicatorSeparator: () => ({
                        display: 'none',
                      }),
                    }}
                  />
                </div>

                {/* Ikona Menu */}
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
              </div>

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
