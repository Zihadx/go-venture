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
  ArrowForwardRounded,
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

        setBanners(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  if (!allBanners.length) {
    return (
      <section className="relative h-[620px] overflow-hidden bg-[#e9e7e1] md:h-[680px] lg:h-[720px]">
        <div className="absolute inset-0 animate-pulse bg-[#e1ded7]" />

        <div className="absolute inset-0 flex items-end">
          <div className="custom-container pb-20 md:pb-24">
            <div className="h-5 w-40 rounded-full bg-white/30" />
            <div className="mt-5 h-16 w-[min(650px,80vw)] rounded-xl bg-white/30" />
            <div className="mt-5 h-4 w-[min(420px,65vw)] rounded-full bg-white/20" />
          </div>
        </div>
      </section>
    );
  }

  const activeBanner = allBanners[activeIndex] || allBanners[0];

  return (
    <section className="travel-banner group relative h-[620px] overflow-hidden bg-[#071525] md:h-[680px] lg:h-[720px]">
      {/* =====================================================
          IMAGE SLIDER
      ====================================================== */}

      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={0}
        loop={allBanners.length > 1}
        speed={1200}
        navigation={false}
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
        modules={[Pagination, Navigation, Autoplay]}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {allBanners.map((banner, index) => (
          <SwiperSlide
            key={banner?._id || index}
            className="h-full"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={banner?.image}
                alt={banner?.title || "Travel destination"}
                fill
                priority={index === 0}
                sizes="100vw"
                className="travel-banner-image object-cover"
              />

              {/* Cinematic image treatment */}
              <div className="absolute inset-0 bg-black/15" />

              <div className="absolute inset-0 bg-gradient-to-r from-[#020b13]/80 via-[#020b13]/35 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020b13]/75 via-transparent to-transparent" />

              {/* Subtle teal atmosphere */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(32,149,174,0.10),transparent_35%)]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="custom-container flex h-full items-end pb-20 md:pb-24 lg:pb-28">
          <div
            key={activeBanner?._id || activeIndex}
            className="travel-banner-content max-w-3xl text-white"
          >
            {/* Location */}
            <div className="pointer-events-auto mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-xl">
              <LocationOnOutlined
                sx={{
                  fontSize: 16,
                  color: "#2095ae",
                }}
              />

              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                {activeBanner?.locations?.city}
              </span>

              <span className="text-white/30">•</span>

              <span className="text-[11px] uppercase tracking-[0.12em] text-white/60">
                {activeBanner?.locations?.country}
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[84px]">
              {activeBanner?.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-[15px] md:leading-7">
              {activeBanner?.description}
            </p>

            {/* CTA */}
            <div className="pointer-events-auto mt-8">
              <button
                type="button"
                onClick={() =>
                  swiperRef.current?.swiper?.slideNext()
                }
                className="group inline-flex items-center gap-4 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#10213a] transition-all duration-500 hover:bg-[#2095ae] hover:text-white"
              >
                <span>Explore destination</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10213a] text-white transition-all duration-500 group-hover:bg-white group-hover:text-[#2095ae]">
                  <ArrowForwardRounded
                    sx={{
                      fontSize: 17,
                    }}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CONTROLS
      ====================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30">
        <div className="custom-container flex items-center justify-between pb-7 md:pb-9">
          {/* Pagination */}
          <div className="travel-banner-pagination pointer-events-auto" />

          {/* Next control */}
          {allBanners.length > 1 && (
            <button
              type="button"
              onClick={() =>
                swiperRef.current?.swiper?.slideNext()
              }
              aria-label="Next destination"
              className="pointer-events-auto flex items-center gap-3 text-white"
            >
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 sm:block">
                Next destination
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:border-[#2095ae] hover:bg-[#2095ae]">
                <ArrowForwardRounded
                  sx={{
                    fontSize: 18,
                  }}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;