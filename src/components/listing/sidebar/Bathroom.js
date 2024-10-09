'use client'

import React from "react";

const Bathroom = ({filterFunctions}) => {
  const options = [
    { id: "bathany", label: "0+", defaultChecked: true ,value:0},
    { id: "bathoneplus", label: "1+",value:1 },
    { id: "bathtwoplus", label: "2+" ,value:2},
    { id: "baththreeplus", label: "3+",value:3 },
  ];

  return (
    <>
      {options.map((option) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
        
            type="radio"
            checked={filterFunctions?.bathroms == option.value}
            
            onChange={()=>filterFunctions?.handlebathroms(option.value)}
            
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom;
