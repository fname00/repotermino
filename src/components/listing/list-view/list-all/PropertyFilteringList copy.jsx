
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeaturedListings";
import debounce from "lodash/debounce";

export default function PropertyFilteringList({ defaultStatus = "All" }) {
  const [filteredData, setFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [totalListings, setTotalListings] = useState(0);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more items are available
  const observerRef = useRef(null);

  const [listingStatus, setListingStatus] = useState(defaultStatus);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squareFeet, setSquareFeet] = useState([]);
  const [yearBuild, setYearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchListings = useCallback(
    debounce(async (pageNumber, searchQuery) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/listings?pageNumber=${pageNumber}&searchQuery=${searchQuery}&listingStatus=${listingStatus}&propertyTypes=${propertyTypes}&priceRange=${priceRange}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&location=${location}&squareFeet=${squareFeet}&yearBuild=${yearBuild}&categories=${categories}&currentSortingOption=${currentSortingOption}`
        );
        const data = await response.json();

        if (data.data.length === 0) {
          setHasMore(false); // No more items to load
        }
        setTotalListings(data.total); // Set total listings from API response
        console.log("Total listings:", data.total);
        setFilteredData((prevData) => [...prevData, ...data.data]);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [
      listingStatus,
      propertyTypes,
      priceRange,
      bedrooms,
      bathrooms,
      location,
      squareFeet,
      yearBuild,
      categories,
      currentSortingOption,
    ]
  );

  useEffect(() => {
    if (pageNumber === 1) {
      setFilteredData([]); // Reset data when filters change
    }
    fetchListings(pageNumber, searchQuery);
  }, [pageNumber, searchQuery, fetchListings]);

  useEffect(() => {
    setFilteredData([]); // Reset data when filters change
    setPageNumber(1); // Reset to first page
    setHasMore(true); // Reset the hasMore state
  }, [
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathrooms,
    location,
    squareFeet,
    yearBuild,
    categories,
    currentSortingOption,
    searchQuery,
    fetchListings,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <>
      <section className="pt10 pb90 bgc-f7">
        <div className="container">
          <div className="row gx-xl-5">
            <div className="col-lg-2 d-none d-lg-block">
              <ListingSidebar
                filterFunctions={{
                  handlelistingStatus: (elm) =>
                    setListingStatus((pre) => (pre === elm ? "All" : elm)),
                  handlepropertyTypes: (elm) =>
                    setPropertyTypes((pre) =>
                      elm === "All"
                        ? []
                        : pre.includes(elm)
                        ? pre.filter((el) => el !== elm)
                        : [...pre, elm]
                    ),
                  handlepriceRange: setPriceRange,
                  handlebedrooms: setBedrooms,
                  handlebathrooms: setBathrooms,
                  handlelocation: setLocation,
                  handlesquareFeet: setSquareFeet,
                  handleyearBuild: setYearBuild,
                  handlecategories: (elm) =>
                    setCategories((pre) =>
                      elm === "All"
                        ? []
                        : pre.includes(elm)
                        ? pre.filter((el) => el !== elm)
                        : [...pre, elm]
                    ),
                  resetFilter: () => {
                    setListingStatus("All");
                    setPropertyTypes([]);
                    setPriceRange([0, 10000000]);
                    setBedrooms(0);
                    setBathrooms(0);
                    setLocation("All Cities");
                    setSquareFeet([]);
                    setYearBuild([0, 2050]);
                    setCategories([]);
                    setCurrentSortingOption("Newest");
                    setSearchQuery("");
                  },
                  priceRange,
                  listingStatus,
                  propertyTypes,
                  bedrooms,
                  bathrooms,
                  location,
                  squareFeet,
                  yearBuild,
                  categories,
                  setPropertyTypes,
                  setSearchQuery,
                }}
              />
            </div>
            {/* End .col-lg-4 */}

            {/* start mobile filter sidebar */}
            <div className="col-12 d-lg-none mb-3">
              <button
                className="btn btn-primary custom-filters-button"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebarFilter"
                aria-controls="listingSidebarFilter"
              >
                <i className="flaticon-filter"></i> Filters
              </button>
            </div>
            <div
              className="offcanvas offcanvas-start p-0"
              tabIndex="-1"
              id="listingSidebarFilter"
              aria-labelledby="listingSidebarFilterLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
                  Listing Filter
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body p-0">
                <ListingSidebar
                  filterFunctions={{
                    handlelistingStatus: (elm) =>
                      setListingStatus((pre) => (pre === elm ? "All" : elm)),
                    handlepropertyTypes: (elm) =>
                      setPropertyTypes((pre) =>
                        elm === "All"
                          ? []
                          : pre.includes(elm)
                          ? pre.filter((el) => el !== elm)
                          : [...pre, elm]
                      ),
                    handlepriceRange: setPriceRange,
                    handlebedrooms: setBedrooms,
                    handlebathrooms: setBathrooms,
                    handlelocation: setLocation,
                    handlesquareFeet: setSquareFeet,
                    handleyearBuild: setYearBuild,
                    handlecategories: (elm) =>
                      setCategories((pre) =>
                        elm === "All"
                          ? []
                          : pre.includes(elm)
                          ? pre.filter((el) => el !== elm)
                          : [...pre, elm]
                      ),
                    resetFilter: () => {
                      setListingStatus("All");
                      setPropertyTypes([]);
                      setPriceRange([0, 10000000]);
                      setBedrooms(0);
                      setBathrooms(0);
                      setLocation("All Cities");
                      setSquareFeet([]);
                      setYearBuild([0, 2050]);
                      setCategories([]);
                      setCurrentSortingOption("Newest");
                      setSearchQuery("");
                    },
                    priceRange,
                    listingStatus,
                    propertyTypes,
                    bedrooms,
                    bathrooms,
                    location,
                    squareFeet,
                    yearBuild,
                    categories,
                    setPropertyTypes,
                    setSearchQuery,
                  }}
                />
              </div>
            </div>
            {/* End mobile filter sidebar */}
            <div className="col-lg-10">
              <div className="row align-items-center mb20">
                <TopFilterBar
                  pageContentTrac={[
                    (pageNumber - 1) * 12 + 1,
                    pageNumber * 12,
                    filteredData.length, // Pass the length of currently filtered data
                  ]}
                  colstyle={colstyle}
                  setColstyle={setColstyle}
                  setCurrentSortingOption={setCurrentSortingOption}
                  totalListings={totalListings} // Pass totalListings as a prop
                />
              </div>

              {/* End TopFilterBar */}

              <div className="row mt15">
                <FeaturedListings colstyle={colstyle} data={filteredData} />
              </div>
              {/* End .row */}

              <div ref={observerRef} className="row">
                {isLoading && <p></p>}
                {!hasMore && <p></p>}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container*/}

      </section>
    </>
  );
}
