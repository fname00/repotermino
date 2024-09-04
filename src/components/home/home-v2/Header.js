"use client";

import MainMenu from "@/components/common/MainMenu";
import SecondMenu from "@/components/common/SecondMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

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
    { value: "en", label: <><img src="/images/gb.svg" alt="English=" width="40" /></> },
    { value: "es", label: <><img src="/images/es.svg" alt="Spanish" width="40" /></> },
    { value: "pl", label: <><img src="/images/pl.svg" alt="Polish" width="40" /></> },
  ];

  return (
    <>
      <header
        className={`header-nav nav-homepage-style at-home2  sticky main-menu custom-nav${
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
                    <span className="custom-number d-none d-xl-block">
                      2 911 098 7654
                    </span>
                  </a>
                </div>
              </div>
              {/* End .col-auto */}

              <div className="custom-logos logos mr40">
                <Link className="header-logo logo1" href="/">
                  <Image
                    width={138}
                    height={44}
                    src="/images/header-logo8.svg"
                    alt="Header Logo"
                  />
                </Link>
                <Link className="header-logo logo2" href="/">
                  <Image
                    width={138}
                    height={44}
                    src="/images/header-logo8.svg"
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
                      defaultValue={languageOptions[0]}
                      isSearchable={false}
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