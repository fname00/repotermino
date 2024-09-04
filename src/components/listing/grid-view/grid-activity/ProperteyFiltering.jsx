'use client';

import listings from "@/data/activity"; // Zmiana importu na activity.js
import React, { useState, useEffect } from 'react';
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import TopFilterBar from './TopFilterBar';
import FeaturedListings from './FeatuerdListings';
import PaginationTwo from "../../PaginationTwo";

export default function ProperteyFiltering() {
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  useEffect(() => {
    setPageItems(listings.slice((pageNumber - 1) * 9, pageNumber * 9));
    setPageContentTrac([((pageNumber - 1) * 9) + 1, pageNumber * 9, listings.length]);
  }, [pageNumber]);

  return (
    <section className="pt0 pb90 bgc-f7 custom_top_activity">
      <div className="container">
        <div className="row">
          <FeaturedListings colstyle={colstyle} data={pageItems} />
        </div>
        {/* End .row */}

        <div className="row">
          <PaginationTwo pageCapacity={9} data={listings} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}