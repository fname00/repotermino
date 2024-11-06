"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ExploreNewDev = () => {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
    const [slidesPerView, setSlidesPerView] = useState(1);
  
    useEffect(() => {
      const updateSlidesPerView = () => {
        const width = window.innerWidth;
  
        if (width >= 1200) {
          setSlidesPerView(4);
        } else if (width >= 1024) {
          setSlidesPerView(3);
        } else if (width >= 768) {
          setSlidesPerView(2);
        } else {
          setSlidesPerView(1);
        }
      };
  
      // Initial call to set the correct slidesPerView
      updateSlidesPerView();
  
      // Update on resize
      window.addEventListener('resize', updateSlidesPerView);
  
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', updateSlidesPerView);
      };
    }, []);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await fetch('/api/listings?locale=pl&pageNumber=1&searchQuery=&listingStatus=Buy&propertyTypes=land&priceRange=0,10000000&bedrooms=0&bathrooms=0&location=All%20Cities&squareFeet=&yearBuild=&categories=&currentSortingOption=Price%20High'); // Adjust the query params as needed
        const data = await response.json();

        // Sort villas by price in descending order
        const sortedVillas = data.data.sort((a, b) => b.price - a.price);
        setVillas(sortedVillas);
      } catch (error) {
        console.error("Error fetching villas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVillas();
  }, []);

  if (loading) {
    return (
      <div className="skeleton-container-001">
        {[...Array(slidesPerView)].map((_, index) => (
          <div key={index} className="skeleton-item-001 skeleton-pulse">
            <div className="skeleton-image-001"></div>
            <div className="skeleton-title-001"></div>
            <div className="skeleton-price-001"></div>
          </div>
        ))}
      </div>
    );
  };
  
  
  return (
    <Swiper
      spaceBetween={30}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: ".newdev_next__active",
        prevEl: ".newdev_prev__active",
      }}
      pagination={{
        el: ".newdev_pagination__active",
        clickable: true,
      }}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      }}
    >
      {villas.map((villa) => (
        <SwiperSlide key={villa.id}>
          <div className="item">
            <Link href={`/property/${encodeURIComponent(villa.id)}`}>
              <div className="feature-style2 mb30">
                <div id="custom-main-villa" className="feature-img">
                  <Image
                    width={279}
                    height={279}
                    className="w-100 custom-villa-height cover"
                    src={villa.image} // Assuming villa has an 'image' field
                    alt="villa listings"
                  />
                </div>
                <div className="feature-content pt20">
                  <h6 className="title mb-1">{villa.title}</h6> {/* Displaying villa title */}
                  <p className="price">{formatPrice(villa.price)} €</p> {/* Displaying formatted villa price */}
                </div>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ExploreNewDev;
