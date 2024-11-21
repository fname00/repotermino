// src/app/layout-wrapper/wrapper.js

import Script from 'next/script';

const Wrapper = ({ children }) => {
  return (
    <>
      {/* Inne elementy layoutu, np. nagłówek, nawigacja */}
      
      {/* Dodanie skryptu Cookie Info */}
      <Script
        id="cookieinfo"
        src="https://cookieinfoscript.com/js/cookieinfo.min.js"
        strategy="afterInteractive" // Skrypt ładuje się po interakcji użytkownika
      />

      {/* Główna zawartość strony */}
      {children}

      {/* Inne elementy layoutu, np. stopka */}
    </>
  );
};

export default Wrapper;
