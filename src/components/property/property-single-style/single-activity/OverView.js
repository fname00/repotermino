import React from "react";

const OverView = ({ data }) => {
  const overviewData = [
    {
      icon: "flaticon-play",
      label: "Price from",
      value: data.price,
    },
    {
      icon: "flaticon-map",
      label: "",
      value: data.location,
    },
    {
      icon: "flaticon-clock",
      label: "Duration",
      value: data.duration,
    },
    {
      icon: "flaticon-like",
      label: "",
      value: data.cancellation,
    },
    {
      icon: "flaticon-user",
      label: "Guide",
      value: "Included",
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-xl-2">
          <div className="overview-element mb30 d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
