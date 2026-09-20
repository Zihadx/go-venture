"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, Rating } from "@mui/material";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  FormatQuoteRounded,
  LocationOnOutlined,
  NorthEastRounded,
} from "@mui/icons-material";

type Testimonial = {
  userImage: string;
  feedback: string;
  username: string;
  rating: number;
  title: string;
  location: string;
  date: string;
  coordinates: {
    x: string;
    y: string;
  };
};

const testimonials: Testimonial[] = [
  {
    userImage:
      "https://i.ibb.co/CBSJbcN/IMG-20240329-141614.jpg",
    feedback:
      "I had a wonderful time exploring the local culture and cuisine. The service was top-notch.",
    username: "Adnin",
    rating: 5,
    title: "A journey worth remembering.",
    location: "Paris, France",
    date: "April 15, 2024",
    coordinates: {
      x: "43%",
      y: "36%",
    },
  },
  {
    userImage:
      "https://i.ibb.co/TtNS9Pd/IMG-20240115-214145-1.jpg",
    feedback:
      "Everything felt thoughtfully planned from the beginning. The experience was smooth, memorable, and genuinely enjoyable.",
    username: "Zihad",
    rating: 4,
    title: "More than just a trip.",
    location: "Tokyo, Japan",
    date: "March 10, 2024",
    coordinates: {
      x: "79%",
      y: "42%",
    },
  },
  {
    userImage:
      "https://i.ibb.co/CBSJbcN/IMG-20240329-141614.jpg",
    feedback:
      "The entire journey felt effortless. I could focus on discovering new places while everything else was taken care of.",
    username: "Minha",
    rating: 5,
    title: "An unforgettable adventure.",
    location: "Machu Picchu, Peru",
    date: "May 5, 2024",
    coordinates: {
      x: "29%",
      y: "60%",
    },
  },
];

const ClientReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  const next = () => {
    setDirection(1);
    setActiveIndex(
      (current) => (current + 1) % testimonials.length,
    );
  };

  const previous = () => {
    setDirection(-1);
    setActiveIndex(
      (current) =>
        (current - 1 + testimonials.length) %
        testimonials.length,
    );
  };

  const goTo = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setDirection(1);

      setActiveIndex(
        (current) => (current + 1) % testimonials.length,
      );
    }, 5500);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-[#F7F8F5] py-20 sm:py-24 lg:py-32">
      <div className="custom-container relative z-10">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-medium tracking-[-0.06em] text-[#111827]">
              4.9
              <span className="text-[#2095AE]">/5</span>
            </span>
          </div>

          <div>
            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.86] tracking-[-0.07em] text-[#111827]">
              The world,
              <br />
              <span className="font-serif italic text-[#2095AE]">
                through their eyes.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#111827]/65 sm:text-[15px]">
              Real journeys. Real places. Real memories. Discover
              what travelers experienced along the way with
              Go-Venture.
            </p>
          </div>
        </div>

        {/* Main */}
        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr]">
          {/* MAP */}
          <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-[#111827]/[0.08] bg-[#EEF2EF] sm:min-h-[520px]">
            {/* Map Header */}
            <div className="absolute left-6 right-6 top-6 z-20 flex items-start justify-between sm:left-8 sm:right-8 sm:top-8">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#2095AE]">
                  Across the world
                </span>

                <h3 className="mt-2 text-xl font-medium tracking-[-0.045em] text-[#111827] sm:text-2xl">
                  Stories in motion.
                </h3>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/65 px-3 py-2 backdrop-blur-md sm:flex">
                <motion.span
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-[#2095AE]"
                />

                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111827]/55">
                  Live journeys
                </span>
              </div>
            </div>

            {/* Map */}
            <svg
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {/* Grid */}
              <g opacity="0.22">
                <path
                  d="M0 120 H1000 M0 220 H1000 M0 320 H1000 M0 420 H1000 M0 520 H1000"
                  stroke="#111827"
                  strokeWidth="1"
                  strokeDasharray="3 12"
                />

                <path
                  d="M100 0 V600 M250 0 V600 M400 0 V600 M550 0 V600 M700 0 V600 M850 0 V600"
                  stroke="#111827"
                  strokeWidth="1"
                  strokeDasharray="3 12"
                />
              </g>

              {/* Globe Lines */}
              <g
                fill="none"
                stroke="#111827"
                strokeWidth="1"
                opacity="0.08"
              >
                <ellipse
                  cx="500"
                  cy="300"
                  rx="440"
                  ry="220"
                />

                <ellipse
                  cx="500"
                  cy="300"
                  rx="300"
                  ry="220"
                />

                <ellipse
                  cx="500"
                  cy="300"
                  rx="150"
                  ry="220"
                />
              </g>

              {/* Europe */}
              <path
                d="
                  M421 148
                  C438 136 456 137 468 146
                  L482 139
                  L494 148
                  L488 159
                  L501 165
                  L490 174
                  L474 169
                  L464 179
                  L448 174
                  L437 165
                  L423 166
                  L414 157
                  Z
                "
                fill="#C9D9D6"
              />

              {/* Asia */}
              <path
                d="
                  M493 157
                  C520 143 552 139 585 146
                  L622 137
                  L658 148
                  L694 142
                  L727 158
                  L748 179
                  L770 191
                  L759 211
                  L734 209
                  L716 221
                  L687 217
                  L667 230
                  L636 220
                  L610 227
                  L583 213
                  L556 217
                  L538 202
                  L515 197
                  L503 180
                  L487 175
                  Z
                "
                fill="#C9D9D6"
              />

              {/* Africa */}
              <path
                d="
                  M425 185
                  C445 180 468 188 478 204
                  L483 229
                  L475 255
                  L462 279
                  L450 305
                  L433 294
                  L425 269
                  L413 247
                  L416 220
                  L408 202
                  Z
                "
                fill="#C9D9D6"
              />

              {/* North America */}
              <path
                d="
                  M170 155
                  L194 137
                  L220 132
                  L245 142
                  L267 151
                  L285 170
                  L275 184
                  L253 188
                  L244 205
                  L226 199
                  L211 213
                  L192 203
                  L180 187
                  L161 177
                  Z
                "
                fill="#C9D9D6"
              />

              {/* South America */}
              <path
                d="
                  M274 225
                  C291 218 307 227 316 242
                  L318 263
                  L307 280
                  L301 304
                  L290 330
                  L279 352
                  L267 340
                  L264 316
                  L253 295
                  L258 271
                  L249 249
                  Z
                "
                fill="#C9D9D6"
              />

              {/* Australia */}
              <path
                d="
                  M705 350
                  C726 337 758 341 776 353
                  L793 370
                  L785 391
                  L763 401
                  L737 398
                  L716 387
                  L700 370
                  Z
                "
                fill="#C9D9D6"
              />

              {/* Travel Route */}
              <path
                d="
                  M435 158
                  C520 170 610 195 700 230
                  C625 280 500 300 280 275
                  C250 330 265 370 280 390
                "
                fill="none"
                stroke="#2095AE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 10"
                opacity="0.8"
              />

              {/* Route Glow */}
              <path
                d="
                  M435 158
                  C520 170 610 195 700 230
                  C625 280 500 300 280 275
                  C250 330 265 370 280 390
                "
                fill="none"
                stroke="#2095AE"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.07"
              />

              {/* Route Points */}
              {[
                { x: 435, y: 158 },
                { x: 700, y: 230 },
                { x: 280, y: 275 },
              ].map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="7"
                    fill="#2095AE"
                    stroke="#fff"
                    strokeWidth="4"
                  />

                  {activeIndex === index && (
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="15"
                      fill="#2095AE"
                      initial={{
                        opacity: 0.35,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: [0.35, 0],
                        scale: [0.7, 1.8],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* Destination */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.location}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="absolute bottom-6 left-6 right-6 z-20 sm:bottom-8 sm:left-8"
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/75 px-4 py-2.5 shadow-[0_15px_45px_rgba(17,24,39,.08)] backdrop-blur-xl">
                  <LocationOnOutlined
                    sx={{
                      fontSize: 15,
                      color: "#2095AE",
                    }}
                  />

                  <div>
                    <span className="block text-[7px] font-bold uppercase tracking-[0.22em] text-[#111827]/40">
                      Traveler destination
                    </span>

                    <span className="mt-0.5 block text-xs font-semibold text-[#111827]">
                      {activeTestimonial.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Map Label */}
            <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[7px] font-bold uppercase tracking-[0.3em] text-[#111827]/20 lg:block">
              GO-VENTURE / WORLD JOURNEYS
            </div>
          </div>

          {/* TESTIMONIAL */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-[#111827]/[0.08] bg-white sm:min-h-[520px]"
          >
            <AnimatePresence
              mode="wait"
              custom={direction}
            >
              <motion.article
                key={activeTestimonial.username}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 40 : -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -40 : 40,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex min-h-[440px] flex-col p-7 sm:min-h-[520px] sm:p-9"
              >
                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#2095AE]">
                      Traveler{" "}
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px w-6 bg-[#2095AE]/40" />
                  </div>

                  <NorthEastRounded
                    sx={{
                      fontSize: 17,
                      color: "rgba(17,24,39,.25)",
                    }}
                  />
                </div>

                {/* Quote Icon */}
                <div className="mt-12 flex h-11 w-11 items-center justify-center rounded-full bg-[#2095AE]/[0.08]">
                  <FormatQuoteRounded
                    sx={{
                      fontSize: 22,
                      color: "#2095AE",
                    }}
                  />
                </div>

                {/* Rating */}
                <Rating
                  value={activeTestimonial.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  className="mt-7"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#2095AE",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#D7DFE0",
                    },
                  }}
                />

                {/* Title */}
                <h3 className="mt-7 max-w-md text-[clamp(1.8rem,3vw,2.7rem)] font-medium leading-[1.02] tracking-[-0.055em] text-[#111827]">
                  {activeTestimonial.title}
                </h3>

                {/* Feedback */}
                <p className="mt-6 max-w-lg text-sm leading-7 text-[#111827]/65 sm:text-[15px] sm:leading-8">
                  “{activeTestimonial.feedback}”
                </p>

                {/* User */}
                <div className="mt-auto border-t border-[#111827]/[0.08] pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={activeTestimonial.userImage}
                        alt={activeTestimonial.username}
                        sx={{
                          width: 42,
                          height: 42,
                          border:
                            "2px solid rgba(32,149,174,.18)",
                        }}
                      />

                      <div>
                        <h4 className="text-sm font-semibold tracking-[-0.01em] text-[#111827]">
                          {activeTestimonial.username}
                        </h4>

                        <div className="mt-1 flex items-center gap-1.5">
                          <LocationOnOutlined
                            sx={{
                              fontSize: 12,
                              color: "#2095AE",
                            }}
                          />

                          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111827]/50">
                            {activeTestimonial.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="hidden text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111827]/35 sm:block">
                      {activeTestimonial.date}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="absolute bottom-0 left-7 right-7 h-[2px] overflow-hidden bg-[#111827]/[0.05]">
                  <motion.div
                    key={activeIndex}
                    initial={{
                      width: "0%",
                    }}
                    animate={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 5.5,
                      ease: "linear",
                    }}
                    className="h-full bg-[#2095AE]"
                  />
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:bottom-8 sm:right-8">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#111827]/10 bg-[#F7F8F5]/80 text-[#111827] transition-all duration-300 hover:-translate-x-0.5 hover:border-[#2095AE] hover:bg-[#2095AE] hover:text-white"
              >
                <ArrowBackRounded fontSize="small" />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#2095AE] bg-[#2095AE] text-white transition-all duration-300 hover:translate-x-0.5 hover:border-[#111827] hover:bg-[#111827]"
              >
                <ArrowForwardRounded fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* Story Indicators */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.username}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`View ${testimonial.username}'s story`}
                className="group flex items-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-8 bg-[#2095AE]"
                      : "w-2 bg-[#111827]/15 group-hover:bg-[#111827]/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#111827]/40">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ClientReviewsSection;