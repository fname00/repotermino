/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'pl'], // List all supported locales
    defaultLocale: 'en',   // Set the default locale
    localeDetection: false, // Automatically detect user's locale
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'teneryfa.b-cdn.net',
        port: '', // Opcjonalnie, jeśli domena korzysta z niestandardowego portu
        pathname: '/**', // Używamy wildcard, aby obsłużyć wszystkie ścieżki
      },
    ],
  },
  // Other Next.js configuration options...
};

module.exports = nextConfig;
