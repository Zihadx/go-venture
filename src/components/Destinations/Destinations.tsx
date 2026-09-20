"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import MapOutlined from "@mui/icons-material/MapOutlined";

import DestinationsAtlas, {
  type AtlasFocus,
} from "../ui/Destinations/DestinationsAtlas";

import DestinationsBigCard from "../ui/Destinations/DestinationsBigCard";
import DestinationsRail from "../ui/Destinations/DestinationsRail";
import DestinationsSmallCard from "../ui/Destinations/DestinationsSmallCard";

import type { DestinationsResponse } from "../ui/Destinations/types";

import { formatPrice, getCoordinates } from "../ui/Destinations/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ["Go where the", "extraordinary", "begins."];

interface Props {
  destinations?: DestinationsResponse | null;
}

const DestinationsPage = ({ destinations }: Props) => {
  const [focus, setFocus] = useState<AtlasFocus | null>(null);

  const requestFocus = useCallback((id: string) => {
    setFocus((previous) => ({
      id,
      nonce: (previous?.nonce ?? 0) + 1,
    }));
  }, []);

  const scrollToAtlas = useCallback(() => {
    document.getElementById("atlas")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const locate = useCallback(
    (id: string) => {
      requestFocus(id);
      scrollToAtlas();
    },
    [requestFocus, scrollToAtlas],
  );

  const destinationList = Array.isArray(destinations?.data)
    ? destinations.data
    : [];

  if (!destinationList.length) return null;

  const featuredDestination = destinationList[0];

  const collectionDestinations = destinationList.slice(1, 5);

  const hasMap = destinationList.some((item) => getCoordinates(item.locations));

  const count = destinationList.length;

  const countries = new Set(
    destinationList
      .map((item) => item.locations?.country?.countryId)
      .filter(Boolean),
  ).size;

  const prices = destinationList
    .map((item) => Number(item.packagePrice))
    .filter((price) => Number.isFinite(price) && price > 0);

  const summary =
    `${count} ${count === 1 ? "destination" : "destinations"}` +
    (countries
      ? ` in ${countries} ${countries === 1 ? "country" : "countries"}`
      : "") +
    (prices.length
      ? `, from ${formatPrice(Math.min(...prices))} per person`
      : "") +
    ".";

  const covers = destinationList
    .slice(0, 3)
    .map((item) => item.image?.[0])
    .filter((src): src is string => Boolean(src));

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-white py-20">
        <div
          className="
            relative isolate overflow-hidden
          
            bg-white
          
            text-[#111827]
      
            
          "
        >
          {/* ========================== ATMOSPHERE ========================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0 -z-10
              overflow-hidden
            "
          ></div>

          <div
            className="
              mx-auto
              w-full
              custom-container
            
            "
          >
            {/* ============================== HERO ============================== */}

            <header>
              <h1
                className="
                  max-w-[12ch]
                  font-serif
                  text-[clamp(3.25rem,9.2vw,6rem)]
                  font-normal
                  leading-[0.9]
                  tracking-[-0.055em]
                  text-[#111827]
                "
              >
                {HEADLINE.map((line, i) => (
                  <span
                    key={line}
                    className="
                        -mb-[0.04em]
                        block
                        overflow-hidden
                        pb-[0.1em]
                      "
                  >
                    <motion.span
                      initial={{
                        y: "110%",
                      }}
                      animate={{
                        y: 0,
                      }}
                      transition={{
                        duration: 1,
                        ease: EASE,
                        delay: 0.1 + i * 0.12,
                      }}
                      className="flex items-center"
                    >
                      {i === 1 ? (
                        <span className="text-[#111827]/30">{line}</span>
                      ) : i === 2 ? (
                        <span className="text-[#2095AE]">{line}</span>
                      ) : (
                        line
                      )}

                      {i === HEADLINE.length - 1 && covers.length > 0 && (
                        <span
                          aria-hidden="true"
                          className="
                                ml-[0.22em]
                                flex
                                -space-x-[0.3em]
                              "
                        >
                          {covers.map((src) => (
                            <span
                              key={src}
                              className="
                                      relative
                                      block
                                      h-[0.7em]
                                      w-[1em]
                                      overflow-hidden
                                      rounded-full
                                      border-[0.055em]
                                      border-white
                                      bg-[#EAF3F4]
                                      shadow-[0_8px_20px_rgba(17,24,39,0.12)]
                                    "
                            >
                              <Image
                                src={src}
                                alt=""
                                fill
                                sizes="160px"
                                className="object-cover"
                              />
                            </span>
                          ))}
                        </span>
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                  delay: 0.7,
                }}
                className="
                  mt-10
                  flex flex-col
                  gap-8
                  lg:mt-14
                  lg:flex-row
                  lg:items-end
                  lg:justify-between
                "
              >
                {/* Description */}

                <p
                  className="
                    max-w-md
                    text-[15px]
                    leading-7
                    text-[#111827]/50
                    sm:text-base
                    sm:leading-8
                  "
                >
                  Places chosen for their character, not just their views. Pick
                  a trip below, or discover your next escape on the map.
                </p>

                <div
                  className="
                    flex flex-col
                    gap-5
                    sm:flex-row
                    sm:items-center
                    sm:gap-8
                  "
                >
                  {/* Summary */}

                  <p
                    className="
                      text-xs
                      font-medium
                      tracking-[0.01em]
                      text-[#2095AE]
                      sm:text-sm
                    "
                  >
                    {summary}
                  </p>

                  {hasMap && (
                    <button
                      type="button"
                      onClick={scrollToAtlas}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2.5
                        self-start
                        rounded-full
                        bg-[#2095AE]
                        py-3.5
                        pl-5 pr-6
                        text-sm
                        font-medium
                        text-white
                        shadow-[0_10px_30px_rgba(32,149,174,0.16)]
                        transition-all
                        duration-300
                        hover:bg-[#187F94]
                        hover:shadow-[0_14px_35px_rgba(32,149,174,0.22)]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#2095AE]/40
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-white
                      "
                    >
                      <MapOutlined
                        sx={{
                          fontSize: 19,
                        }}
                      />

                      <span>See them on the map</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </header>

            {/* =========================== FEATURED =========================== */}

            <div
              className="
                mt-16
                sm:mt-20
                lg:mt-28
              "
            >
              <DestinationsBigCard
                destination={featuredDestination}
                onLocate={hasMap ? locate : undefined}
              />
            </div>

            {/* ========================== COLLECTION ========================== */}

            {/* ========================== COLLECTION ========================== */}

            {collectionDestinations.length > 0 && (
              <div className="mt-24 lg:mt-40">
                <div
                  className="
        mb-10
        flex flex-col
        gap-5
        sm:flex-row
        sm:items-end
        sm:justify-between
      "
                >
                  <div>
                    <span
                      className="
            mb-4
            block
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.24em]
            text-[#2095AE]
          "
                    >
                      More to discover
                    </span>

                    <h2
                      className="
            max-w-2xl
            font-serif
            text-[clamp(2.5rem,5.5vw,4.5rem)]
            leading-[0.96]
            tracking-[-0.045em]
            text-[#111827]
          "
                    >
                      Places worth
                      <br className="hidden sm:block" />
                      <span className="text-[#111827]/30">
                        disappearing into.
                      </span>
                    </h2>
                  </div>

                  <Link
                    href="/all-destinations"
                    className="
          group
          inline-flex
          items-center
          gap-4
          self-start
          text-sm
          font-medium
          text-[#111827]/75
          transition-colors
          duration-300
          hover:text-[#2095AE]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#2095AE]/40
          focus-visible:ring-offset-4
          focus-visible:ring-offset-white
          sm:self-auto
        "
                  >
                    <span>View all {count}</span>

                    <span
                      className="
            grid
            h-11 w-11
            place-items-center
            rounded-full
            border
            border-[#111827]/15
            text-[#111827]
            transition-all
            duration-300
            group-hover:border-[#2095AE]
            group-hover:bg-[#2095AE]
            group-hover:text-white
          "
                    >
                      <ArrowForwardRounded sx={{ fontSize: 19 }} />
                    </span>
                  </Link>
                </div>

                <DestinationsRail label="More destinations" autoPlayMs={5000}>
                  {collectionDestinations.map((destination) => (
                    <DestinationsSmallCard
                      key={destination._id}
                      destination={destination}
                    />
                  ))}
                </DestinationsRail>
              </div>
            )}

            {/* ============================== ATLAS ============================== */}

            {hasMap && (
              <div
                className="
                  mt-24
                  lg:mt-40
                "
              >
                <DestinationsAtlas
                  destinations={destinationList}
                  total={count}
                  focus={focus}
                  onFocus={requestFocus}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default DestinationsPage;
