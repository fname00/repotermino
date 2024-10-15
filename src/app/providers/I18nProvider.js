"use client"; // This is a Client Component

import React, { useEffect, useState } from "react";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n'; // Adjust the path to your i18n configuration file
import SplashScreen from "@/components/SplashScreen"; // Import your SplashScreen

const I18nProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for translation resources to load before rendering children
    i18n.on('loaded', () => {
      setIsLoading(false); // Translations are loaded, stop showing the splash screen
    });

    // If translations are already loaded, set loading to false immediately
    if (i18n.isInitialized) {
      setIsLoading(false);
    }
  }, []);

  // Function to signal that the splash screen animation is complete
  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    // Show the splash screen while translations are loading
    return <SplashScreen finishLoading={handleFinishLoading} />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
