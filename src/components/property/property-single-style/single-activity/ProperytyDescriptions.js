'use client';

import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const PropertyDescriptions = ({ data }) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace
  const description = data.description || "";

  // Parse and sanitize the HTML description
  const sanitizedDescription = DOMPurify.sanitize(description);

  const isLongDescription = sanitizedDescription.length > 400;
  const shortDescription = isLongDescription ? sanitizedDescription.slice(0, 200) + "..." : sanitizedDescription;
  const remainingDescription = isLongDescription ? sanitizedDescription.slice(200) : "";

  return (
    <>
      <p className="text mb10" dangerouslySetInnerHTML={{ __html: shortDescription }} />
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
                  <p className="text" dangerouslySetInnerHTML={{ __html: remainingDescription }} />
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
                  {t('showMore')} {/* Translate 'Show more' */}
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
