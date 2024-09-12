// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './public/locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
