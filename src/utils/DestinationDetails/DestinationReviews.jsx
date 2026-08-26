"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Rating, TextField } from "@mui/material";
import { motion } from "framer-motion";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

const DestinationReviewsSection = ({ destinationData }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Keep your existing submit logic here
    // console.log({ rating, review });
  };

  const averageRating = destinationData?.ratingAverage || 0;
  const ratingQuantity = destinationData?.ratingQuantity || 0;

  return (
    <section className="mt-16">
      {/* =====================================================
          SECTION HEADER
      ====================================================== */}

      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-[#2095AE]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2095AE]">
            Traveler experiences
          </span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.04em] text-[#111827] md:text-4xl">
              Stories from
              <span className="font-serif italic text-[#2095AE]">
                {" "}
                the journey.
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#111827]/50">
              See what travelers experienced and shared after discovering
              this destination with Go-Venture.
            </p>
          </div>

          {/* Overall rating */}
          <div className="flex items-center gap-4 md:pb-1">
            <div className="text-right">
              <p className="text-3xl font-semibold tracking-tight text-[#111827]">
                {averageRating}
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-[#111827]/35">
                {ratingQuantity} reviews
              </p>
            </div>

            <div className="h-10 w-px bg-[#111827]/10" />

            <Rating
              value={Number(averageRating)}
              precision={0.25}
              readOnly
              sx={{
                color: "#2095AE",
                fontSize: "1.2rem",
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          FEATURED REVIEW
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden border-y border-[#111827]/10 py-8 md:py-10"
      >
        {/* Quote decoration */}
        <div className="absolute right-5 top-5 text-[#2095AE]/10 md:right-8 md:top-6">
          <FormatQuoteRoundedIcon
            sx={{
              fontSize: 70,
            }}
          />
        </div>

        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          {/* User */}
          <div className="flex shrink-0 items-center gap-4 md:w-52">
            <div className="h-14 w-14 overflow-hidden rounded-full">
              <Image
                src="https://i.ibb.co/KXmt47T/caleb-george-Ae-Zncpkq-MVU-unsplash.jpg"
                alt="Sara Rahman"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Sara Rahman
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#111827]/35">
                Verified traveler
              </p>
            </div>
          </div>

          {/* Review */}
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-4">
              <Rating
                value={Number(averageRating)}
                precision={0.25}
                readOnly
                sx={{
                  color: "#2095AE",
                  fontSize: "1rem",
                }}
              />

              <span className="text-[10px] uppercase tracking-[0.15em] text-[#111827]/30">
                01 / 05 / 2024
              </span>
            </div>

            <p className="text-base leading-8 text-[#111827]/65 md:text-lg">
              {destinationData?.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          ADD REVIEW
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-14"
      >
        <div className="mb-7">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2095AE]">
            Share your experience
          </span>

          <h3 className="mt-2 text-2xl font-medium tracking-[-0.035em] text-[#111827] md:text-3xl">
            Tell us about your journey.
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-7 md:grid-cols-[220px_1fr]">
            {/* Rating */}
            <div className="border border-[#111827]/10 p-5">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111827]/45">
                Your rating
              </p>

              <Rating
                name="rating"
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                sx={{
                  color: "#2095AE",
                  fontSize: "1.5rem",
                }}
              />

              <p className="mt-3 text-xs text-[#111827]/35">
                {rating} out of 5
              </p>
            </div>

            {/* Review input */}
            <div>
              <TextField
                label="Your review"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    backgroundColor: "rgba(17,24,39,0.015)",

                    "& fieldset": {
                      borderColor: "rgba(17,24,39,0.12)",
                    },

                    "&:hover fieldset": {
                      borderColor: "rgba(32,149,174,0.4)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#2095AE",
                      borderWidth: "1px",
                    },

                    "& textarea": {
                      color: "#111827",
                      fontSize: "14px",
                      lineHeight: "1.8",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "rgba(17,24,39,0.45)",
                    fontSize: "13px",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2095AE",
                  },
                }}
              />

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-[#111827] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#2095AE]"
                >
                  <span>Submit review</span>

                  <SendRoundedIcon
                    sx={{ fontSize: 17 }}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default DestinationReviewsSection;