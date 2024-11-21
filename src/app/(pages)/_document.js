// src/pages/_app.js

import '../styles/globals.css'; // Import Twoich globalnych stylów, jeśli istnieją
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Inne globalne komponenty, np. navbar */}
      
      {/* Dodanie skryptu cookieinfoscript */}
      <Script
        id="cookieinfo"
        src="//cookieinfoscript.com/js/cookieinfo.min.js"
        strategy="afterInteractive" // Ładuje skrypt po interakcji użytkownika
      />

      {/* Renderowanie strony */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
