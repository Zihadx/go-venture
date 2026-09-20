"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SpecialOfferCard from "../ui/SpecialOfferCard/SpecialOfferCard";

const SpecialOffer = ({ specialOfferData, destinations }) => {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    if (!railRef.current) return;

    const amount = 540;

    railRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!railRef.current) return;

      const rail = railRef.current;
      const maxScroll = rail.scrollWidth - rail.clientWidth;

      if (rail.scrollLeft >= maxScroll - 10) {
        rail.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        rail.scrollBy({
          left: 540,
          behavior: "smooth",
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7f8f6] py-20 sm:py-24 lg:py-32">
      <div className="custom-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
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
            Discover carefully selected travel experiences and
            limited-time offers created for travelers who want more
            from every journey.
          </p>
        </motion.div>

        {/* Rail Controls */}
        <div className="mt-12 flex items-center justify-between sm:mt-16">
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111827]/35">
            Curated escapes
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRail("left")}
              aria-label="Previous offers"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111827]/10 bg-white text-[#111827] transition-all duration-300 hover:border-[#2095AE] hover:bg-[#2095AE] hover:text-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scrollRail("right")}
              aria-label="Next offers"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2095AE] text-white transition-all duration-300 hover:bg-[#111827]"
            >
              →
            </button>
          </div>
        </div>

        {/* Auto Sliding Rail */}
        <div
          ref={railRef}
          className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scrollbar-hide"
        >
          {specialOfferData?.map((specialOffer) => {
            const destination = destinations?.data?.find(
              (dest) => dest._id === specialOffer.destinationId
            );

            if (!destination) return null;

            return (
              <motion.div
                key={specialOffer._id}
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-[88vw] shrink-0 snap-start sm:w-[620px] lg:w-[680px]"
              >
                <SpecialOfferCard
                  specialOffer={specialOffer}
                  destination={destination}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#111827]/30">
            Swipe to explore
          </span>

          <span className="text-[9px] uppercase tracking-[0.2em] text-[#2095AE]">
            Travel further. Experience more.
          </span>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;