"use client";

import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import "rc-slider/assets/index.css";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, Suspense } from "react";
import I18nProvider from './providers/I18nProvider';
import Script from 'next/script';
import Cookies from 'js-cookie';
import i18n from 'i18next';

if (typeof window !== "undefined") {
  import("bootstrap");
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    // ✅ Ustawienie domyślnego języka w cookies
    let savedLocale = Cookies.get('NEXT_LOCALE');

    if (!savedLocale) {
      savedLocale = "pl"; // Domyślny język
      Cookies.set('NEXT_LOCALE', savedLocale, { expires: 365 });
    }

    if (savedLocale !== i18n.language) {
      i18n.changeLanguage(savedLocale);
    }

    // ✅ Inicjalizacja animacji AOS
    Aos.init({
      duration: 1200,
      once: true,
    });

    // ✅ Dynamically import Bootstrap (poprawia działanie menu)
    import("bootstrap").then(() => {
      console.log("✅ Bootstrap loaded");
    });

  }, []);

  return (
    <html lang="pl">
      <head>
        {/* ✅ Google Tag Manager w HEAD */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PV822L8N');
          `
        }} />
      </head>
      <body className={`body ${poppins.variable} ${dmSans.variable}`} cz-shortcut-listen="false">
        {/* ✅ Fallback GTM, gdy JS jest wyłączony */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PV822L8N"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* ✅ Skrypt dla interaktywnego menu */}
        <Script
          id="menu-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function() {
                console.log("✅ Menu script initialized");
                var toggles = document.querySelectorAll(".navbar-toggler");
                toggles.forEach(toggle => {
                  toggle.addEventListener("click", function() {
                    document.body.classList.toggle("menu-open");
                  });
                });
              });
            `,
          }}
        />

        <I18nProvider>
          <Suspense fallback={<div></div>}>
            <div className="wrapper ovh">{children}</div>
          </Suspense>
          <ScrollToTop />
        </I18nProvider>
      </body>
    </html>
  );
}
