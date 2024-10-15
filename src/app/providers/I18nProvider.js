"use client"; // This is a Client Component

import React from "react";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n'; // Adjust the path to your i18n configuration file

const I18nProvider = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;