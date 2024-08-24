"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "./Banner.css"

import { IconButton } from "@mui/material";
import {LocationOn } from "@mui/icons-material";

const Banner = () => {
  const [allBanners, setBanners] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch("https://go-venture-server.vercel.app/api/v1/banners")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBanners(data.data);
      })
      .catch((error) => console.error("Failed to fetch allBanners:", error));
  }, []);

  //------ Update active index on slide change--------
  const updateActiveIndex = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const newIndex = swiperRef.current.swiper.realIndex;
      if (newIndex < allBanners.length) {
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
        pagination={{ clickable: true , style: { bottom: '50px' }}}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
        ref={swiperRef}
      >
        {allBanners.map((banner) => (
          <SwiperSlide key={allBanners._d} className="h-full">
            <div className="w-full h-full">
              <Image
                src={banner.image}
                alt={banner.title}
                layout="fill"
                objectFit="cover"
                className="select-none pointer-events-none "
              />
            </div>
          </SwiperSlide>
          
        ))}
      </Swiper>
      <div
        className="absolute top-0 left-0 w-full h-full z-10 "
        style={{ pointerEvents: "none" }}
      >
        <div className="w-full h-full text-white bg-gradient-custom bg-opacity-70 px-4 md:px-8 lg:px-20 flex items-center justify-start">
          {allBanners.length > 0 && allBanners[activeIndex] && (
            <div className="text-[#D2ECF2z] md:w-1/3 w-full">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  {allBanners[activeIndex].title}
                </h2>
                <p className="text-sm ">{allBanners[activeIndex].description}</p>
              </div>
              <div className="mt-10 flex items-center">
                <p className="text-[#dc834e]">
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="facebook"
                  >
                    <LocationOn />
                  </IconButton>
                </p>
                <p className="text-xs">
                  
                  {allBanners[activeIndex].locations.city}
                  <span className="mx-2 text-xs">|</span>
                  <span className="font-semibold">
                    {allBanners[activeIndex].locations.country}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
