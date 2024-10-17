"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

const UploadPhotoGallery = ({ onImagesChange }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  const bunnyApiKey = process.env.NEXT_PUBLIC_BUNNY;
  const handleUpload = async (files) => {
    const newImages = [...uploadedImages];
    console.log("Uploading files:", files); // Sprawdzenie, czy pliki są prawidłowo odbierane

    for (const file of files) {
      try {
        const randomFileName = `${Date.now()}-${file.name}`;
        const bunnyUrl = `https://storage.bunnycdn.com/tenerife/${randomFileName}`;
        console.log("Sending to Bunny.net:", bunnyUrl); // Logowanie URL przesyłania

        // Pobranie pliku jako ArrayBuffer (surowy strumień bajtów)
        const fileBuffer = await file.arrayBuffer();

        // Wysyłanie pliku jako strumień bajtów do Bunny.net
        const response = await axios.put(bunnyUrl, fileBuffer, {
          headers: {
            AccessKey: bunnyApiKey,
            'Content-Type': 'application/octet-stream',
          },
        });

        console.log("Response from Bunny.net:", response); // Logowanie odpowiedzi z Bunny.net

        if (response.status === 201) {
          const imageUrl = `https://teneryfa.b-cdn.net/${randomFileName}`;
          newImages.push(imageUrl);
          setUploadedImages(newImages);
          onImagesChange(newImages); // Przekazanie nowych zdjęć do komponentu nadrzędnego
        }
      } catch (error) {
        console.error("Error uploading image to Bunny.net:", error.response || error.message); // Logowanie błędów
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    onImagesChange(newImages); // Aktualizacja po usunięciu zdjęcia
  };

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Upload/Drag photos of your property</h4>
        <p className="text mb25">
          Photos must be JPEG or PNG format.
          First photo will be used as main photo.
        </p>
        <label className="ud-btn btn-white">
          Browse Files
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            multiple
            className="ud-btn btn-white"
            onChange={(e) => handleUpload(e.target.files)} // Logowanie i obsługa dodania zdjęć
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Display uploaded images */}
      <div className="row profile-box position-relative d-md-flex align-items-end mb50">
        {uploadedImages.map((imageData, index) => (
          <div className="col-2" key={index}>
            <div className="profile-img mb20 position-relative">
              <img
                width={212}
                height={194}
                className="w-100 bdrs12 cover"
                src={imageData}
                alt={`Uploaded Image ${index + 1}`}
              />
              <button
                style={{ border: "none" }}
                className="tag-del"
                title="Delete Image"
                onClick={() => handleDelete(index)}
                type="button"
              >
                <span className="fas fa-trash-can" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadPhotoGallery;
