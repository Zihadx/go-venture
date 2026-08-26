"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { Avatar, IconButton, Rating } from "@mui/material";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  FormatQuoteRounded,
  LocationOnOutlined,
} from "@mui/icons-material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    userImage:
      "https://i.ibb.co/CBSJbcN/IMG-20240329-141614.jpg",
    feedback:
      "I had a wonderful time exploring the local culture and cuisine. The service was top-notch.",
    username: "Adnin",
    rating: 5,
    title: "Great Experience",
    location: "Paris, France",
    date: "April 15, 2024",
  },
  {
    userImage:
      "https://i.ibb.co/TtNS9Pd/IMG-20240115-214145-1.jpg",
    feedback:
      "I had a wonderful time exploring the local culture and cuisine. The service was top-notch.",
    username: "Zihad",
    rating: 4,
    title: "Memorable Journey",
    location: "Tokyo, Japan",
    date: "March 10, 2024",
  },
  {
    userImage:
      "https://i.ibb.co/CBSJbcN/IMG-20240329-141614.jpg",
    feedback:
      "I had a wonderful time exploring the local culture and cuisine. The service was top-notch.",
    username: "Minha",
    rating: 5,
    title: "Unforgettable Adventure",
    location: "Machu Picchu, Peru",
    date: "May 5, 2024",
  },
];

