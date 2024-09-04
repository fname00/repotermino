import React from "react";
import listings from "@/data/listings";

const PropertyDescriptions = ({ id }) => {
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  const description = data.description || "";

  const isLongDescription = description.length > 400;
  const shortDescription = isLongDescription ? description.slice(0, 200) + "..." : description;
  const remainingDescription = isLongDescription ? description.slice(200) : "";

  return (
    <>
      <p className="text mb10">
        {shortDescription}
      </p>
      {isLongDescription && (
        <div className="agent-single-accordion">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body p-0">
                  <p className="text">
                    {remainingDescription}
                  </p>
                </div>
              </div>
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button p-0 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Show more
                </button>
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDescriptions;
