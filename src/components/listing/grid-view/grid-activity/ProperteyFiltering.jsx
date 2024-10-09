"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for accessing locale
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import TopFilterBar from './TopFilterBar';
import FeaturedListings from './FeatuerdListings';
import PaginationTwo from "../../PaginationTwo";

export default function PropertyFiltering() {
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const router = useRouter(); // Use the router to get locale if not in cookies

  // Retrieve the locale from cookies, or fall back to the router locale
  const locale = Cookies.get('NEXT_LOCALE') || router.locale;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/activity?locale=${locale}`); // Include locale in the API request
        const listings = await response.json();

        setPageItems(listings.slice((pageNumber - 1) * 9, pageNumber * 9));
        setPageContentTrac([((pageNumber - 1) * 9) + 1, pageNumber * 9, listings.length]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [pageNumber, locale]); // Re-fetch data when pageNumber or locale changes

  return (
    <section className="pt0 pb90 bgc-f7 custom_top_activity">
      <div className="container">
        <div className="row">
          <FeaturedListings colstyle={colstyle} data={pageItems} />
        </div>
        {/* End .row */}

        <div className="row">
          <PaginationTwo pageCapacity={9} data={pageItems} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
