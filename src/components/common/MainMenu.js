import {
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
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
            Buy
          </span>
        </a>
      </li>
      <li className="megamenu_style dropitem">
        <a className="list-item" href="/rent">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            Rent
          </span>
        </a>
      </li>
      <li className="megamenu_style dropitem">
        <a className="list-item" href="/sale">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            Sale
          </span>
        </a>
      </li>
      <li className="megamenu_style dropitem">
        <a className="list-item" href="/activity">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            Activity
          </span>
        </a>
      </li>
      {/* End listings */}

    </ul>
  );
};

export default MainMenu;
