"use client";
import { useState } from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    title: "",             // Title
    city: "",              // City
    location: "",          // Location
    duration: "",          // Duration
    price: 0,              // Price
    discount: 0,           // Discount (optional)
    maxPersons: 0,         // Maximum number of persons
    minAdults: 0,          // Minimum adults
    maxAdults: 100,          // Maximum adults
    minKids: 0,            // Minimum kids
    maxKids: 100,            // Maximum kids
    minYouth: 0,           // Minimum youth
    maxYouth: 100,           // Maximum youth
    discountAdults: 0,     // Discount for adults
    discountKids: 0,       // Discount for kids
    discountYouth: 0,      // Discount for youth
    forRent: false,        // For rent
    tags: [],              // Tags
    cancellation: "",      // Cancellation policy
    featured: true,       // Featured
    availability: "Limited Offer",      // Availability
    description: "",       // Description
    images: [],            // Images
    image: "",             // Main image
  });

  const [tagInput, setTagInput] = useState("");
  const [tagsList, setTagsList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleImagesChange = (images) => {
    const mainImage = images.length > 0 ? images[0] : "/images/listings/default.jpg";
    setFormData({ ...formData, images, image: mainImage });
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTagsList((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTagsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataWithTags = {
      ...formData,
      tags: tagsList,
    };

    try {
      const res = await fetch("/api/create_activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithTags),
      });

      const result = await res.json();
      if (result.success) {
        alert("Activity created successfully!");
      } else {
        alert("Failed to create activity.");
      }
    } catch (error) {
      console.error("Error creating activity:", error);
      alert("An error occurred while creating the activity.");
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      {/* UploadPhotoGallery Component */}
      <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery onImagesChange={handleImagesChange} />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Activity title"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Description</label>
            <textarea
              name="description"
              cols={30}
              rows={5}
              placeholder="Description"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* City */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="City"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Location */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Full address</label>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Location"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Duration */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Duration in hours</label>
            <input
              type="number"
              name="duration"
              className="form-control"
              placeholder="E.g. 2"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Price */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Base price in euro / person</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price input"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Discount */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Discount</label>
            <input
              type="number"
              name="discount"
              className="form-control"
              placeholder="Discount in euros"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Max Persons */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Max Persons</label>
            <input
              type="number"
              name="maxPersons"
              className="form-control"
              placeholder="Maximum persons"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Min/Max Adults */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Min Adults</label>
            <input
              type="number"
              name="minAdults"
              className="form-control"
              placeholder="Minimum adults"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Max Adults</label>
            <input
              type="number"
              name="maxAdults"
              className="form-control"
              placeholder="Maximum adults"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Min/Max Kids */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Min Kids</label>
            <input
              type="number"
              name="minKids"
              className="form-control"
              placeholder="Minimum kids"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Max Kids</label>
            <input
              type="number"
              name="maxKids"
              className="form-control"
              placeholder="Maximum kids"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Min/Max Youth */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Min Youth</label>
            <input
              type="number"
              name="minYouth"
              className="form-control"
              placeholder="Minimum youth"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Max Youth</label>
            <input
              type="number"
              name="maxYouth"
              className="form-control"
              placeholder="Maximum youth"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Discount for adults %</label>
            <input
              type="number"
              name="discountAdult"
              className="form-control"
              placeholder="Maximum youth"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Discount for youth %</label>
            <input
              type="number"
              name="discountYouth"
              className="form-control"
              placeholder="Discount for youth"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">Discount for kids %</label>
            <input
              type="number"
              name="discountKids"
              className="form-control"
              placeholder="Discount for kids"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <button className="ud-btn btn-white" type="submit">Submit Activity</button>
    </form>
  );
};

export default ActivityForm;
