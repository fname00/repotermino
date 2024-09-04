"use client";
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ExploreCities = () => {
  const cities = [
    {
      id: 1,
      name: "Tenerife",
      image: "/images/listings/city_tenerife.jpg",
      number: 12,
    },
    {
      id: 2,
      name: "Gran Canaria",
      image: "/images/listings/city-grancanaria.jpg",
      number: 8,
    },
    {
      id: 3,
      name: "Lanzarote",
      image: "/images/listings/city-lanzarote.jpg",
      number: 15,
    },
    {
      id: 4,
      name: "Fuerteventura",
      image: "/images/listings/city-fuerteventura.jpg",
      number: 10,
    },
    {
      id: 5,
      name: "La Palma",
      image: "/images/listings/city-lapalma.jpg",
      number: 12,
    },
    {
      id: 6,
      name: "La Gomera",
      image: "/images/listings/city-lagomera.jpg",
      number: 8,
    },
    // Add more cities if needed
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".cities_next__active",
          prevEl: ".cities_prev__active",
        }}
        pagination={{
          el: ".cities_pagination__active",
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
        {cities.map((city) => (
          <SwiperSlide key={city.id}>
            <div className="item">
              <Link href="/all">
                <div className="feature-style2 mb30">
                  <div id="custom-main-city" className="feature-img">
                    <Image
                      width={279}
                      height={279}
                      className="w-100 custom-city-height cover"
                      src={city.image}
                      alt="city listings"
                    />
                  </div>
                  <div className="feature-content pt20">
                    <h6 className="title mb-1">{city.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ExploreCities;
