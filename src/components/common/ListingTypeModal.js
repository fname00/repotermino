import React from 'react';
import { useTranslation } from 'react-i18next';

const PropertyTypeModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');

  const handleLinkClick = (path) => {
    // Close modal and navigate to the selected path
    onClose();
    window.location.href = path; // Alternatively, use Next.js router for navigation
  };

  const handleOverlayClick = (e) => {
    // Check if the click is on the overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div style={{ width: 'fit-content'}} className="modal-content">
        <h2 style={{ textAlign: 'center' }}>{t('rent')}</h2>
        <ul style={{ justifyContent: 'center'}}>
        <li onClick={() => handleLinkClick('/rent')}>{t('all')}</li>
          <li onClick={() => handleLinkClick('/rent?propertyStatus=Rent')}>{t('longterm')}</li>
          <li onClick={() => handleLinkClick('/rent?propertyStatus=Holiday')}>{t('shortterm')}</li>
        </ul>
      </div>
    </div>
  );
};  

export default PropertyTypeModal;
