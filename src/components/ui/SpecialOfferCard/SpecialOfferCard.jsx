"use client";

import {
  CalendarMonth,
  ConnectingAirports,
  LocationOnOutlined,
  Schedule,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const SpecialOfferCard = ({ destination, specialOffer }) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="group overflow-hidden rounded-[1.75rem] bg-white duration-500"
    >
      <div className="flex min-h-[320px] flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-[230px] w-full overflow-hidden sm:h-auto sm:w-[46%]">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={destination.coverImage}
              alt={destination.title}
              width={700}
              height={700}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* Price */}
          <div className="absolute left-0 top-0 rounded-br-2xl bg-[#2095AE] px-4 py-3 text-sm font-semibold text-white">
            <span className="mr-1 text-white/55 line-through">
              ${specialOffer.price}
            </span>
            ${specialOffer.discountPrice}
          </div>

          {/* Location */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
            <LocationOnOutlined sx={{ fontSize: 15 }} />

            <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">
              {destination.locations?.city}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.04em] text-[#111827]">
                  {destination.title}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <Rating
                    value={destination.ratingAverage}
                    precision={0.25}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#2095AE",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "#D9E0E1",
                      },
                    }}
                  />

                  <span className="text-[10px] font-medium text-[#111827]/40">
                    {destination.ratingAverage} (
                    {destination.ratingQuantity})
                  </span>
                </div>
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#2095AE]">
                Offer
              </span>
            </div>

            <p className="mt-6 line-clamp-3 text-sm leading-6 text-[#111827]/55">
              {specialOffer.description}
            </p>
          </div>

          <div className="mt-7">
            {/* Meta */}
            <div className="flex items-center gap-4 text-[#111827]/40">
              <span
                title={specialOffer.startDate}
                className="flex items-center"
              >
                <CalendarMonth fontSize="small" />
              </span>

              <span
                title={`${destination.durationDays} Days`}
                className="flex items-center"
              >
                <Schedule fontSize="small" />
              </span>

              <span
                title={`${destination.locations?.city} Airports`}
                className="flex items-center"
              >
                <ConnectingAirports fontSize="small" />
              </span>

              <span
                title={`${destination.locations?.city}, ${destination.locations?.country?.countryId}`}
                className="flex items-center"
              >
                <LocationOnOutlined fontSize="small" />
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/all-destinations/${destination._id}`}
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#2095AE] transition-colors duration-300 hover:text-[#111827]"
            >
              Explore destination
              <motion.span
                whileHover={{ x: 4 }}
                className="text-base"
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default SpecialOfferCard;