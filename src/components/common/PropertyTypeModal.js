// PropertyTypeModal.js
import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

const PropertyTypeModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');

  const handleLinkClick = (path) => {
    onClose();
    window.location.href = path; // Alternatively, use Next.js router for navigation
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" style={{ width: 'fit-content' }}>
        <h2 style={{ textAlign: 'center' }}>{t('buy')}</h2>
        <ul>
          <li onClick={() => handleLinkClick('/buy')}>{t('all')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=villa')}>{t('villa')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=penthouse')}>{t('penthouse')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=duplex')}>{t('duplex')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=flat')}>{t('flat')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=bungalow')}>{t('bungalow')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=country-house')}>{t('country house')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=building')}>{t('building')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=land')}>{t('land')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=studio')}>{t('studio')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=office')}>{t('office')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=shop')}>{t('shop')}</li>
          <li onClick={() => handleLinkClick('/buy?propertyType=parking')}>{t('parking')}</li>
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default PropertyTypeModal;
