import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next"; // Import useTranslation hook

// This is the success page component
const SuccessPage = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('thankYou')}</h1>
      <p style={styles.text}>{t('orderProcessed')}</p>
      <p style={styles.text}>{t('contactUs')}</p>

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

      {/* Back to Home Button */}
      <button onClick={handleBackToHome} style={styles.homeButton}>
        {t('backToHome')}
      </button>
    </div>
  );
};

// Inline styles for the success page
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
