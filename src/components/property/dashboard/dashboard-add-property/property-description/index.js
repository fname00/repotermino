"use client";
import { useState } from "react";
import Select from "react-select";
import UploadPhotoGallery from "./UploadPhotoGallery";

const PropertyDescription = () => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    location: "",
    country: "",
    bed: 0,
    bath: 0,
    garage: 0,
    storage: 0,
    sqft: 0,
    propertyType: "",
    price: 0,
    forRent: false, // Track if it's for rent
    description: "",
    features: "",
    images: [],
    published: false,
  });
  const [featureInput, setFeatureInput] = useState("");
  const [featuresList, setFeaturesList] = useState([]);

  const categoryOptions = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Loft", label: "Loft" },
    { value: "Office", label: "Office" },
    { value: "Townhome", label: "Townhome" },
    { value: "Villa", label: "Villa" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, forRent: e.target.checked });
  };

  const handleImagesChange = (images) => {
    setFormData({ ...formData, images });
  };
    // Function to add a feature to the list
    const addFeature = () => {
      if (featureInput.trim() !== "") {
        setFeaturesList((prev) => [...prev, featureInput.trim()]);
        setFeatureInput(""); // Clear input field after adding
      }
    };
  
    // Function to remove a feature from the list
    const removeFeature = (index) => {
      setFeaturesList((prev) => prev.filter((_, i) => i !== index));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Convert features list to a string in the format "1. feature, 2. feature, etc."
      const formattedFeatures = featuresList
        .map((feature, index) => `${index + 1}. ${feature}`)
        .join(", ");
  
      const formDataWithFeatures = {
        ...formData,
        features: formattedFeatures, // Attach formatted features to form data
      };
    try {
      const res = await fetch("/api/create_listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Listing created successfully!");
      } else {
        alert("Failed to create listing.");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("An error occurred while creating the listing.");
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
        <div className="row">
          <div className="col-lg-12">
            {/* UploadPhotoGallery Component */}
            <UploadPhotoGallery onImagesChange={handleImagesChange} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Villa in..."
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Description</label>
            <textarea
              cols={30}
              rows={5}
              placeholder="This place is..."
              name="description"
              defaultValue={""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Property Type</label>
            <div className="location-area">
              <Select
                defaultValue={[categoryOptions[1]]}
                name="propertyType"
                options={categoryOptions}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                onChange={(selectedOptions) => {
                  const propertyTypes = selectedOptions.map((option) => option.value);
                  setFormData((prevData) => ({
                    ...prevData,
                    propertyType: propertyTypes,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Price in euro</label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price input"
                onChange={handleInputChange}
              />
              <label className="ms-3">
                <input
                  type="checkbox"
                  name="forRent"
                  onChange={handleCheckboxChange}
                />{" "}
                Monthly
              </label>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Size of area (m²)</label>
            <input
              name="sqft"
              type="number"
              className="form-control"
              placeholder="E.g 200"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Bedrooms</label>
            <input
              name="bed"
              type="number"
              className="form-control"
              placeholder="E.g 2"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Bathrooms</label>
            <input
              name="bath"
              type="number"
              className="form-control"
              placeholder="E.g 2"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Garage</label>
            <input
              name="garage"
              type="number"
              className="form-control"
              placeholder="E.g 2"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">City</label>
            <input
              name="city"
              type="text"
              className="form-control"
              placeholder="City by name"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Street</label>
            <input
              name="location"
              type="text"
              className="form-control"
              placeholder="Street name"
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        {/* Features Input Section */}
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Features</label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                value={featureInput}
                className="form-control"
                placeholder="Add a feature"
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary ms-3"
                onClick={addFeature}
              >
                +
              </button>
            </div>
            {/* Display added features */}
            <ul className="mt-2">
              {featuresList.map((feature, index) => (
                <li class="ju12" key={index}>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => removeFeature(index)}
                  >
                    x
                  </button>
                  {" "}{feature}

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <button className="ud-btn btn-white" type="submit">Submit Listing</button>
    </form>
  );
};

export default PropertyDescription;
