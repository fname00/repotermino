const Bathroom = () => {
  const bathOptions = [
    { id: "yany", label: "any" },
    { id: "yoneplus", label: "1+" },
    { id: "ytwoplus", label: "2+" },
    { id: "ythreeplus", label: "3+" },
  ];

  return (
    <>
      {bathOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            name="ybath"
            type="radio"
            defaultChecked // Set the first option as defaultChecked
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom;
