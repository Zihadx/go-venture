"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";

import CountyBigCard from "@/components/ui/CardDesign/CountryCard/CountyBigCard";
import CountrySmallCard from "../ui/CardDesign/CountryCard/CountrySmallCard";

const CountryPage = ({ countries }) => {
  const [showAll, setShowAll] = useState(false);

  const countryList = Array.isArray(countries?.data)
    ? countries.data
    : [];

  if (!countryList.length) return null;

  const featuredCountry = countryList[0];
  const smallCountries = countryList.slice(1, 5);
  const remainingCountries = countryList.slice(5);

  return (
    <section className="relative overflow-hidden bg-[#F7F8F6] py-24 sm:py-28 lg:py-32">
      {/* ================= BACKGROUND ================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.035] blur-[130px]" />

        <div className="absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.025] blur-[130px]" />
      </div>

      <div className="custom-container relative z-10">
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="mb-5 block font-serif text-lg italic text-[#2095AE]">
            Across borders,
          </span>

          <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.065em] text-[#111827]">
            The world is
            <br />

            <span className="text-[#111827]/25">your </span>

            <span className="font-serif italic text-[#2095AE]">
              itinerary.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#111827]/50 sm:text-base">
            Explore a carefully selected world of destinations, from iconic
            landscapes to places that rarely make the ordinary itinerary.
            Find somewhere that feels entirely yours.
          </p>
        </motion.div>

        {/* ================= COLLECTION HEADER ================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 flex items-center justify-between border-b border-[#111827]/10 pb-5 lg:mt-24"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111827]/40">
            Featured destinations
          </span>

          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#111827]/30">
            {countryList.length} destinations
          </span>
        </motion.div>

        {/* ================= FEATURED GRID ================= */}

        <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* FEATURED */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0 lg:col-span-2"
          >
            <CountyBigCard country={featuredCountry} />
          </motion.div>

          {/* SMALL DESTINATIONS */}

          <div className="grid min-w-0 grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:col-span-3">
            {smallCountries.map((country, index) => (
              <motion.div
                key={country._id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-w-0"
              >
                <CountrySmallCard country={country} />
              </motion.div>
            ))}

            {/* EXPLORE MORE */}

            {!showAll && remainingCountries.length > 0 && (
              <motion.button
                type="button"
                initial={{
                  opacity: 0,
                  y: 20,
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
                  delay: 0.25,
                }}
                onClick={() => setShowAll(true)}
                className="group flex min-h-[100px] items-center justify-center gap-4 text-left"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2095AE]/30 transition-all duration-500 group-hover:bg-[#2095AE] group-hover:shadow-[0_10px_30px_rgba(32,149,174,0.18)]">
                  <ArrowDownwardRounded
                    sx={{ fontSize: 18 }}
                    className="text-[#2095AE] transition-all duration-500 group-hover:text-white group-hover:translate-y-0.5"
                  />
                </span>

                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#111827]/50 transition-colors duration-300 group-hover:text-[#2095AE]">
                    Explore more
                  </span>

                  <span className="mt-1 block text-xs text-[#111827]/35">
                    {remainingCountries.length} more destinations
                  </span>
                </span>
              </motion.button>
            )}
          </div>
        </div>

        {/* ================= ALL COUNTRIES ================= */}

        <AnimatePresence initial={false}>
          {showAll && remainingCountries.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <div className="mt-16">
                {/* Header */}

                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.24em] text-[#2095AE]">
                      More to explore
                    </span>

                    <h3 className="text-2xl font-medium tracking-[-0.04em] text-[#111827] sm:text-3xl">
                      Find your next destination.
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAll(false)}
                    className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#111827]/40 transition-colors duration-300 hover:text-[#2095AE]"
                  >
                    Show less
                  </button>
                </div>

                {/* Countries */}

                <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {remainingCountries.map((country, index) => (
                    <motion.div
                      key={country._id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(index * 0.04, 0.35),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="min-w-0"
                    >
                      <CountrySmallCard country={country} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= FOOTER STATEMENT ================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-16 flex flex-col gap-4 border-t border-[#111827]/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#111827]/30">
            Go-Venture
          </span>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2095AE]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2095AE]">
              Wherever you&apos;re going, we&apos;ll take you there
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountryPage;