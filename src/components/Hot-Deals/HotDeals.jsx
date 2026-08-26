"use client";

import HotDealsCard from "../ui/CardDesign/HotDealsCard/HotDealsCard";
import {
  ArrowForwardRounded,
  LocalFireDepartmentRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { motion } from "framer-motion";

const HotDeals = ({ hotDealData = [], destinations }) => {
  const destinationData = destinations?.data || [];

  const ease = [0.22, 1, 0.36, 1];

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 25,
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

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8f6] py-20 sm:py-24 lg:py-32">
      {/* Subtle atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-72 top-0 h-[550px] w-[550px] rounded-full bg-[#2095AE]/[0.035] blur-[120px]" />

        <div className="absolute -left-64 bottom-0 h-[450px] w-[450px] rounded-full bg-[#2095AE]/[0.02] blur-[110px]" />
      </div>

      <div className="custom-container relative z-10">
        {/* =========================================================
            HEADER
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
            {/* Eyebrow */}

            <div className="mb-5 flex items-center gap-3">
              <LocalFireDepartmentRounded
                sx={{ fontSize: 17 }}
                className="text-[#2095AE]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2095AE]">
                Limited time offers
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-[clamp(2.8rem,5.5vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-[#111827]">
              Extraordinary trips.
              <br />
              <span className="font-serif italic text-[#2095AE]">
                Exceptional prices.
              </span>
            </h2>
          </div>

          {/* Description + desktop CTA */}

          <div className="flex max-w-md flex-col gap-6 md:pb-1">
            <p className="text-[14px] leading-[1.85] text-[#111827]/55 md:text-[15px]">
              Unlock incredible destinations at prices worth travelling for.
              These exclusive offers won&apos;t stay around forever.
            </p>

            <Link
              href="/all-destinations"
              className="group hidden w-fit items-center gap-4 text-sm font-semibold text-[#111827] md:inline-flex"
            >
              <span className="relative">
                View all destinations

                <span className="absolute -bottom-1 left-0 h-px w-full bg-[#2095AE] transition-transform duration-300 group-hover:scale-x-0" />
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#111827]/15 transition-all duration-300 group-hover:border-[#2095AE] group-hover:bg-[#2095AE]">
                <ArrowForwardRounded
                  sx={{ fontSize: 17 }}
                  className="text-[#111827] transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* =========================================================
            DEAL GRID
        ========================================================== */}

        {hotDealData.length > 0 ? (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
          >
            {hotDealData.map((hotDeal) => {
              const destination = destinationData.find(
                (dest) => dest._id === hotDeal.destinationId
              );

              if (!destination) return null;

              return (
                <motion.div
                  key={hotDeal._id}
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
                  <HotDealsCard
                    hotDeal={hotDeal}
                    destination={destination}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* =========================================================
              EMPTY STATE
          ========================================================== */

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
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="mt-12 border-y border-[#111827]/10 py-16 text-center"
          >
            <p className="text-sm text-[#111827]/45">
              No special offers are available right now.
            </p>
          </motion.div>
        )}

        {/* =========================================================
            MOBILE CTA
        ========================================================== */}

        {hotDealData.length > 0 && (
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
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease,
            }}
            className="mt-12 flex justify-center md:hidden"
          >
            <Link
              href="/all-destinations"
              className="group inline-flex items-center gap-4 border-b border-[#111827]/20 pb-2 text-sm font-semibold text-[#111827] transition-colors duration-300 hover:border-[#2095AE]"
            >
              <span>Explore destinations</span>

              <ArrowForwardRounded
                sx={{ fontSize: 18 }}
                className="text-[#2095AE] transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}

        {/* =========================================================
            BOTTOM BRAND LINE
        ========================================================== */}

        {hotDealData.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="mt-12 flex flex-col gap-3 border-t border-[#111827]/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#111827]/30">
              Go-Venture exclusive
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#2095AE]">
              Travel further. Spend smarter.
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HotDeals;