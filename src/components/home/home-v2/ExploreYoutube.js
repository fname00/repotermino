"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ExploreYoutube = ({ locale }) => {
  // Statyczna lista filmów YouTube
  const videos = [
    {
      id: "1",
      title: "Teneryfa - Los Abrigos - inwestycja na Teneryfie",
      youtubeId: "rkCNfpaqsK8",
      thumbnail: "https://img.youtube.com/vi/rkCNfpaqsK8/hqdefault.jpg",
    },
    {
      id: "2",
      title: "Nie przyjeżdżaj na Teneryfę. a może warto? Jak się przeprowadzić żyć tu od Pedro De Gracia vs Rybak",
      youtubeId: "QbLPhhO8RmE",
      thumbnail: "https://img.youtube.com/vi/QbLPhhO8RmE/hqdefault.jpg",
    }
    // Dodaj więcej filmów według potrzeb
  ];

  const [loading, setLoading] = useState(false); // Zmieniłem na false, ponieważ nie ma ładowania z API
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

    // Początkowe ustawienie liczby slajdów
    updateSlidesPerView();

    // Aktualizacja liczby slajdów przy zmianie rozmiaru okna
    window.addEventListener("resize", updateSlidesPerView);

    // Czyszczenie listenera przy odmontowaniu komponentu
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  // Funkcja formatowania ceny (można ją usunąć, jeśli nie jest potrzebna)
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Ponieważ nie używamy API, nie potrzebujemy useEffect do pobierania danych

  // Placeholder podczas ładowania (nie jest potrzebny, ale zostawiam jako przykład)
  /*
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
  }
  */

  return (
    <Swiper
      spaceBetween={30}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: ".yt_next__active",
        prevEl: ".yt_prev__active",
      }}
      pagination={{
        el: ".yt_pagination__active",
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
      {videos.map((video) => (
        <SwiperSlide key={video.id}>
          <div className="item">
            <Link href={`https://www.youtube.com/watch?v=${encodeURIComponent(video.youtubeId)}`}>
              <div className="feature-style2 mb30">
                <div className="feature-img">
                  {/* Użycie miniaturki z YouTube */}
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-100 custom-villa-height2 cover"
                  />
                </div>
                <div className="feature-content pt20">
                  <h6 className="title mb-1">{video.title}</h6>
                </div>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ExploreYoutube;
