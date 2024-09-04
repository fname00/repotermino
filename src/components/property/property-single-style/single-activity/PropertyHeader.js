import listings from "@/data/activity";
import React from "react";

// Funkcja obliczająca ile czasu temu dodano post
const getTimeAgo = (dateAdd) => {
  const currentDate = new Date();
  const postDate = new Date(dateAdd);

  const diffInMs = currentDate - postDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} months ago`;
  } else {
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} years ago`;
  }
};

const PropertyHeader = ({ id }) => {
  // Pobieranie danych na podstawie id
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  
  // Obliczanie, ile czasu temu został dodany post
  const timeAgo = getTimeAgo(data.dateAdd);

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
