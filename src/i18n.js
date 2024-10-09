import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Correct path to translation files
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    ns: ['common'], // Namespaces
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes content
    },
    react: {
      useSuspense: false, // Disable suspense for SSR
    },
  });

export default i18n;
