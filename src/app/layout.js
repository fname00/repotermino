"use client"; // This is a Client Component

import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import "rc-slider/assets/index.css";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, Suspense } from "react";  // Import Suspense from React
import I18nProvider from './providers/I18nProvider'; // Import the I18nProvider component

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
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`body  ${poppins.variable} ${dmSans.variable}`}
        cz-shortcut-listen="false"
      >
        {/* Wrap the application with I18nProvider */}
        <I18nProvider>
          {/* Suspense ensures translations are ready before rendering children */}
          <Suspense fallback={<div></div>}>
            <div className="wrapper ovh">{children}</div>
          </Suspense>
          <ScrollToTop />
        </I18nProvider>
      </body>
    </html>
  );
}
