// src/app/layout-wrapper/wrapper.js
import Script from 'next/script';

const Wrapper = ({ children }) => {
  return (
    <>


      {/* Główna zawartość strony */}
      {children}

      {/* Inne elementy layoutu, np. stopka */}
    </>
  );
};

export default Wrapper;
