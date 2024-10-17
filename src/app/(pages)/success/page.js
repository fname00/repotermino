'use client';
import React from 'react';
import DefaultHeader from "@/components/home/home-v2/Header";
import MobileMenu from "@/components/common/mobile-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Correct import for WhatsApp icon
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const SuccessPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <>
      {/* Main Header Nav - Hidden */}
      <div style={{ display: 'none' }}>
        <DefaultHeader />
      </div>

      {/* Mobile Nav - Hidden */}
      <div style={{ display: 'none' }}>
        <MobileMenu />
      </div>
      <section className="pt0 mt0">
        <div style={styles.container}>
          <h1 style={styles.title}>{t('thankYouTitle')}</h1>
          <p style={styles.text}>{t('thankYouMessage')}</p>
          <p style={styles.text}>{t('contactMessage')}</p>

          <div style={styles.iconContainer}>
            {/* WhatsApp Icon */}
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <FontAwesomeIcon icon={faWhatsapp} style={styles.icon} />
              <span style={styles.iconText}>{t('whatsapp')}</span>
            </a>

            {/* Phone Icon */}
            <a href="tel:+1234567890" style={styles.iconLink}>
              <FontAwesomeIcon icon={faPhone} style={styles.icon} />
              <span style={styles.iconText}>{t('callUs')}</span>
            </a>

            {/* Email Icon */}
            <a href="mailto:info@example.com" style={styles.iconLink}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
              <span style={styles.iconText}>{t('emailUs')}</span>
            </a>
          </div>

          <button onClick={handleBackToHome} style={styles.homeButton}>
            {t('backToHome')}
          </button>
        </div>
      </section>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.25rem',
    color: '#555',
    marginBottom: '10px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%',
    marginTop: '30px',
  },
  iconLink: {
    textDecoration: 'none',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#4CAF50',
  },
  iconText: {
    fontSize: '1rem',
    color: '#333',
  },
  homeButton: {
    marginTop: '40px',
    padding: '10px 20px',
    fontSize: '1.1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SuccessPage;
