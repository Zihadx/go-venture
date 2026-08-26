"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { Avatar, Box, IconButton, Rating } from "@mui/material";
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
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "ease-in-out",

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="relative mt-28 overflow-hidden bg-[#071525] py-20 md:mt-36 md:py-28">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/3hSQYvj/review-Section.jpg')",
          }}
        />

        {/* Main overlay */}
        <div className="absolute inset-0 bg-[#071525]/90" />

        {/* Primary color glow */}
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#2095ae]/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#2095ae]/10 blur-3xl" />
      </div>

      <div className="custom-container relative z-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#2095ae]" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2095ae]">
              Guest Stories
            </span>

            <span className="h-px w-10 bg-[#2095ae]" />
          </div>

          <h2 className="text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Experiences worth
            <span className="font-serif italic text-[#2095ae]">
              {" "}
              remembering.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
            Real stories from travelers who trusted Go-Venture to turn their
            travel dreams into unforgettable experiences.
          </p>
        </div>

        {/* =====================================================
            TESTIMONIAL SLIDER
        ====================================================== */}

        <div className="relative mt-14 md:mt-16">

          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-3 pb-12">
                <article className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#2095ae]/40 hover:bg-white/[0.09] hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)] md:p-8">

                  {/* Quote icon */}
                  <div className="absolute right-6 top-5 opacity-[0.07] transition-all duration-500 group-hover:opacity-[0.12]">
                    <FormatQuoteRounded
                      sx={{
                        fontSize: 90,
                        color: "#2095ae",
                      }}
                    />
                  </div>

                  {/* Rating */}
                  <div className="relative z-10 flex items-center justify-between">
                    <Rating
                      value={testimonial.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: "#2095ae",
                        },
                        "& .MuiRating-iconEmpty": {
                          color: "rgba(255,255,255,0.15)",
                        },
                      }}
                    />

                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Verified traveler
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-8 flex-1">
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {testimonial.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/60">
                      “{testimonial.feedback}”
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-7 h-px bg-white/10" />

                  {/* User */}
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={testimonial.userImage}
                        alt={testimonial.username}
                        sx={{
                          width: 46,
                          height: 46,
                          border: "2px solid rgba(32,149,174,0.45)",
                        }}
                      />

                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {testimonial.username}
                        </h4>

                        <div className="mt-1 flex items-center gap-1 text-xs text-white/40">
                          <LocationOnOutlined
                            sx={{
                              fontSize: 14,
                              color: "#2095ae",
                            }}
                          />

                          {testimonial.location}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-white/30">
                      {testimonial.date}
                    </span>
                  </div>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2095ae] transition-all duration-500 group-hover:w-full" />
                </article>
              </div>
            ))}
          </Slider>

          {/* =====================================================
              CUSTOM CONTROLS
          ====================================================== */}

          <div className="mt-3 flex items-center justify-center gap-3 md:justify-end">
            <IconButton
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous testimonial"
              sx={{
                width: 46,
                height: 46,
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                transition: "all .35s ease",

                "&:hover": {
                  color: "#fff",
                  background: "#2095ae",
                  borderColor: "#2095ae",
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
                width: 46,
                height: 46,
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                transition: "all .35s ease",

                "&:hover": {
                  color: "#fff",
                  background: "#2095ae",
                  borderColor: "#2095ae",
                  transform: "translateX(3px)",
                },
              }}
            >
              <ArrowForwardRounded fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* =====================================================
          SLICK DOT OVERRIDES
      ====================================================== */}

      <style jsx global>{`
        .client-reviews-slider .slick-dots {
          bottom: -8px;
        }

        .slick-dots li {
          margin: 0 3px;
        }

        .slick-dots li button:before {
          font-size: 7px;
          color: rgba(255, 255, 255, 0.35);
          opacity: 1;
        }

        .slick-dots li.slick-active button:before {
          color: #2095ae;
          opacity: 1;
        }

        .slick-slide {
          height: auto;
        }

        .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </section>
  );
};

export default ClientReviewsSection;