'use client';

import {
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const MainMenu = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };

  return (
    <ul className="ace-responsive-menu bdrr1">
      <li className="megamenu_style dropitem">
        <a className="list-item" href="/buy">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            {t('buy')}
          </span>
        </a>
      </li>
      <li className="megamenu_style dropitem">
        <a className="list-item" href="/rent">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            {t('rent')}
          </span>
        </a>
      </li>
      <li className="megamenu_style dropitem">
        <a className="list-item" href="/sale">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            {t('sale')}
          </span>
        </a>
      </li>
      <li className="megamenu_style dropitem">
        <a className="list-item" href="/activity">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            {t('activity')}
          </span>
        </a>
      </li>
      {/* End listings */}
    </ul>
  );
};

export default MainMenu;
