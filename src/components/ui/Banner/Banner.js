"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => {
        setBanners(data);
      })
      .catch((error) => console.error("Failed to fetch banners:", error));
  }, []);
  console.log("Current state of banners:", banners);

  // Update active index on slide change
  const updateActiveIndex = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const newIndex = swiperRef.current.swiper.realIndex;
      if (newIndex < banners.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="relative max-w-full" style={{ height: "600px" }}>
      <Swiper
        onSlideChange={updateActiveIndex}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full h-full"
        ref={swiperRef}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="w-full h-full">
              <Image
                src={banner.image}
                alt={banner.title}
                layout="fill"
                objectFit="cover"
                className="select-none pointer-events-none"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="absolute top-0 left-0 w-full h-full z-10 "
        style={{ pointerEvents: "none" }}
      >

       <div className="w-full h-full text-white bg-gradient-custom bg-opacity-50 px-20 flex items-center justify-start">
          {banners.length > 0 && banners[activeIndex] && (
            <div>
              <h2 className="text-4xl font-bold">
                {banners[activeIndex].title}
              </h2>
              <p className="text-xl">{banners[activeIndex].description}</p>
              <p className="text-xl">{banners[activeIndex].locations}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
