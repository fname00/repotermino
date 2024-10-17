"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import FeaturedListings from "@/components/listing/list-view/list-all/FeaturedListings";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteListings, setFavoriteListings] = useState([]);
  const { t } = useTranslation('common');
  // Load favorite IDs from cookies on initial render
  useEffect(() => {
    const favoriteItems = Cookies.get("favorites");
    if (favoriteItems) {
      setFavorites(JSON.parse(favoriteItems)); // Parse the cookie to an array
    }
  }, []);

  // Fetch favorite listings based on the favorite IDs
  useEffect(() => {
    const fetchFavoriteListings = async () => {
      if (favorites.length > 0) {
        try {
          const response = await fetch(`/api/favorites?ids=${favorites.join(",")}`);
          const data = await response.json();

          // Ensure 'data' is an array
          if (Array.isArray(data)) {
            setFavoriteListings(data);
          } else {
            console.error("Unexpected data format:", data);
            setFavoriteListings([]); // Set to an empty array in case of unexpected data format
          }
        } catch (error) {
          console.error("Error fetching favorite listings:", error);
          setFavoriteListings([]); // Reset to an empty array in case of fetch error
        }
      } else {
        setFavoriteListings([]); // Clear listings if no favorites
      }
    };

    fetchFavoriteListings();
  }, [favorites]); // Re-fetch listings whenever favorites change

  // Function to toggle favorite status for a listing
  const toggleFavorite = (listingId) => {
    let updatedFavorites;
    if (favorites.includes(listingId)) {
      updatedFavorites = favorites.filter((id) => id !== listingId);
    } else {
      updatedFavorites = [...favorites, listingId];
    }

    setFavorites(updatedFavorites);
    Cookies.set("favorites", JSON.stringify(updatedFavorites)); // Update cookies whenever favorites change
  };

  if (favorites.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh', // 75% of the viewport height
        backgroundColor: '#f7f7f7', // Background color
      }}>
        <p style={{
          fontSize: '50px', // Larger font size
          fontWeight: 'bold', // Bold text
          textAlign: 'center', // Centered text
        }}>
          {t('nofavorites')}
        </p>
      </div>
    );
  }

  return (
    <section className="pt10 pb90 bgc-f7">
      <div className="container">
        <h2>{t('yourfavorites')}</h2>
        <div className="row mt15">
          <FeaturedListings colstyle={true} data={favoriteListings} />
        </div>
      </div>
    </section>
  );
};

export default FavoritesList;
