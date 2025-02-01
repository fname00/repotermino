// src/pages/_app.js

import '../styles/globals.css'; // Import Twoich globalnych stylów, jeśli istnieją
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      
      {/* Renderowanie strony */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
