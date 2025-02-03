import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const TopFilterBar = ({
  setCurrentSortingOption,
  colstyle,
  setColstyle,
  pageContentTrac,
  totalListings,
}) => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  return (
    <>{/*
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            {totalListings < 11
              ? `Showing ${
                  pageContentTrac[1] < totalListings
                    ? pageContentTrac[1]
                    : totalListings
                }`
              : `Showing ${
                  pageContentTrac[1] < totalListings
                    ? pageContentTrac[1]
                    : totalListings
                } of ${totalListings} results`}
          </p>
        </div>
      </div>
       End .col-sm-6 */}

      <div className="">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "120px", textAlign:"end", paddingRight: "10px" }}>{t('sortBy')}</span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentSortingOption &&
                setCurrentSortingOption(e.target.value)
              }
            >
              <option value="Price High">{t('priceHigh')}</option>
              <option value="Price Low">{t('priceLow')}</option>
              <option value="Newest">{t('newest')}</option>
              
              
            </select>
          </div>
 

          {/* 
          <div
            className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor  ${
              colstyle ? "menuActive" : "#"
            } `}
            onClick={() => setColstyle(true)}
          >
            Grid
          </div>
          <div
            className={`pl15 d-none d-md-block  cursor ${
              !colstyle ? "menuActive" : "#"
            }`}
            onClick={() => setColstyle(false)}
          >
            List
          </div>
          */}
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
