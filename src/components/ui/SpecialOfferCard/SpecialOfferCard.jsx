"use client";

import {
  CalendarMonth,
  ConnectingAirports,
  LocationOnOutlined,
  Schedule,
} from "@mui/icons-material";
import {
  Box,
  CardContent,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const SpecialOfferCard = ({ destination, specialOffer }) => {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease,
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(16,33,58,0.10)]"
    >
      <div className="flex flex-col lg:flex-row">
        {/* IMAGE */}
        <div className="relative h-[260px] w-full overflow-hidden lg:h-auto lg:w-1/2">
          <motion.div
            className="h-full w-full"
            whileHover={{
              scale: 1.04,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
          >
            <Image
              className="h-full w-full object-cover"
              src={destination.coverImage}
              alt={destination.title}
              width={500}
              height={500}
            />
          </motion.div>

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />

          {/* PRICE BADGE */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease,
            }}
            className="absolute left-0 top-0 rounded-br-2xl bg-primary px-3 py-2 text-sm font-semibold text-white shadow-md"
          >
            <span className="mr-1 text-white/60 line-through">
              ${specialOffer.price}
            </span>

            ${specialOffer.discountPrice}
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="flex w-full flex-col justify-between p-5 lg:w-1/2 lg:p-6">
          <CardContent className="flex flex-grow flex-col justify-between space-y-5 !p-0">
            {/* Destination */}
            <div>
              <Typography
                variant="h6"
                className="font-semibold tracking-tight text-[#10213a]"
              >
                {destination.title}
              </Typography>

              {/* Rating */}
              <Box className="mt-2 flex items-center gap-2">
                <Rating
                  className="text-orange-500"
                  name="half-rating-read"
                  defaultValue={destination.ratingAverage}
                  precision={0.25}
                  readOnly
                  size="small"
                />

                <Typography
                  variant="body2"
                  className="text-xs font-medium text-gray-500"
                >
                  {destination.ratingAverage}
                  <span className="ml-1 text-gray-400">
                    ({destination.ratingQuantity})
                  </span>
                </Typography>
              </Box>
            </div>

            {/* Description */}
            <Typography
              variant="body2"
              className="line-clamp-2 text-sm leading-6 text-gray-500"
            >
              {specialOffer.description.slice(0, 60)}...
            </Typography>

            {/* Bottom */}
            <Box
              className="flex items-center justify-between border-t border-gray-100 pt-4"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Meta icons */}
              <Box>
                <Typography
                  variant="body1"
                  className="flex items-center gap-2 text-gray-400"
                >
                  <Tooltip title={specialOffer.startDate} arrow>
                    <motion.span
                      whileHover={{
                        y: -2,
                        color: "#2095ae",
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex cursor-help"
                    >
                      <CalendarMonth fontSize="small" />
                    </motion.span>
                  </Tooltip>

                  <Tooltip
                    title={`${destination.durationDays} Days`}
                    arrow
                  >
                    <motion.span
                      whileHover={{
                        y: -2,
                        color: "#2095ae",
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex cursor-help"
                    >
                      <Schedule fontSize="small" />
                    </motion.span>
                  </Tooltip>

                  <Tooltip
                    title={`${destination.locations.city} Airports`}
                    arrow
                  >
                    <motion.span
                      whileHover={{
                        y: -2,
                        color: "#2095ae",
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex cursor-help"
                    >
                      <ConnectingAirports fontSize="small" />
                    </motion.span>
                  </Tooltip>

                  <Tooltip
                    title={`${destination.locations.city}, ${destination.locations.country.countryId}`}
                    arrow
                  >
                    <motion.span
                      whileHover={{
                        y: -2,
                        color: "#2095ae",
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex cursor-help"
                    >
                      <LocationOnOutlined fontSize="small" />
                    </motion.span>
                  </Tooltip>
                </Typography>
              </Box>

              {/* SEE MORE */}
              <Link
                href={`/all-destinations/${destination._id}`}
                className="group/link flex items-center text-sm font-semibold text-primary"
              >
                <span className="transition-all duration-300 group-hover/link:mr-1">
                  See more
                </span>

                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="ml-1"
                >
                  →
                </motion.span>
              </Link>
            </Box>
          </CardContent>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialOfferCard;