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
import { useTranslation } from "react-i18next";
import PropertyTypeModal from './PropertyTypeModal'; // Import the modal component
import ListingTypeModal from './ListingTypeModal'; // Import the modal component

const MainMenu = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false); // State to manage property modal visibility
  const [isListingModalOpen, setIsListingModalOpen] = useState(false); // State to manage listing modal visibility

  useEffect(() => {
    // Existing logic for setting topMenu and submenu
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] === pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] === pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] === pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] === pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    return link.split("/")[1] === pathname.split("/")[1] ? "menuActive" : "";
  };

  const openPropertyModal = () => {
    setIsPropertyModalOpen(true); // Open the property modal
  };

  const closePropertyModal = () => {
    setIsPropertyModalOpen(false); // Close the property modal
  };

  const openListingModal = () => {
    setIsListingModalOpen(true); // Open the listing modal
  };

  const closeListingModal = () => {
    setIsListingModalOpen(false); // Close the listing modal
  };

  return (
    <>
      <ul className="ace-responsive-menu bdrr1">
        <li className="megamenu_style dropitem">
          <a style={{ cursor: 'pointer' }} className="list-item" onClick={openPropertyModal}>
            <span className={topMenu === "listing" ? "title menuActive" : "title"}>
              {t('buy')}
            </span>
          </a>
        </li>
        <li style={{ cursor: 'pointer' }} className="megamenu_style dropitem">
          <a className="list-item" onClick={openListingModal}>
            <span className={topMenu === "listing" ? "title menuActive" : "title"}>
              {t('rent')}
            </span>
          </a>
        </li>
        <li className="megamenu_style dropitem">
          <a className="list-item" href="/sale">
            <span className={topMenu === "listing" ? "title menuActive" : "title"}>
              {t('sale')}
            </span>
          </a>
        </li>
        <li className="megamenu_style dropitem">
          <a className="list-item" href="/activity">
            <span className={topMenu === "listing" ? "title menuActive" : "title"}>
              {t('activity')}
            </span>
          </a>
        </li>
        {/* End listings */}
      </ul>

      {/* Render the property modal */}
      <PropertyTypeModal isOpen={isPropertyModalOpen} onClose={closePropertyModal} />
      {/* Render the listing modal */}
      <ListingTypeModal isOpen={isListingModalOpen} onClose={closeListingModal} />
    </>
  );
};

export default MainMenu;
