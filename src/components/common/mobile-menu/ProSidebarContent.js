import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropertyTypeModal from "../PropertyTypeModal";
import ListingTypeModal from "../ListingTypeModal";

const ProSidebarContent = () => {
  const path = usePathname();
  const { t } = useTranslation('common');
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  const openPropertyModal = () => {
    setIsPropertyModalOpen(true);
  };

  const closePropertyModal = () => {
    setIsPropertyModalOpen(false);
  };

  const openListingModal = () => {
    setIsListingModalOpen(true);
  };

  const closeListingModal = () => {
    setIsListingModalOpen(false);
  };

  const handleActive = (link) => {
    if (link.split("/")[1] === path.split("/")[1]) {
      return "menuActive";
    }
  };

  return (
    <>
      <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
        <Menu>
          <MenuItem
            className="megamenu_style dropitem"
            onClick={openPropertyModal}
            style={{ cursor: "pointer" }}
          >
            <span className={"title"}>{t("buy")}</span>
          </MenuItem>

          <MenuItem
            className="megamenu_style dropitem"
            onClick={openListingModal}
            style={{ cursor: "pointer" }}
          >
            <span className={"title"}>{t("rent")}</span>
          </MenuItem>

          <MenuItem component={<Link href="/sale" />} className={"megamenu_style dropitem"}>
            <span className={"title"}>{t("sale")}</span>
          </MenuItem>

          <MenuItem component={<Link href="/activity" />} className={"megamenu_style dropitem"}>
            <span className={"title"}>{t("activity")}</span>
          </MenuItem>

          <MenuItem component={<Link href="/favorites" />} className="visible_list dropitem">
            <span className={handleActive("/favorites") ? "title menuActive" : "title"}>
              {t("Favorites")}
            </span>
          </MenuItem>

          <MenuItem component={<Link href="/about" />} className="visible_list dropitem">
            <span className={handleActive("/about") ? "title menuActive" : "title"}>
              {t("About")}
            </span>
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Render the property modal */}
      <PropertyTypeModal isOpen={isPropertyModalOpen} onClose={closePropertyModal} />
      {/* Render the listing modal */}
      <ListingTypeModal isOpen={isListingModalOpen} onClose={closeListingModal} />
    </>
  );
};

export default ProSidebarContent;
