"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import {
  LocationOnOutlined,
  ArrowForward,
} from "@mui/icons-material";

import "./Banner.css";

const Banner = () => {
  const [allBanners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/banners`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }

        const data = await response.json();

        setBanners(
          Array.isArray(data?.data)
            ? data.data
            : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch banners:",
          error
        );
      }
    };

    fetchBanners();
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  if (!allBanners.length) {
    return (
      <section className="relative h-[620px] overflow-hidden bg-[#eeeae3]">
        <div className="absolute inset-0 animate-pulse bg-[#e5e0d8]" />
      </section>
    );
  }

  const activeBanner =
    allBanners[activeIndex] || allBanners[0];

  return (
    <section className="travel-banner relative h-[620px] overflow-hidden md:h-[680px] lg:h-[720px]">

      {/* =====================================================
          IMAGE SLIDER
      ====================================================== */}

      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={0}
        loop={allBanners.length > 1}
        speed={1200}
        navigation={true}
        pagination={{
          clickable: true,
          el: ".travel-banner-pagination",
        }}
        autoplay={
          allBanners.length > 1
            ? {
                delay: 5500,
                disableOnInteraction: false,
              }
            : false
        }
        modules={[
          Pagination,
          Navigation,
          Autoplay,
        ]}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {allBanners.map((banner, index) => (
          <SwiperSlide
            key={banner?._id || index}
            className="h-full"
          >
            <div className="relative h-full w-full">

              <Image
                src={banner?.image}
                alt={
                  banner?.title ||
                  "Travel destination"
                }
                fill
                priority={index === 0}
                sizes="100vw"
                className="travel-banner-image object-cover"
              />

              {/* soft cinematic overlay */}

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-20">

        <div className="custom-container flex h-full items-center">

          <div
            key={
              activeBanner?._id ||
              activeIndex
            }
            className="travel-banner-content max-w-2xl text-white"
          >

            {/* Small editorial label */}

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-9 bg-white/70" />

              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/70">
                Discover somewhere beautiful
              </span>

            </div>

            {/* Main title */}

            <h1 className="max-w-2xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[78px]">

              {activeBanner?.title}

            </h1>

            {/* Description */}

            <p className="mt-6 max-w-lg text-sm leading-6 text-white/75 md:text-[15px] md:leading-7">

              {activeBanner?.description}

            </p>

            {/* Location */}

            <div className="pointer-events-auto mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md">

              <LocationOnOutlined
                sx={{
                  fontSize: 17,
                  color: "#ffffff",
                }}
              />

              <span className="text-xs font-medium tracking-wide text-white">
                {activeBanner?.locations?.city}
              </span>

              <span className="text-white/30">
                /
              </span>

              <span className="text-xs text-white/65">
                {activeBanner?.locations?.country}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          TOP RIGHT INDEX
      ====================================================== */}

      <div className="pointer-events-none absolute right-6 top-7 z-30 md:right-10 md:top-28 lg:right-14">

        <div className="flex items-center gap-3 text-white">

          <span className="font-serif text-2xl italic">
            {String(activeIndex + 1).padStart(
              2,
              "0"
            )}
          </span>

          <span className="h-px w-8 bg-white/40" />

          <span className="text-[10px] tracking-[0.2em] text-white/60">
            {String(allBanners.length).padStart(
              2,
              "0"
            )}
          </span>

        </div>

      </div>

      {/* =====================================================
          BOTTOM AREA
      ====================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30">

        <div className="custom-container flex items-end justify-between pb-7 md:pb-9">

          {/* Decorative line */}

          <div className="hidden items-center gap-3 md:flex">

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">
              Scroll to explore
            </span>

            <span className="h-px w-12 bg-white/30" />

          </div>

          {/* Pagination */}

          <div className="travel-banner-pagination pointer-events-auto" />

          {/* Next */}

          <button
            type="button"
            onClick={() =>
              swiperRef.current?.swiper?.slideNext()
            }
            className="pointer-events-auto hidden items-center gap-3 text-white md:flex"
            aria-label="Next destination"
          >

            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
              Next
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black">

              <ArrowForward
                sx={{ fontSize: 16 }}
              />

            </span>

          </button>

        </div>

      </div>

    </section>
  );
};

export default Banner;