"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDownwardRounded,
  ArrowForwardRounded,
  FilterAltOutlined,
  PublicOutlined,
  StarRounded,
  TuneRounded,
} from "@mui/icons-material";

import DestinationsSmallCard from "@/components/ui/Destinations/DestinationsSmallCard";
import bannerImage from "@/assets/All-image/all-destinations-banner2.jpg";
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

  /* =========================================================
     FETCH DESTINATIONS
  ========================================================= */

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

  /* =========================================================
     FILTER
  ========================================================= */

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

  /* =========================================================
     STATS
  ========================================================= */

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

  /* =========================================================
     RESET
  ========================================================= */

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

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#151515]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[620px] overflow-hidden md:min-h-[700px]">

        <Image
          src={bannerImage}
          alt="Explore destinations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematic overlays */}

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

        {/* Hero content */}

        <div className="relative z-10 flex min-h-[620px] items-end md:min-h-[700px]">

          <div className="custom-container w-full pb-20 md:pb-24">

            <div className="max-w-4xl text-white">

              {/* Eyebrow */}

              <div className="mb-7 flex items-center gap-4">

                <span className="h-px w-12 bg-white/70" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/70">
                  The world is waiting
                </span>

              </div>

              {/* Heading */}

              <h1 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[88px]">

                Go beyond

                <span className="block font-light italic text-white/65">
                  the ordinary.
                </span>

              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Discover places that stay with you long after
                the journey ends. Curated destinations,
                remarkable experiences, and unforgettable
                moments around the world.
              </p>

              {/* Hero metadata */}

              <div className="mt-10 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-xl">

                  <PublicOutlined
                    sx={{
                      fontSize: 17,
                      color: "#fff",
                    }}
                  />

                  <span className="text-xs font-medium text-white">
                    {stats.total || "0"} destinations
                  </span>

                </div>

                <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-xl">

                  <StarRounded
                    sx={{
                      fontSize: 17,
                      color: "#f59e0b",
                    }}
                  />

                  <span className="text-xs font-medium text-white">
                    {stats.average} average rating
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Scroll indicator */}

        <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-4 text-white/50 md:flex lg:right-14">

          <span className="text-[9px] uppercase tracking-[0.3em]">
            Explore
          </span>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
            <ArrowDownwardRounded
              sx={{
                fontSize: 16,
              }}
            />
          </div>

        </div>

      </section>

      {/* =====================================================
          INTRO / STATS
      ===================================================== */}

      <section className="custom-container relative z-20 -mt-10">

        <div className="grid overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)] md:grid-cols-3">

          {/* Stat */}

          <div className="flex items-center gap-5 border-b border-black/[0.06] p-7 md:border-b-0 md:border-r md:p-9">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#116A7F]/10 text-[#116A7F]">

              <PublicOutlined sx={{ fontSize: 21 }} />

            </div>

            <div>

              <p className="text-2xl font-semibold tracking-tight">
                {stats.visible}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Destinations available
              </p>

            </div>

          </div>

          {/* Stat */}

          <div className="flex items-center gap-5 border-b border-black/[0.06] p-7 md:border-b-0 md:border-r md:p-9">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">

              <StarRounded sx={{ fontSize: 21 }} />

            </div>

            <div>

              <p className="text-2xl font-semibold tracking-tight">
                {stats.average}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Average traveler rating
              </p>

            </div>

          </div>

          {/* Stat */}

          <div className="flex items-center justify-between p-7 md:p-9">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                Travel differently
              </p>

              <p className="mt-2 max-w-[190px] text-sm font-medium leading-6 text-gray-800">
                Find a journey that feels uniquely yours.
              </p>

            </div>

            <ArrowForwardRounded
              sx={{
                color: "#116A7F",
                fontSize: 24,
              }}
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN COLLECTION
      ===================================================== */}

      <section className="custom-container py-20 md:py-28">

        {/* Section heading */}

        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div className="max-w-2xl">

            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-8 bg-[#116A7F]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#116A7F]">
                Curated collection
              </span>

            </div>

            <h2 className="text-4xl font-medium leading-[1] tracking-[-0.04em] text-gray-950 md:text-5xl">

              Somewhere worth

              <span className="block font-light italic text-gray-400">
                remembering.
              </span>

            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-500">
              From hidden escapes to iconic cities, explore
              destinations selected for travelers who want
              more than a typical holiday.
            </p>

          </div>

          {/* Result count */}

          <div className="flex shrink-0 items-center gap-4">

            <div className="text-right">

              <p className="text-3xl font-medium tracking-tight">
                {stats.visible}
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                Showing
              </p>

            </div>

            <div className="h-10 w-px bg-gray-200" />

            <div>

              <p className="text-3xl font-medium tracking-tight text-gray-300">
                {stats.total}
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                Total
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            MOBILE FILTER
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setMobileFilterOpen((current) => !current)
          }
          className="mb-7 flex w-full items-center justify-between rounded-2xl border border-black/[0.07] bg-white px-5 py-4 shadow-sm transition hover:border-[#116A7F]/30 lg:hidden"
        >

          <span className="flex items-center gap-3">

            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#116A7F]/10 text-[#116A7F]">

              <TuneRounded sx={{ fontSize: 18 }} />

            </span>

            <span className="text-sm font-semibold">
              Filter destinations
            </span>

          </span>

          <span className="text-xs font-medium text-gray-400">
            {mobileFilterOpen
              ? "Close"
              : "Customize"}
          </span>

        </button>

        {/* =================================================
            FILTER + RESULTS
        ================================================= */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">

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

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <FilterAltOutlined
                    sx={{
                      fontSize: 18,
                      color: "#116A7F",
                    }}
                  />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Refine
                  </span>

                </div>

                {isFiltered && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 transition hover:text-[#116A7F]"
                  >
                    Reset
                  </button>
                )}

              </div>

              <DestinationFilter
                destinations={destinations}
                onFilterChange={handleFilterChange}
              />

            </div>

          </aside>

          {/* DESTINATION RESULTS */}

          <div className="min-w-0">

            {/* Toolbar */}

            <div className="mb-7 flex items-center justify-between border-b border-black/[0.07] pb-5">

              <div>

                <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                  Destination collection
                </p>

                <p className="mt-1 text-sm text-gray-500">

                  Showing{" "}

                  <span className="font-semibold text-gray-900">
                    {stats.visible}
                  </span>

                  {" "}of{" "}

                  <span className="font-semibold text-gray-900">
                    {stats.total}
                  </span>

                </p>

              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-[#116A7F] hover:text-[#116A7F] sm:flex"
                >
                  Clear filters
                </button>
              )}

            </div>

            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-[22px] border border-black/[0.04] bg-white"
                  >

                    <div className="h-[300px] animate-pulse bg-gray-200" />

                    <div className="space-y-4 p-5">

                      <div className="h-2.5 w-20 animate-pulse rounded-full bg-gray-200" />

                      <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                      <div className="h-3 w-full animate-pulse rounded bg-gray-200" />

                      <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />

                    </div>

                  </div>
                ))}

              </div>
            )}

            {/* =================================================
                RESULTS
            ================================================= */}

            {!loading &&
              filteredDestinations.length > 0 && (
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">

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

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!loading &&
              filteredDestinations.length === 0 && (
                <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[28px] border border-dashed border-gray-300 bg-white px-6 text-center">

                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#116A7F]/10 text-[#116A7F]">

                    <PublicOutlined
                      sx={{
                        fontSize: 27,
                      }}
                    />

                  </div>

                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                    Nothing matched
                  </p>

                  <h3 className="text-2xl font-medium tracking-tight text-gray-900">
                    No destinations found
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
                    Your current preferences didn&apos;t return
                    any destinations. Try widening your filters
                    and discover somewhere new.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#116A7F] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-[#116A7F]/20 transition duration-300 hover:bg-[#0D5667]"
                  >
                    Reset filters

                    <ArrowForwardRounded
                      sx={{
                        fontSize: 16,
                      }}
                    />

                  </button>

                </div>
              )}

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM EDITORIAL CTA
      ===================================================== */}

      {!loading && destinations.length > 0 && (
        <section className="custom-container pb-20 md:pb-28">

          <div className="relative overflow-hidden rounded-[32px] bg-[#102f38] px-7 py-14 text-white md:px-14 md:py-20">

            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />

            <div className="absolute -right-5 -top-16 h-56 w-56 rounded-full border border-white/10" />

            <div className="relative z-10 max-w-2xl">

              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                Your next chapter
              </p>

              <h2 className="text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">

                Don&apos;t just visit.

                <span className="block font-light italic text-white/50">
                  Experience.
                </span>

              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/55">
                The best journeys aren&apos;t measured in miles.
                They&apos;re measured in the moments you&apos;ll remember.
              </p>

            </div>

          </div>

        </section>
      )}

    </main>
  );
};

export default AllDestinationsPage;