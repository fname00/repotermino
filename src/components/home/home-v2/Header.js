"use client";

import MainMenu from "@/components/common/MainMenu";
import SecondMenu from "@/components/common/SecondMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname for navigation
import i18n from 'i18next'; // Import i18n instance
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(i18n.language); // Add state to keep track of the current language
  const router = useRouter(); // Initialize useRouter hook
  const pathname = usePathname(); // Get the current pathname using usePathname
  const { locale } = router; // Get the current locale from the router

  useEffect(() => {
    // Check for a saved language in cookies and set it on initial load
    const savedLocale = Cookies.get('NEXT_LOCALE'); // Get the saved locale from cookies
    if (savedLocale && savedLocale !== locale) {
      i18n.changeLanguage(savedLocale); // Change the language in i18next
      setCurrentLocale(savedLocale); // Update the state to trigger a re-render
      if (pathname) { // Ensure pathname is defined before using it
        router.push(pathname, pathname, { locale: savedLocale }); // Update the route to use the saved locale
      }
    }
  }, [locale, pathname]); // Add locale and pathname as dependencies

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
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

    if (newLocale !== locale) { // Only change if the new locale is different
      Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 }); // Save the new locale in a cookie for 365 days
      i18n.changeLanguage(newLocale); // Change language in i18next
      setCurrentLocale(newLocale); // Update the state to trigger a re-render
      if (pathname) { // Ensure pathname is defined before using it
        router.push(pathname, pathname, { locale: newLocale }); // Push the new locale to the router
      }
    }
  };

  return (
    <>
      <header
        className={`header-nav nav-homepage-style at-home2 sticky main-menu custom-nav${
          navbar ? "" : ""
        }`}
      >
        <nav className="posr">
          <div className="container maxw100pro posr">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between ">
                  <MainMenu />
                  {/* End Main Menu */}
                  <a
                    className="ml10 login-info d-flex align-items-center me-3"
                    href="tel:+012305094502"
                  >
                    <i className="far fa-phone fz16 me-2 pl10 "></i>{" "}
                    <a href="tel:+48 779 985 6875" className="custom-number d-none d-xl-block">
                    +48 779 985 6875
                    </a>
                  </a>
                </div>
              </div>
              {/* End .col-auto */}

              <div className="custom-logos logos mr40">
                <Link className="header-logo logo1" href="/">
                  <Image
                    width={138}
                    height={44}
                    src="/images/logo-b.png"
                    alt="Header Logo"
                  />
                </Link>
                <Link className="header-logo logo2" href="/">
                  <Image
                    width={138}
                    height={44}
                    src="/images/logo-b.png"
                    alt="Header Logo"
                  />
                </Link>
              </div>
              {/* End Logo */}
              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <SecondMenu />
                  <div id="language-custom" className="language-selector ms-4">
                    <Select
                      options={languageOptions}
                      className="language-selector"
                      value={languageOptions.find(option => option.value === currentLocale)} // Use state for the default value
                      isSearchable={false}
                      onChange={handleLanguageChange} // Handle change event
                    />
                  </div>
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
