import React from "react";

// Funkcja obliczająca, ile czasu temu dodano post
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

const PropertyHeader = ({ data }) => {
  if (!data) {
    return <p>Loading...</p>;
  }

  // Obliczanie, ile czasu temu został dodany post
  const timeAgo = getTimeAgo(data.dateAdd);

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.title}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {data.location}
            </p>
            <a
              className="ff-heading bdrr1  text-thm fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              For {data.forRent ? "rent" : "sale"}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="far fa-clock pe-2" />
              {timeAgo}
            </a>
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              {data.id}
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
            </div>
            <h3 className="price mb-0">{data.price}</h3>
            <p className="text space fz15">
              ${data.price && data.sqft ? (Number(data.price.split('$')[1].split(',').join('')) / data.sqft).toFixed(2) : 'N/A'}/sq ft
            </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
