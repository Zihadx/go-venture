"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowForwardRounded,
  CalendarMonthOutlined,
  LocationOnOutlined,
  StarRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const HotDealsCard = ({ hotDeal, destination }) => {
  const originalPrice = Number(hotDeal?.price || 0);
  const discountedPrice = Number(hotDeal?.discountPrice || 0);

  const discountPercentage =
    originalPrice > 0 && discountedPrice > 0
      ? Math.round(
          ((originalPrice - discountedPrice) / originalPrice) * 100
        )
      : 0;

  const rating = Number(destination?.ratingAverage || 0);
  const reviews = Number(destination?.ratingQuantity || 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* =====================================================
          CARD FRAME
      ====================================================== */}

      <div className="relative overflow-hidden border border-[#10213a]/10 bg-white transition-all duration-700 group-hover:border-[#2095AE]/30 group-hover:shadow-[0_30px_80px_rgba(16,33,58,0.14)]">

        {/* ===================================================
            IMAGE AREA
        ==================================================== */}

        <div className="relative h-[390px] overflow-hidden bg-[#10213a]">
          <Image
            src={destination?.coverImage}
            alt={destination?.title || "Travel destination"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
          />

          {/* Cinematic color treatment */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071525] via-[#071525]/10 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#2095AE]/10 opacity-60" />

          {/* =================================================
              TOP INDEX
          ================================================== */}

          <div className="absolute left-5 top-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-white/20 bg-black/20 text-[10px] font-semibold tracking-[0.15em] text-white backdrop-blur-md">
              0{destination?._id ? "" : "1"}
            </span>

            <span className="h-px w-8 bg-white/40" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75">
              Featured escape
            </span>
          </div>

          {/* =================================================
              DISCOUNT
          ================================================== */}

          {discountPercentage > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-5 top-5 z-10"
            >
              <div className="relative flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-[#2095AE] text-white shadow-[0_15px_40px_rgba(32,149,174,0.3)]">
                <span className="text-[19px] font-bold leading-none tracking-[-0.05em]">
                  {discountPercentage}%
                </span>

                <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  off
                </span>

                <span className="absolute -inset-1 rounded-full border border-white/20" />
              </div>
            </motion.div>
          )}

          {/* =================================================
              IMAGE BOTTOM INFORMATION
          ================================================== */}

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
            <div className="flex items-end justify-between gap-5">

              {/* Destination */}
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2">
                  <LocationOnOutlined
                    sx={{
                      fontSize: 15,
                      color: "#2095AE",
                    }}
                  />

                  <span className="truncate text-[9px] font-semibold uppercase tracking-[0.25em] text-white/65">
                    {destination?.title || "Unknown destination"}
                  </span>
                </div>

                <h3 className="max-w-[360px] text-2xl font-medium leading-[1.05] tracking-[-0.045em] text-white md:text-[28px]">
                  {hotDeal?.title}
                </h3>
              </div>

              {/* Duration */}
              <div className="hidden shrink-0 items-center gap-2 border-l border-white/20 pl-5 sm:flex">
                <CalendarMonthOutlined
                  sx={{
                    fontSize: 16,
                    color: "#2095AE",
                  }}
                />

                <div>
                  <span className="block text-[8px] uppercase tracking-[0.18em] text-white/40">
                    Duration
                  </span>

                  <span className="mt-1 block text-xs font-medium text-white">
                    {destination?.durationDays || 0} Days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            CONTENT AREA
        ==================================================== */}

        <div className="relative px-6 pb-6 pt-7 md:px-7 md:pb-7">

          {/* Rating + micro metadata */}

          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <StarRounded
                  sx={{
                    fontSize: 16,
                    color: "#2095AE",
                  }}
                />

                <span className="text-xs font-semibold text-[#10213a]">
                  {rating.toFixed(1)}
                </span>
              </div>

              <span className="h-1 w-1 rounded-full bg-[#10213a]/20" />

              <span className="text-[10px] uppercase tracking-[0.12em] text-[#10213a]/40">
                {reviews} reviews
              </span>
            </div>

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2095AE]">
              Limited offer
            </span>
          </div>

          {/* Description */}

          <p className="max-w-[500px] text-[13px] leading-[1.8] text-[#10213a]/55">
            {hotDeal?.description}
          </p>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div className="my-6 h-px w-full bg-[#10213a]/10" />

          {/* =================================================
              PRICE + CTA
          ================================================== */}

          <div className="flex items-end justify-between gap-5">

            {/* Pricing */}

            <div>
              <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#10213a]/35">
                From
              </span>

              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-semibold leading-none tracking-[-0.05em] text-[#10213a]">
                  ${discountedPrice}
                </span>

                <span className="text-[10px] uppercase tracking-[0.12em] text-[#10213a]/35">
                  / person
                </span>
              </div>

              {originalPrice > discountedPrice && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] text-[#10213a]/30 line-through">
                    ${originalPrice}
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#2095AE]">
                    Save ${originalPrice - discountedPrice}
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}

            <Link
              href={`/all-destinations/${destination?._id}`}
              className="group/cta relative flex h-12 items-center gap-4 overflow-hidden border border-[#10213a]/15 px-5 transition-all duration-500 hover:border-[#2095AE] hover:bg-[#2095AE]"
            >
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#10213a] transition-colors duration-300 group-hover/cta:text-white">
                Explore trip
              </span>

              <span className="relative z-10 flex h-7 w-7 items-center justify-center border border-[#10213a]/15 transition-all duration-300 group-hover/cta:border-white/30">
                <ArrowForwardRounded
                  sx={{ fontSize: 15 }}
                  className="text-[#10213a] transition-all duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:text-white"
                />
              </span>

              {/* hover fill */}
              <span className="absolute inset-0 -translate-x-full bg-[#2095AE] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/cta:translate-x-0" />
            </Link>
          </div>
        </div>

        {/* ===================================================
            EDITORIAL BOTTOM LINE
        ==================================================== */}

        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2095AE] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full" />
      </div>
    </motion.article>
  );
};

export default HotDealsCard;