"use client";

import React, { useMemo, useState } from "react";
import { Checkbox, Slider } from "@mui/material";

const DEFAULT_PRICE = [50, 10000];
const DEFAULT_RATING = [0, 5];

const DestinationFilter = ({
  destinations = [],
  onFilterChange,
}) => {
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE);
  const [ratingRange, setRatingRange] = useState(DEFAULT_RATING);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // ---------------------------------------------------------
  // UNIQUE CATEGORIES
  // ---------------------------------------------------------

  const uniqueCategories = useMemo(() => {
    return [
      ...new Set(
        destinations
          .map((destination) => destination?.category)
          .filter(Boolean)
      ),
    ];
  }, [destinations]);

  // ---------------------------------------------------------
  // SEND CURRENT FILTERS
  // ---------------------------------------------------------

  const emitFilters = (
    nextPrice = priceRange,
    nextRating = ratingRange,
    nextCategories = selectedCategories
  ) => {
    if (typeof onFilterChange !== "function") return;

    onFilterChange({
      priceRange: nextPrice,
      ratingRange: nextRating,
      categories: nextCategories,
    });
  };

  // ---------------------------------------------------------
  // PRICE
  // ---------------------------------------------------------

  const handlePriceChange = (_, newValue) => {
    const nextPrice = [
      Number(newValue[0]),
      Number(newValue[1]),
    ];

    setPriceRange(nextPrice);

    emitFilters(
      nextPrice,
      ratingRange,
      selectedCategories
    );
  };

  // ---------------------------------------------------------
  // RATING
  // ---------------------------------------------------------

  const handleRatingChange = (_, newValue) => {
    const nextRating = [
      Number(newValue[0]),
      Number(newValue[1]),
    ];

    setRatingRange(nextRating);

    emitFilters(
      priceRange,
      nextRating,
      selectedCategories
    );
  };

  // ---------------------------------------------------------
  // CATEGORY
  // ---------------------------------------------------------

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    const nextCategories = selectedCategories.includes(
      category
    )
      ? selectedCategories.filter(
          (item) => item !== category
        )
      : [...selectedCategories, category];

    setSelectedCategories(nextCategories);

    emitFilters(
      priceRange,
      ratingRange,
      nextCategories
    );
  };

  // ---------------------------------------------------------
  // RESET
  // ---------------------------------------------------------

  const resetFilters = () => {
    setPriceRange(DEFAULT_PRICE);
    setRatingRange(DEFAULT_RATING);
    setSelectedCategories([]);

    emitFilters(
      DEFAULT_PRICE,
      DEFAULT_RATING,
      []
    );
  };

  // ---------------------------------------------------------
  // ACTIVE FILTERS
  // ---------------------------------------------------------

  const hasFilters =
    priceRange[0] !== DEFAULT_PRICE[0] ||
    priceRange[1] !== DEFAULT_PRICE[1] ||
    ratingRange[0] !== DEFAULT_RATING[0] ||
    ratingRange[1] !== DEFAULT_RATING[1] ||
    selectedCategories.length > 0;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-gray-100 px-5 py-5">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              Discover
            </p>

            <h3 className="mt-1 text-lg font-semibold tracking-tight text-gray-950">
              Refine your journey
            </h3>

          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="shrink-0 text-xs font-semibold text-gray-400 transition hover:text-gray-900"
            >
              Reset
            </button>
          )}

        </div>

        <p className="mt-2 text-xs leading-5 text-gray-400">
          Adjust your preferences to find destinations
          that fit your journey.
        </p>

      </div>

      {/* =====================================================
          PRICE
      ====================================================== */}

      <div className="border-b border-gray-100 px-5 py-6">

        <div className="mb-4 flex items-end justify-between gap-3">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              Budget
            </p>

            <h4 className="mt-1 text-sm font-semibold text-gray-900">
              Price per person
            </h4>

          </div>

          <span className="whitespace-nowrap text-xs font-semibold text-gray-900">
            ${priceRange[0].toLocaleString()}
            {" — "}
            ${priceRange[1].toLocaleString()}
          </span>

        </div>

        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          min={50}
          max={10000}
          step={50}
          valueLabelDisplay="auto"
          sx={{
            color: "#111827",
            height: 4,

            "& .MuiSlider-track": {
              border: "none",
            },

            "& .MuiSlider-rail": {
              backgroundColor: "#e5e7eb",
              opacity: 1,
            },

            "& .MuiSlider-thumb": {
              width: 18,
              height: 18,
              backgroundColor: "#fff",
              border: "2px solid #111827",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.12)",
            },

            "& .MuiSlider-valueLabel": {
              backgroundColor: "#111827",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 600,
            },
          }}
        />

        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>$50</span>
          <span>$10,000+</span>
        </div>

      </div>

      {/* =====================================================
          RATING
      ====================================================== */}

      <div className="border-b border-gray-100 px-5 py-6">

        <div className="mb-4 flex items-end justify-between gap-3">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              Quality
            </p>

            <h4 className="mt-1 text-sm font-semibold text-gray-900">
              Traveler rating
            </h4>

          </div>

          <span className="whitespace-nowrap text-xs font-semibold text-gray-900">
            {ratingRange[0].toFixed(1)}
            {" — "}
            {ratingRange[1].toFixed(1)}
          </span>

        </div>

        <Slider
          value={ratingRange}
          onChange={handleRatingChange}
          min={0}
          max={5}
          step={0.1}
          valueLabelDisplay="auto"
          sx={{
            color: "#111827",
            height: 4,

            "& .MuiSlider-track": {
              border: "none",
            },

            "& .MuiSlider-rail": {
              backgroundColor: "#e5e7eb",
              opacity: 1,
            },

            "& .MuiSlider-thumb": {
              width: 18,
              height: 18,
              backgroundColor: "#fff",
              border: "2px solid #111827",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.12)",
            },

            "& .MuiSlider-valueLabel": {
              backgroundColor: "#111827",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 600,
            },
          }}
        />

        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>0.0</span>
          <span>5.0</span>
        </div>

      </div>

      {/* =====================================================
          CATEGORY
      ====================================================== */}

      <div className="px-5 py-6">

        <div className="mb-4 flex items-end justify-between">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              Experience
            </p>

            <h4 className="mt-1 text-sm font-semibold text-gray-900">
              Travel style
            </h4>

          </div>

          {selectedCategories.length > 0 && (
            <span className="text-[10px] font-medium text-gray-400">
              {selectedCategories.length} selected
            </span>
          )}

        </div>

        <div className="space-y-1">

          {uniqueCategories.map((category) => {
            const checked =
              selectedCategories.includes(category);

            const count = destinations.filter(
              (destination) =>
                destination?.category === category
            ).length;

            return (
              <label
                key={category}
                className={`
                  flex cursor-pointer items-center justify-between
                  rounded-xl px-2 py-2 transition
                  ${
                    checked
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                  }
                `}
              >

                <div className="flex min-w-0 items-center">

                  <Checkbox
                    value={category}
                    checked={checked}
                    onChange={handleCategoryChange}
                    disableRipple
                    sx={{
                      padding: "4px",
                      marginRight: "6px",

                      color: "#d1d5db",

                      "&.Mui-checked": {
                        color: "#111827",
                      },
                    }}
                  />

                  <span
                    className={`
                      truncate text-sm
                      ${
                        checked
                          ? "font-semibold text-gray-900"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {category}
                  </span>

                </div>

                <span className="ml-3 text-[10px] text-gray-400">
                  {String(count).padStart(2, "0")}
                </span>

              </label>
            );
          })}

          {uniqueCategories.length === 0 && (
            <div className="rounded-xl bg-gray-50 px-4 py-5 text-center text-xs text-gray-400">
              No categories available.
            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] text-gray-400">
              Filters update instantly
            </span>

          </div>

          <span className="font-mono text-[9px] text-gray-300">
            FILTER
          </span>

        </div>

      </div>

    </div>
  );
};

export default DestinationFilter;