import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const SecondMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const { t } = useTranslation('common');
  useEffect(() => {
    if (pathname.split("/")[1] === "blog-list-v2") {
      setTopMenu("blog");
    } else if (pathname.split("/")[1] === "pages") {
      setTopMenu("pages");
    }
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] === pathname.split("/")[1]) {
      return "menuActive";
    }
  };

  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <Link className="list-item" href="/favorites">
          <span className={handleActive("/favorites") ? "title menuActive" : "title"}>
            {t('Favorites')}
          </span>
        </Link>
      </li>
      {/* End favorites Item */}


      <li className="visible_list dropitem">
        <Link className="list-item" href="/ebook">
          <span className={handleActive("/ebook") ? "title menuActive" : "title"}>
            Ebook
          </span>
        </Link>
      </li>
      {/* End ebook Item */}

      <li className="visible_list dropitem">
        <Link className="list-item" href="/about">
          <span className={handleActive("/about") ? "title menuActive" : "title"}>
             {t('About')}
          </span>
        </Link>
      </li>
      {/* End about Item */}

      <li className="visible_list dropitem">
        <Link className="list-item" href="/blog">
          <span className={handleActive("/blog") ? "title menuActive" : "title"}>
            Blog
          </span>
        </Link>
      </li>
      {/* End blog Item */}
    </ul>
  );
};

export default SecondMenu;