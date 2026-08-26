"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowForwardRounded,
  CalendarMonthOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import { Rating } from "@mui/material";

const HotDealsCard = ({ hotDeal, destination }) => {
  const originalPrice = Number(hotDeal?.price || 0);
  const discountedPrice = Number(hotDeal?.discountPrice || 0);

  const discountPercentage =
    originalPrice > 0 && discountedPrice > 0
      ? Math.round(
          ((originalPrice - discountedPrice) / originalPrice) * 100
        )
      : 0;

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-gray-200/80 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#2095ae]/20 hover:shadow-[0_25px_70px_rgba(16,33,58,0.13)]">

      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={destination?.coverImage}
          alt={destination?.title || "Travel destination"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/70 via-transparent to-transparent" />

        {/* =================================================
            DISCOUNT
        ================================================== */}

        {discountPercentage > 0 && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#2095ae] px-3.5 py-2 text-xs font-bold text-white shadow-lg">
            <span>{discountPercentage}% OFF</span>
          </div>
        )}

        {/* Duration */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#071525]/60 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
          <CalendarMonthOutlined sx={{ fontSize: 15 }} />

          <span>
            {destination?.durationDays || 0} Days
          </span>
        </div>

        {/* Destination */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <LocationOnOutlined
              sx={{
                fontSize: 16,
                color: "#2095ae",
              }}
            />

            <span>{destination?.title}</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="p-6 md:p-7">

        {/* Rating */}
        <div className="mb-4 flex items-center gap-2">
          <Rating
            value={Number(destination?.ratingAverage || 0)}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#2095ae",
              },

              "& .MuiRating-iconEmpty": {
                color: "#dbe4e7",
              },
            }}
          />

          <span className="text-xs font-medium text-gray-500">
            {destination?.ratingAverage || 0}
          </span>

          <span className="text-xs text-gray-400">
            ({destination?.ratingQuantity || 0} reviews)
          </span>
        </div>

        {/* Deal title */}
        <h3 className="line-clamp-2 min-h-[56px] text-xl font-semibold leading-7 tracking-tight text-[#10213a] transition-colors duration-300 group-hover:text-[#2095ae]">
          {hotDeal?.title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
          {hotDeal?.description}
        </p>

        {/* =================================================
            BOTTOM
        ================================================== */}

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-gray-100 pt-5">

          {/* Pricing */}
          <div>
            {originalPrice > discountedPrice && (
              <p className="text-xs text-gray-400 line-through">
                ${originalPrice}
              </p>
            )}

            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-[#10213a]">
                ${discountedPrice}
              </span>

              <span className="text-xs text-gray-400">
                / person
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/all-destinations/${destination?._id}`}
            className="group/button flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2095ae] text-white transition-all duration-300 hover:w-[125px] hover:bg-[#16788d]"
          >
            <span className="hidden whitespace-nowrap text-xs font-semibold group-hover/button:block">
              Explore trip
            </span>

            <ArrowForwardRounded
              fontSize="small"
              className="transition-transform duration-300 group-hover/button:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2095ae] transition-all duration-500 group-hover:w-full" />
    </article>
  );
};

export default HotDealsCard;