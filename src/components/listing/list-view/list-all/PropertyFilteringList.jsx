"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeaturedListings";
import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from 'next/navigation';

export default function PropertyFilteringList({ defaultStatus = "All" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filteredData, setFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [totalListings, setTotalListings] = useState(0);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [noListings, setNoListings] = useState(false);
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

  useEffect(() => {
    const urlSearchQuery = searchParams.get('searchQuery') || '';
    setSearchQuery(urlSearchQuery);
  }, [searchParams]);

  const updateURL = useCallback((newSearchQuery) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (newSearchQuery) {
      current.set('searchQuery', newSearchQuery);
    } else {
      current.delete('searchQuery');
    }
    
    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    router.push(`${window.location.pathname}${query}`);
  }, [searchParams, router]);

  const fetchListings = useCallback(
    debounce(async (pageNumber, searchQuery) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/listings?pageNumber=${pageNumber}&searchQuery=${searchQuery}&listingStatus=${listingStatus}&propertyTypes=${propertyTypes}&priceRange=${priceRange}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&location=${location}&squareFeet=${squareFeet}&yearBuild=${yearBuild}&categories=${categories}&currentSortingOption=${currentSortingOption}`
        );
        const data = await response.json();

        if (data.data.length === 0) {
          setHasMore(false);
          if (pageNumber === 1) {
            setNoListings(true);
          }
        } else {
          setNoListings(false);
          setFilteredData((prevData) => [...prevData, ...data.data]);
        }
        setTotalListings(data.total);
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
      setFilteredData([]);
    }
    fetchListings(pageNumber, searchQuery);
  }, [pageNumber, searchQuery, fetchListings]);

  useEffect(() => {
    setFilteredData([]);
    setPageNumber(1);
    setHasMore(true);
    setNoListings(false);
    updateURL(searchQuery);
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
    updateURL,
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
                    updateURL("");
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
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
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
                    filteredData.length,
                  ]}
                  colstyle={colstyle}
                  setColstyle={setColstyle}
                  setCurrentSortingOption={setCurrentSortingOption}
                  totalListings={totalListings}
                />
              </div>

              {noListings ? (
                <div className="row mt15">
                  <div className="col-12">
                    <p className="text-center">No listings for this search, try other search</p>
                  </div>
                </div>
              ) : (
                <div className="row mt15">
                  <FeaturedListings colstyle={colstyle} data={filteredData} />
                </div>
              )}

              <div ref={observerRef} className="row">
                {isLoading && <p>Loading...</p>}
                {!hasMore && !noListings && <p>No more listings to load.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}