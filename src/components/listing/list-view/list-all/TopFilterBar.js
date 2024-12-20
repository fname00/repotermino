import React from "react";

const TopFilterBar = ({
  setCurrentSortingOption,
  colstyle,
  setColstyle,
  pageContentTrac,
  totalListings,
}) => {
  return (
    <>
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
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentSortingOption &&
                setCurrentSortingOption(e.target.value)
              }
            >
              <option>Newest</option>
              <option>Best Seller</option>
              <option>Best Match</option>
              <option>Price Low</option>
              <option>Price High</option>
            </select>
          </div>
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
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
