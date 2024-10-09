'use client';

import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const CustomContact = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
      <div className="d-flex justify-content-around">
        <button
          className="btn btn-primary mb10 custom-contact-button"
          onClick={() => setShowPhone(!showPhone)}
        >
          <i className="fas fa-phone-alt pe-2" />
          {showPhone ? data.clientPhone : t('viewPhone')} {/* Translated 'View Phone' */}
        </button>
        <button className="btn btn-secondary mb10 custom-contact-button">
          {t('contactAgent')} {/* Translated 'Contact Agent' */}
        </button>
      </div>
    </div>
  );
};

export default CustomContact;
