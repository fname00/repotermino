'use client'

import React from "react";

const Bedroom = ({filterFunctions}) => {
  const options = [
    { id: "any", label: "0+",value:0, defaultChecked: true },
    { id: "oneplus", label: "1+",value:1, },
    { id: "twoplus", label: "2+" ,value:2,},
    { id: "threeplus", label: "3+",value:3, },
  ];

  return (
    <>
      {options.map((option) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
           
            type="radio"
            onChange={(e)=>filterFunctions?.handlebedrooms(option.value)}
            checked={filterFunctions?.bedrooms == option.value}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bedroom;
