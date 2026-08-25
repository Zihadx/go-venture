"use client";

import { useState } from "react";
import CountyBigCard from "@/components/ui/CardDesign/CountryCard/CountyBigCard";
import CountrySmallCard from "../ui/CardDesign/CountryCard/CountrySmallCard";
import CountryButton from "./countryButton";

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
    <section className="mt-20 md:mt-28 lg:mt-32">
      <div className="custom-container">

        {/* =========================
            SECTION INTRO
        ========================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary/40" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
              Explore the world
            </span>

            <span className="h-px w-8 bg-primary/40" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Global Escapes
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 md:text-base md:leading-7">
            Explore unforgettable destinations around the world.
            Discover iconic places, hidden gems, and experiences
            waiting to become your next adventure.
          </p>

        </div>

        {/* =========================
            FEATURED DESTINATIONS
        ========================== */}

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-5">

          {/* Featured */}

          <div className="min-w-0 lg:col-span-2">
            <CountyBigCard country={featuredCountry} />
          </div>

          {/* Small cards */}

          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3">

            {smallCountries.map((country) => (
              <div
                key={country._id}
                className="min-w-0"
              >
                <CountrySmallCard country={country} />
              </div>
            ))}

            {/* Explore more */}

            {!showAll && remainingCountries.length > 0 && (
              <div className="">
                
                <div className="text-center">

                  

                  <div className="mt-4">
                    <CountryButton
                      showAll={showAll}
                      setShowAll={setShowAll}
                    />
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>

        {/* =========================
            ALL COUNTRIES
        ========================== */}

        {showAll && remainingCountries.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {remainingCountries.map((country) => (
              <div
                key={country._id}
                className="min-w-0"
              >
                <CountrySmallCard country={country} />
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default CountryPage;