const ClientReviewsSection = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: testimonials.length > 2,
    speed: 750,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5200,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8f6] py-24 md:py-32">
      {/* =========================================================
          BACKGROUND ART DIRECTION
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Large teal atmosphere */}
        <div className="absolute -right-48 -top-40 h-[600px] w-[600px] rounded-full bg-[#2095AE]/[0.055] blur-3xl" />

        {/* Bottom atmosphere */}
        <div className="absolute -bottom-56 -left-40 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.035] blur-3xl" />

        {/* Editorial horizontal line */}
        <div className="absolute left-0 top-[23%] h-px w-full bg-[#111827]/[0.06]" />

        {/* Vertical editorial lines */}
        <div className="absolute left-[7%] top-0 hidden h-full w-px bg-[#111827]/[0.045] lg:block" />

        <div className="absolute right-[7%] top-0 hidden h-full w-px bg-[#111827]/[0.045] lg:block" />

        {/* Decorative circle */}
        <div className="absolute right-[12%] top-[12%] hidden h-20 w-20 rounded-full border border-[#2095AE]/20 lg:block" />

        <div className="absolute right-[14%] top-[15%] hidden h-2 w-2 rounded-full bg-[#2095AE] lg:block" />
      </div>

      <div className="custom-container relative z-10">
        {/* =========================================================
            INTRO
        ========================================================== */}

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          {/* Section index */}

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#2095AE]">
              04
            </span>

            <span className="h-px w-12 bg-[#2095AE]/50" />

            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#111827]/40">
              Guest Stories
            </span>
          </div>

          {/* Heading */}

          <div>
            <h2 className="max-w-5xl text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.065em] text-[#111827]">
              Stories from
              <br />
              <span className="font-serif italic text-[#2095AE]">
                the road.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-[15px] leading-[1.85] text-[#111827]/55 sm:text-base">
              Every journey leaves something behind. Read the experiences,
              memories and moments shared by travelers who explored the world
              with Go-Venture.
            </p>
          </div>
        </div>

        {/* =========================================================
            EXPERIENCE STATEMENT
        ========================================================== */}

        <div className="mt-14 flex flex-col justify-between gap-6 border-y border-[#111827]/10 py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2095AE]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#111827]/45">
              Experiences that stay with you
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#111827]/30">
              Traveler voices
            </span>

            <span className="h-px w-10 bg-[#111827]/15" />

            <span className="text-[10px] font-semibold tracking-[0.15em] text-[#2095AE]">
              2024 — 2026
            </span>
          </div>
        </div>

        {/* =========================================================
            TESTIMONIAL AREA
        ========================================================== */}

        <div className="relative mt-16">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-2.5 pb-12 sm:px-3">
                <article className="group relative flex min-h-[430px] flex-col overflow-hidden border border-[#111827]/10 bg-white transition-all duration-700 hover:-translate-y-2 hover:border-[#2095AE]/30 hover:shadow-[0_35px_90px_rgba(17,24,39,0.10)]">
                  {/* =================================================
                      TOP META
                  ================================================== */}

                  <div className="flex items-center justify-between border-b border-[#111827]/[0.07] px-7 py-5 md:px-9">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#2095AE]">
                        Journey
                      </span>

                      <span className="h-px w-7 bg-[#2095AE]/40" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#111827]/30">
                        0{index + 1}
                      </span>
                    </div>

                    <span className="text-[9px] uppercase tracking-[0.18em] text-[#111827]/30">
                      Verified traveler
                    </span>
                  </div>

                  {/* =================================================
                      QUOTE AREA
                  ================================================== */}

                  <div className="relative flex flex-1 flex-col px-7 py-8 md:px-9 md:py-10">
                    {/* Oversized quote */}

                    <div className="absolute right-6 top-3 opacity-[0.055] transition-all duration-500 group-hover:opacity-[0.10]">
                      <FormatQuoteRounded
                        sx={{
                          fontSize: 130,
                          color: "#2095AE",
                        }}
                      />
                    </div>

                    {/* Rating */}

                    <div className="relative z-10">
                      <Rating
                        value={testimonial.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#2095AE",
                          },
                          "& .MuiRating-iconEmpty": {
                            color: "#D9E1E3",
                          },
                        }}
                      />
                    </div>

                    {/* Title */}

                    <h3 className="relative z-10 mt-8 max-w-xl text-[clamp(1.6rem,2.4vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[#111827]">
                      {testimonial.title}
                    </h3>

                    {/* Quote */}

                    <p className="relative z-10 mt-6 max-w-xl text-[15px] leading-[1.9] text-[#111827]/55">
                      “{testimonial.feedback}”
                    </p>

                    {/* =================================================
                        LOCATION
                    ================================================== */}

                    <div className="mt-auto pt-8">
                      <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-[#2095AE]" />

                        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111827]/40">
                          <LocationOnOutlined
                            sx={{
                              fontSize: 14,
                              color: "#2095AE",
                            }}
                          />

                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      USER FOOTER
                  ================================================== */}

                  <div className="flex items-center justify-between gap-5 border-t border-[#111827]/[0.07] bg-[#fafbf9] px-7 py-5 md:px-9">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={testimonial.userImage}
                        alt={testimonial.username}
                        sx={{
                          width: 43,
                          height: 43,
                          border: "2px solid rgba(32,149,174,0.25)",
                        }}
                      />

                      <div>
                        <h4 className="text-sm font-semibold tracking-[-0.01em] text-[#111827]">
                          {testimonial.username}
                        </h4>

                        <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.18em] text-[#111827]/35">
                          Go-Venture traveler
                        </span>
                      </div>
                    </div>

                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#111827]/30">
                      {testimonial.date}
                    </span>
                  </div>

                  {/* Bottom accent */}

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2095AE] transition-all duration-700 group-hover:w-full" />
                </article>
              </div>
            ))}
          </Slider>

          {/* =========================================================
              CONTROLS
          ========================================================== */}

          <div className="mt-4 flex items-center justify-between border-t border-[#111827]/10 pt-6">
            {/* Progress label */}

            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111827]/35">
                Navigate stories
              </span>

              <span className="h-px w-10 bg-[#111827]/15" />
            </div>

            {/* Navigation */}

            <div className="ml-auto flex items-center gap-2">
              <IconButton
                onClick={() => sliderRef.current?.slickPrev()}
                aria-label="Previous testimonial"
                sx={{
                  width: 48,
                  height: 48,
                  color: "#111827",
                  border: "1px solid rgba(17,24,39,0.12)",
                  background: "#fff",
                  transition: "all .35s cubic-bezier(0.22,1,0.36,1)",
                  "&:hover": {
                    color: "#fff",
                    background: "#2095AE",
                    borderColor: "#2095AE",
                    transform: "translateX(-3px)",
                  },
                }}
              >
                <ArrowBackRounded fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => sliderRef.current?.slickNext()}
                aria-label="Next testimonial"
                sx={{
                  width: 48,
                  height: 48,
                  color: "#111827",
                  border: "1px solid rgba(17,24,39,0.12)",
                  background: "#fff",
                  transition: "all .35s cubic-bezier(0.22,1,0.36,1)",
                  "&:hover": {
                    color: "#fff",
                    background: "#2095AE",
                    borderColor: "#2095AE",
                    transform: "translateX(3px)",
                  },
                }}
              >
                <ArrowForwardRounded fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================== */}

        <div className="mt-20 grid gap-8 border-t border-[#111827]/10 pt-8 sm:grid-cols-3">
          <div>
            <span className="block text-3xl font-medium tracking-[-0.05em] text-[#111827]">
              4.9<span className="text-[#2095AE]">/5</span>
            </span>

            <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#111827]/35">
              Average traveler rating
            </span>
          </div>

          <div>
            <span className="block text-3xl font-medium tracking-[-0.05em] text-[#111827]">
              10<span className="text-[#2095AE]">+</span>
            </span>

            <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#111827]/35">
              Years creating journeys
            </span>
          </div>

          <div className="sm:text-right">
            <span className="block text-sm font-medium leading-6 text-[#111827]/60">
              “The best journeys are measured
              <br className="hidden sm:block" />
              in memories, not miles.”
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          SLICK DOT OVERRIDES
      ========================================================== */}

      <style jsx global>{`
        .client-reviews-slider .slick-dots {
          bottom: -8px;
        }

        .slick-dots {
          position: relative;
          bottom: auto;
          margin-top: 12px;
        }

        .slick-dots li {
          margin: 0 3px;
          width: 18px;
          transition: all 0.3s ease;
        }

        .slick-dots li button {
          width: 18px;
          padding: 0;
        }

        .slick-dots li button:before {
          font-size: 6px;
          color: rgba(17, 24, 39, 0.22);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .slick-dots li.slick-active {
          width: 32px;
        }

        .slick-dots li.slick-active button:before {
          color: #2095ae;
          opacity: 1;
          width: 32px;
        }

        .slick-slide {
          height: auto;
        }

        .slick-slide > div {
          height: 100%;
        }

        .slick-list {
          margin: 0 -3px;
        }
      `}</style>
    </section>
  );
};

export default ClientReviewsSection;