"use client";

const SquareFeet = ({ filterFunctions }) => {
  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) => {
              const minFeet = e.target.value || 0; // Get min value or default to 0
              const maxFeet = document.getElementById("maxFeet").value || 0; // Get max value or default to 0
              filterFunctions?.handlesquirefeet([minFeet, maxFeet]);
            }}
            className="form-control filterInput"
            placeholder="Min."
            id="minFeet"
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            id="maxFeet"
            onChange={(e) => {
              const minFeet = document.getElementById("minFeet").value || 0; // Get min value or default to 0
              const maxFeet = e.target.value || 0; // Get max value or default to 0
              filterFunctions?.handlesquirefeet([minFeet, maxFeet]);
            }}
            className="form-control filterInput"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default SquareFeet;
