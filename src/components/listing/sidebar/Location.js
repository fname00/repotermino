"use client";
import Select from "react-select";
import { useEffect, useState } from "react";

const Location = ({ filterFunctions }) => {
  const [locationOptions, setLocationOptions] = useState([]);

  // Fetch locations from the database
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations'); // Update this to your API endpoint
        const data = await response.json();
        
        // Map the data to the format required by react-select, including count in the label
        const options = data.map(location => ({
          value: location.value, // City name as the value
          label: `${location.label} (${location.count})`, // City name with count in parentheses
        }));
        
        setLocationOptions(options);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

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
