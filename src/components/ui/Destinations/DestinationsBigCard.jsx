"use client";

import { Rating } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarMonthOutlined,
  LocationOnOutlined,
  ArrowOutwardRounded,
} from "@mui/icons-material";

const DestinationsBigCard = ({ destination }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-24">
        {/* =====================================================
            IMAGE
        ====================================================== */}

        <div className="group relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#111827] sm:aspect-[16/10]">
            <Image
              src={destination.image[0]}
              alt={destination.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.035]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

            {/* Image metadata */}

            <div className="absolute left-6 top-6 flex items-center gap-3 text-white sm:left-8 sm:top-8">
              <span className="h-2 w-2 rounded-full bg-[#2095AE]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                Featured destination
              </span>
            </div>

            {/* Location overlay */}

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <span className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/60">
                  Explore
                </span>

                <span className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
                  {destination.locations?.city}
                </span>
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/10 backdrop-blur-sm transition-all duration-300 group-hover:border-[#2095AE] group-hover:bg-[#2095AE]">
                <ArrowOutwardRounded
                  sx={{ fontSize: 18 }}
                  className="text-white"
                />
              </span>
            </div>
          </div>

          {/* Floating image number */}

          <div className="absolute -bottom-5 left-6 hidden bg-[#111827] px-5 py-4 sm:block">
            <span className="block text-[9px] uppercase tracking-[0.25em] text-white/40">
              Featured
            </span>

            <span className="text-lg font-medium text-white">
              01
            </span>
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="relative">
          <div className="mb-7 flex items-center gap-3">
            <LocationOnOutlined
              sx={{ fontSize: 17 }}
              className="text-[#2095AE]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#111827]/45">
              {destination.locations?.city},{" "}
              {destination.locations?.country?.countryId}
            </span>
          </div>

          <h2 className="max-w-xl text-[clamp(2.4rem,4vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[#111827]">
            {destination.title}
          </h2>

          <div className="my-7 h-px w-full bg-[#111827]/10" />

          {/* Rating */}

          <div className="mb-7 flex items-center gap-4">
            <Rating
              name="destination-rating"
              value={destination.ratingAverage}
              precision={0.25}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#2095AE",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#d7dcdd",
                },
              }}
            />

            <span className="text-xs font-medium text-[#111827]/60">
              {destination.ratingAverage}
              <span className="ml-1 text-[#111827]/30">
                / {destination.ratingQuantity} reviews
              </span>
            </span>
          </div>

          {/* Description */}

          <p className="max-w-xl text-[14px] leading-[1.9] text-[#111827]/55">
            {destination.description}
          </p>

          {/* Information */}

          <div className="mt-9 grid grid-cols-2 border-y border-[#111827]/10">
            <div className="border-r border-[#111827]/10 py-5 pr-5">
              <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#111827]/35">
                Starting from
              </span>

              <span className="text-xl font-medium tracking-[-0.03em] text-[#111827]">
                ${destination.packagePrice}
              </span>
            </div>

            <div className="py-5 pl-5">
              <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#111827]/35">
                Duration
              </span>

              <span className="text-xl font-medium tracking-[-0.03em] text-[#111827]">
                {destination.durationDays}
                <span className="ml-1 text-sm text-[#111827]/40">
                  days
                </span>
              </span>
            </div>
          </div>

          {/* Start date */}

          <div className="mt-6 flex items-center gap-3">
            <CalendarMonthOutlined
              sx={{ fontSize: 17 }}
              className="text-[#2095AE]"
            />

            <span className="text-xs text-[#111827]/55">
              Next departure{" "}
              <strong className="font-semibold text-[#111827]">
                {destination.startDate}
              </strong>
            </span>
          </div>

          {/* CTA */}

          <motion.a
            href={`/all-destinations/${destination._id}`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-9 inline-flex items-center gap-5"
          >
            <span className="text-sm font-semibold text-[#111827]">
              Explore this destination
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2095AE] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowOutwardRounded
                sx={{ fontSize: 18 }}
                className="text-white"
              />
            </span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

export default DestinationsBigCard;