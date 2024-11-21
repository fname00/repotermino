"use client";

import MainMenu from "@/components/common/MainMenu";
import SecondMenu from "@/components/common/SecondMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter, usePathname } from 'next/navigation';
import i18n from 'i18next';
import Cookies from 'js-cookie';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(i18n.language);
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = router;

  useEffect(() => {
    const savedLocale = Cookies.get('NEXT_LOCALE');
    if (savedLocale && savedLocale !== locale) {
      i18n.changeLanguage(savedLocale);
      setCurrentLocale(savedLocale);
      if (pathname) {
        router.push(pathname, pathname, { locale: savedLocale });
      }
    }
  }, [locale, pathname]);

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

  const languageOptions = [
    { value: "en", label: <><img src="/images/gb.svg" alt="English" width="20" /> English</> },
    { value: "es", label: <><img src="/images/es.svg" alt="Spanish" width="20" /> Spanish</> },
    { value: "pl", label: <><img src="/images/pl.svg" alt="Polish" width="20" /> Polish</> },
  ];

  const handleLanguageChange = (selectedOption) => {
    const newLocale = selectedOption.value;

    if (newLocale !== locale) {
      Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 });
      i18n.changeLanguage(newLocale);
      setCurrentLocale(newLocale);
      if (pathname) {
        router.push(pathname, pathname, { locale: newLocale });
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
                    <i className="far fa-phone fz16 me-2 pl10 "></i>
                    <a href="tel:+44 779 985 6875" className="custom-number d-none d-xl-block">
                      +44 779 985 6875
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
                      value={languageOptions.find(option => option.value === currentLocale)}
                      isSearchable={false}
                      onChange={handleLanguageChange}
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

      {/* WhatsApp Button */}
      <div className="whatsapp-button">
        <a
          href="https://api.whatsapp.com/send/?phone=447799856875"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          <Image
            src="/images/whatsapp.webp" // Upewnij się, że ścieżka jest poprawna
            alt="WhatsApp"
            width={150} // Dostosuj rozmiar według potrzeb
            height={150}
          />
        </a>
      </div>

    </>
  );
};

export default Header;
