"use client";

import React from "react";
import { motion } from "framer-motion";
import SpecialOfferCard from "../ui/SpecialOfferCard/SpecialOfferCard";

const SpecialOffer = ({ specialOfferData, destinations }) => {
  const ease = [0.22, 1, 0.36, 1];

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease,
      },
    },
  };

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8f6] py-20 sm:py-24 lg:py-32">
      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-72 top-0 h-[550px] w-[550px] rounded-full bg-[#2095AE]/[0.035] blur-[120px]" />

        <div className="absolute -left-64 bottom-0 h-[450px] w-[450px] rounded-full bg-[#2095AE]/[0.02] blur-[110px]" />
      </div>

      <div className="custom-container relative z-10">
        {/* =========================================================
            SECTION HEADER
        ========================================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          variants={headerVariants}
          className="flex flex-col gap-8 border-b border-[#111827]/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2095AE]">
              Exclusive escapes
            </span>

            <h2 className="text-[clamp(2.8rem,5.5vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-[#111827]">
              Extraordinary
              <br />
              <span className="font-serif italic text-[#2095AE]">
                journeys,
              </span>{" "}
              better value.
            </h2>
          </div>

          <p className="max-w-md text-[14px] leading-[1.85] text-[#111827]/55 md:pb-1 md:text-[15px]">
            Discover carefully selected travel experiences and limited-time
            offers created for travelers who want more from every journey.
          </p>
        </motion.div>

        {/* =========================================================
            OFFERS
        ========================================================== */}

        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
        >
          {specialOfferData.map((specialOffer) => {
            const destination = destinations?.data?.find(
              (dest) => dest._id === specialOffer.destinationId
            );

            return (
              <motion.div
                key={specialOffer._id}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: {
                    duration: 0.35,
                    ease: "easeOut",
                  },
                }}
                className="will-change-transform"
              >
                <SpecialOfferCard
                  specialOffer={specialOffer}
                  destination={destination}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
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
            delay: 0.15,
            ease,
          }}
          className="mt-12 flex flex-col gap-3 border-t border-[#111827]/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#111827]/35">
            Curated travel offers
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#2095AE]">
            Travel further. Experience more.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffer;