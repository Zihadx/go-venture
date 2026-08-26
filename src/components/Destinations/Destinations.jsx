"use client";

import Link from "next/link";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { motion } from "framer-motion";

import DestinationsBigCard from "../ui/Destinations/DestinationsBigCard";
import DestinationsSmallCard from "../ui/Destinations/DestinationsSmallCard";

const DestinationsPage = ({ destinations }) => {
  const destinationList = Array.isArray(destinations?.data)
    ? destinations.data
    : [];

  if (!destinationList.length) return null;

  const featuredDestination = destinationList[0];
  const collectionDestinations = destinationList.slice(1, 4);

  return (
    <section className="relative overflow-hidden bg-[#F7F8F6] py-24 sm:py-28 lg:py-36">
      {/* Subtle atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.035] blur-[120px]" />
        <div className="absolute -left-48 bottom-0 h-[400px] w-[400px] rounded-full bg-[#2095AE]/[0.025] blur-[120px]" />
      </div>

      <div className="custom-container relative z-10 text-center w-full">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className=""
        >
          <span className="h-px w-10 bg-[#2095AE]" />
          <span className="mb-5 block font-serif text-lg italic text-[#2095AE]">
            
            Discover somewhere different.
          </span>

          <h1 className="text-[clamp(3rem,6.5vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em] text-[#111827]">
            Go where the
            <br />
            <span className="text-[#111827]/25">extraordinary</span>{" "}
            <span className="font-serif italic text-[#2095AE]">
              begins.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-sm leading-[1.9] text-[#111827]/50 sm:text-base">
            Explore destinations selected for more than their beauty.
            Discover places filled with character, culture, adventure,
            and stories worth carrying home.
          </p>
        </motion.div>

        {/* Featured destination */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 lg:mt-24"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#111827]/35">
              Featured destination
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#2095AE]">
              {destinationList.length} destinations
            </span>
          </div>

          <DestinationsBigCard destination={featuredDestination} />
        </motion.div>

        {/* Collection */}
        <div className="mt-24 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2095AE]">
                The collection
              </span>

              <h2 className="text-3xl font-medium tracking-[-0.045em] text-[#111827] sm:text-4xl lg:text-5xl">
                Places worth
                <br className="hidden sm:block" /> disappearing into.
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-7 text-[#111827]/40">
              Carefully selected escapes for travelers who want something
              beyond the usual route.
            </p>
          </motion.div>

          {/* Destination grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {collectionDestinations.map((destination, index) => (
              <motion.div
                key={destination._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <DestinationsSmallCard
                  destination={destination}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex justify-center"
        >
          <Link
            href="/all-destinations"
            className="group inline-flex items-center gap-5"
          >
            <span className="text-sm font-semibold text-[#111827] transition-colors duration-300 group-hover:text-[#2095AE]">
              Explore all{" "}
              <span className="text-[#2095AE]">
                {destinationList.length}+
              </span>{" "}
              destinations
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111827]/15 transition-all duration-300 group-hover:border-[#2095AE] group-hover:bg-[#2095AE]">
              <ArrowForwardRounded
                sx={{ fontSize: 17 }}
                className="text-[#111827] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationsPage;