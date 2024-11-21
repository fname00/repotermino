'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

// Funkcja obliczająca ile czasu temu dodano post
const getTimeAgo = (dateAdd, t) => { // Accept `t` function for translation
  const currentDate = new Date();
  const postDate = new Date(dateAdd);

  const diffInMs = currentDate - postDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return t('daysAgo', { count: diffInDays }); // Use t function for days ago
  } else if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return t('monthsAgo', { count: diffInMonths }); // Use t function for months ago
  } else {
    const diffInYears = Math.floor(diffInDays / 365);
    return t('yearsAgo', { count: diffInYears }); // Use t function for years ago
  }
};

const PropertyHeader = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  
  // Obliczanie, ile czasu temu został dodany post
  const timeAgo = getTimeAgo(data.dateAdd, t); // Pass `t` function to getTimeAgo

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.title}</h2>
        </div>
      </div>
      {/* End .col-lg--8 */}
    </>
  );
};

export default PropertyHeader;
