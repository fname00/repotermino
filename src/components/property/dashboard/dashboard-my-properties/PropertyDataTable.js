"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import debounce from "lodash/debounce";

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "pending-style style1";
    case "Published":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    default:
      return "";
  }
};

const PropertyDataTable = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [noListings, setNoListings] = useState(false);
  const [totalListings, setTotalListings] = useState(0);

  // Fetch listings from the API
  const fetchListings = useCallback(
    debounce(async (pageNumber, searchQuery) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/listings?pageNumber=${pageNumber}&searchQuery=${searchQuery}`
        );
        const data = await response.json();

        if (data.data.length === 0) {
          setHasMore(false);
          if (pageNumber === 1) {
            setNoListings(true);
          }
        } else {
          setNoListings(false);
          setPropertyData((prevData) => [...prevData, ...data.data]);
        }
        setTotalListings(data.total);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchListings(pageNumber, searchQuery);
  }, [pageNumber, searchQuery, fetchListings]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPageNumber(1); // Reset to the first page when searching
    setPropertyData([]); // Reset the data when a new search starts
    setHasMore(true); // Reset pagination state
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search properties"
        value={searchQuery}
        onChange={handleSearch}
      />

      <table className="table-style3 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Listing title</th>
            <th scope="col">Date Published</th>
            <th scope="col">Status</th>
            <th scope="col">View</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="t-body">
          {propertyData.map((property) => (
            <tr key={property.id}>
              <th scope="row">
                <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                  <div className="list-thumb">
                    <Image
                      width={110}
                      height={94}
                      className="w-100"
                      src={property.imageSrc || "/images/default.jpg"}
                      alt="property"
                    />
                  </div>
                  <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                    <div className="h6 list-title">
                      <Link href={`/single-v1/${property.id}`}>
                        {property.title}
                      </Link>
                    </div>
                    <p className="list-text mb-0">{property.location}</p>
                    <div className="list-price">
                      <a href="#">{property.price}</a>
                    </div>
                  </div>
                </div>
              </th>
              <td className="vam">{property.datePublished}</td>
              <td className="vam">
                <span className={getStatusStyle(property.status)}>
                  {property.status}
                </span>
              </td>
              <td className="vam">{property.datePublished}</td>
              <td className="vam">
                <div className="d-flex">
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`edit-${property.id}`}
                  >
                    <span className="fas fa-pen fa" />
                  </button>
                  <button
                    className="icon"
                    style={{ border: "none" }}
                    data-tooltip-id={`delete-${property.id}`}
                  >
                    <span className="flaticon-bin" />
                  </button>

                  <ReactTooltip
                    id={`edit-${property.id}`}
                    place="top"
                    content="Edit"
                  />
                  <ReactTooltip
                    id={`delete-${property.id}`}
                    place="top"
                    content="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading && <p>Loading properties...</p>}
      {noListings && <p>No listings found</p>}
      {!hasMore && <p>No more listings available</p>}
    </>
  );
};

export default PropertyDataTable;
