"use client";
import React, { useState } from "react";

const BookingSidebar = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
    privacyPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted", formData);
  };

  return (
    <div>

      <div className="box box-shadow box-padding">
        <div>
          <form
            id="reservation-form"
            className="form"
            action=""
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="_token"
              value=""
            />
            <div>
              <h5>Price breakdown</h5>
              <ul className="breakdown-checkout p-0 pt-3">
                <span style={{ color: "#b4b4b4" }}>
                  Card is empty. Check availability.
                </span>
              </ul>
              <hr />
              <ul className="breakdown-list subtotal hide">
                <li>
                  <div>
                    <b>
                      Subtotal (<span id="view_final_count"></span> items)
                    </b>
                  </div>
                  <div>
                    <b>
                      <span id="view_final_price"></span> €{" "}
                    </b>
                    <span>All taxes and fees included</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mb-2">
              <input
                className="form-control required"
                name="name"
                type="text"
                id="name-input"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control required"
                name="email"
                type="email"
                id="email-input"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                name="phone"
                type="text"
                id="phone-input"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <textarea
                className="form-control"
                name="note"
                id="note-textarea"
                placeholder="Note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>

            <div className="checkbox-group mb-3">
              <input
                id="reservation-form-privacy-policy-checkbox"
                type="checkbox"
                name="privacyPolicy"
                className="form-control required"
                checked={formData.privacyPolicy}
                onChange={handleChange}
              />
              <label htmlFor="reservation-form-privacy-policy-checkbox">
                I agree to the{" "}
                <a href="" target="_blank">
                  processing of personal data
                </a>
              </label>
            </div>


            <input id="request-parameters" type="hidden" name="packages" value="[]" />
            <button
              id="res-submit"
              type="submit"
              className="btn"
              style={{ background: "#26272b" }}
            >
              Book and pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
