/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'pl'], // List all supported locales
    defaultLocale: 'en',   // Set the default locale
    localeDetection: false, // Automatically detect user's locale
  },
  // Other Next.js configuration options...
};

module.exports = nextConfig;
