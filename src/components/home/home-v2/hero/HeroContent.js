"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HeroContent = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    router.push(`/all?searchQuery=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="advance-style2 mt80 mt0-md mb60 mx-auto" data-aos="fade-up">
      <div className="advance-content-style2">
        <div className="row align-items-center">
          <div className="custom-search2 col-md-9 col-lg-12">
            <div className="advance-search-field position-relative text-start bdrrn-sm">
              <form className="form-search position-relative d-flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <div className="box-search flex-grow-1 d-flex">
                  <span className="icon flaticon-home-1" />
                  <input
                    className="custom-form form-control"
                    type="text"
                    name="search"
                    placeholder="Enter Keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="custom-search-button advance-search-icon ud-btn btn-thm ms-4"
                    type="button"
                    onClick={handleSearch}
                  >
                    <span className="flaticon-search" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* End .col-md-9 */}
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
