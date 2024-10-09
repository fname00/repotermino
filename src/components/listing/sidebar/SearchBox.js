'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const SearchBox = ({ filterFunctions }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  return (
    <div className="search_area">
      <input
        type="text"
        className="form-control"
        placeholder={t('searchPlaceholder')} // Use translation for placeholder text
        onChange={(e) => filterFunctions?.setSearchQuery(e.target.value)}
      />
      <label>
        <span className="flaticon-search" />
      </label>
    </div>
  );
};

export default SearchBox;
