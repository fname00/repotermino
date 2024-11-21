"use client";
import Select from "react-select";
import { useEffect, useState } from "react";

const Location = ({ filterFunctions }) => {
  const [locationOptions, setLocationOptions] = useState([]);

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered
        ? "#eb675312"
        : isFocused
        ? "#eb675312"
        : undefined,
    }),
  };

  return (
    <Select
      defaultValue={[locationOptions[0]]}
      name="locations" // Changed to 'locations' for clarity
      styles={customStyles}
      options={locationOptions}
      value={locationOptions.find(option => option.value === filterFunctions.location)} // Update to match the selected value
      className="select-custom filterSelect"
      classNamePrefix="select"
      onChange={(e) => filterFunctions?.handlelocation(e.value)}
      required
    />
  );
};

export default Location;
