'use client';
import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const MenuWidget = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const menuSections = [
    //{
    //  title: t("popular_search"), // Translation key for the title
    //  links: [
    //    { label: t("villa_in_tenerife"), href: "/all?searchQuery=villa" }, // Translation key for each label
    //    { label: t("apartment_in_tenerife"), href: "/all?searchQuery=flat" },
    //    { label: t("best_offers"), href: "/all?searchQuery=villa" },
    //    { label: t("hot"), href: "/all?searchQuery=villa" },
    //  ],
    //},
    //{
    //  title: t("quick_links"),
    //  links: [
    //    { label: t("about1"), href: "/about" },
    //    { label: t("our_services"), href: "/sale" },
    //    { label: t("contact_support"), href: "/contact" },
    //    { label: t("careers"), href: "/cv" },
    //   { label: t("faqs"), href: "/faq" },
    //  ],
    //},
    //{
    //  title: t("discover"),
    //  links: [
    //    { label: t("tenerife"), href: "/teneryfa" },
    //    { label: t("fuertaventura"), href: "/fuerteventura" },
    //    { label: t("gran_canaria"), href: "/grancanaria" },
    //   { label: t("lanzarote1"), href: "/lanzarote" },
    // ],
    //},

    //tlumacz
        {
      title: t("zakładki"),
      links: [
        { label: t("blog"), href: "/blog" },
        { label: t("jak_zaczac"), href: "/about_start" },
        { label: t("zespół"), href: "/about" },
        { label: t("e-book"), href: "/ebook" },
       { label: t("polityka_cookies"), href: "/cookies" },
     ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
