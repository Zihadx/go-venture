"use client"
import CountryButton from "./CountryButton";

import CountyBigCard from "@/components/ui/CardDesign/CountyBigCard";
import CountrySmallCard from "@/components/ui/CardDesign/CountrySmallCard";
import { useState } from "react";

const CountryPage = ({ countries }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="my-16 custom-container">
      {/* Content */}
      <div className="w-full md:w-1/2 text-center mx-auto space-y-4">
        <h1 className="text-4xl font-semibold">Global Escapes</h1>
        <p>
          Explore top destinations worldwide with Go-Venture&apos;s curated
          selection by country. From iconic landmarks to hidden gems, find your
          next adventure here.
        </p>
      </div>

      {/* Country cards */}
      <div className="md:flex justify-between gap-6 mt-10">
        {/* Big card */}
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          {countries.data.slice(0, 1).map((country) => (
            <CountyBigCard key={country._id} country={country} />
          ))}
        </div>

        {/* Small cards */}
        <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First three small cards */}
          {countries.data.slice(1, showAll ? 5 : 4).map((country, index) => (
            <CountrySmallCard key={country._id} country={country} />
          ))}

          {/* "See more" button */}
          {!showAll && countries.data.length > 4 && (
            <div>
              <CountryButton showAll={showAll} setShowAll={setShowAll} />
            </div>
          )}
        </div>
      </div>

      {/* Show all countries */}
      {showAll && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {countries.data.slice(5).map((country) => (
            <CountrySmallCard key={country._id} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryPage;
