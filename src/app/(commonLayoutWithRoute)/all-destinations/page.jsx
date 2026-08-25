"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import DestinationsSmallCard from "@/components/ui/Destinations/DestinationsSmallCard";
import bannerImage from "@/assets/All-image/all-destinations-banner2.jpg";
import SearchBar from "@/components/SearchBar/SearchBar";
import DestinationFilter from "@/utils/AllDestinations/Filter";

const DEFAULT_FILTERS = {
  priceRange: [50, 10000],
  ratingRange: [0, 5],
  categories: [],
};

const AllDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // =========================================================
  // FETCH
  // =========================================================

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/destinations`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const data = await res.json();

        if (Array.isArray(data?.data)) {
          setDestinations(data.data);
          setFilteredDestinations(data.data);
        } else {
          console.error("Unexpected API response:", data);
          setDestinations([]);
          setFilteredDestinations([]);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setDestinations([]);
        setFilteredDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // =========================================================
  // FILTER
  // =========================================================

  const applyFilters = (newFilters) => {
  const {
    priceRange,
    ratingRange,
    categories,
  } = newFilters;

  const filtered = destinations.filter((destination) => {
    const price = Number(destination?.packagePrice) || 0;
    const rating = Number(destination?.ratingAverage) || 0;

    const withinPrice =
      price >= priceRange[0] &&
      price <= priceRange[1];

    const withinRating =
      rating >= ratingRange[0] &&
      rating <= ratingRange[1];

    const withinCategory =
      categories.length === 0 ||
      categories.includes(destination?.category);

    return (
      withinPrice &&
      withinRating &&
      withinCategory
    );
  });

  setFilteredDestinations(filtered);
};

const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
  applyFilters(newFilters);
};

  // =========================================================
  // STATS
  // =========================================================

  const stats = useMemo(() => {
    const ratings = destinations
      .map((destination) =>
        Number(destination?.ratingAverage)
      )
      .filter((rating) => rating > 0);

    const average =
      ratings.length > 0
        ? (
            ratings.reduce(
              (total, rating) => total + rating,
              0
            ) / ratings.length
          ).toFixed(1)
        : "0.0";

    return {
      total: destinations.length,
      visible: filteredDestinations.length,
      average,
    };
  }, [destinations, filteredDestinations]);

  // =========================================================
  // RESET
  // =========================================================

  const resetFilters = () => {
    const reset = {
      priceRange: [50, 10000],
      ratingRange: [0, 5],
      categories: [],
    };

    setFilters(reset);
    setFilteredDestinations(destinations);
  };

  const isFiltered =
    filters.priceRange[0] !== 50 ||
    filters.priceRange[1] !== 10000 ||
    filters.ratingRange[0] !== 0 ||
    filters.ratingRange[1] !== 5 ||
    filters.categories.length > 0;

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f7f7f5]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative h-[480px] overflow-hidden md:h-[540px]">

        <Image
          src={bannerImage}
          alt="Explore destinations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 flex h-full custom-container items-end -mt-32">

          <div className="max-w-3xl text-white">

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/65">
              Curated destinations
            </p>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Go beyond
              <span className="block font-light italic text-white/70">
                the ordinary.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              Explore extraordinary destinations, handpicked experiences,
              and journeys designed for travelers who want something more.
            </p>

          </div>

        </div>

      </section>



      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="custom-container 5 py-14 md:py-20 ">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Explore the collection
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">
              Find somewhere
              <span className="font-light italic text-gray-500">
                {" "}worth remembering.
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Browse our destinations and narrow your search to match
              exactly how you want to travel.
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm">
              <span className="font-semibold text-gray-900">
                {stats.visible}
              </span>
              <span className="ml-1 text-gray-500">
                destinations
              </span>
            </div>

            <div className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm sm:block">
              <span className="font-semibold text-gray-900">
                {stats.average}
              </span>
              <span className="ml-1 text-gray-500">
                avg. rating
              </span>
            </div>

          </div>

        </div>

        {/* Mobile filter button */}

        <button
          type="button"
          onClick={() =>
            setMobileFilterOpen((current) => !current)
          }
          className="mb-6 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-900 shadow-sm lg:hidden"
        >
          <span className="flex items-center gap-3">

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm">
              ☷
            </span>

            Filter destinations

          </span>

          <span className="text-gray-400">
            {mobileFilterOpen ? "−" : "+"}
          </span>

        </button>

        {/* =====================================================
            GRID
        ====================================================== */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">

          {/* FILTER */}

          <aside
            className={`
              ${
                mobileFilterOpen
                  ? "block"
                  : "hidden"
              }
              lg:block
            `}
          >

            <div className="lg:sticky lg:top-24">

              <DestinationFilter
                destinations={destinations}
                onFilterChange={handleFilterChange}
              />

            </div>

          </aside>

          {/* DESTINATIONS */}

          <div className="min-w-0">

            {/* Toolbar */}

            <div className="mb-6 flex items-center justify-between">

              <p className="text-sm text-gray-500">

                Showing{" "}

                <span className="font-semibold text-gray-900">
                  {stats.visible}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-gray-900">
                  {stats.total}
                </span>

              </p>

              {isFiltered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-gray-500 transition hover:text-gray-950"
                >
                  Clear filters
                </button>
              )}

            </div>

            {/* Loading */}

            {loading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl bg-white"
                  >

                    <div className="h-64 animate-pulse bg-gray-200" />

                    <div className="space-y-4 p-5">

                      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

                      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

                    </div>

                  </div>
                ))}

              </div>
            )}

            {/* Results */}

            {!loading &&
              filteredDestinations.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                  {filteredDestinations.map(
                    (destination) => (
                      <DestinationsSmallCard
                        key={destination?._id}
                        destination={destination}
                      />
                    )
                  )}

                </div>
              )}

            {/* Empty */}

            {!loading &&
              filteredDestinations.length === 0 && (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center">

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
                    ✦
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    No destinations found
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Try adjusting your filters to discover more
                    destinations.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary"
                  >
                    Reset filters
                  </button>

                </div>
              )}

          </div>

        </div>

      </section>

    </main>
  );
};

export default AllDestinationsPage;