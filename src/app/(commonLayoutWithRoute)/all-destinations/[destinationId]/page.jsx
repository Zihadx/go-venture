"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import DestinationsBookingForm from "@/utils/DestinationDetails/BookingForm";
import DestinationReviewsSection from "@/utils/DestinationDetails/DestinationReviews";
import FAQsection from "@/utils/DestinationDetails/FAQsection";

import {
  AlarmOnOutlined,
  CalendarMonthOutlined,
  LocationOnOutlined,
  MonetizationOnOutlined,
  Verified,
  ArrowDownwardRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";

/* ============================================================
   CONSTANTS
============================================================ */

const EASE = [0.22, 1, 0.36, 1];
const BRAND_COLOR = "#2095ae";
const PLACEHOLDER_IMAGE = "/placeholder.jpg";
const DEFAULT_DESCRIPTION =
  "Discover an unforgettable journey through remarkable places, unique experiences and unforgettable moments.";

const ICON_SX = { fontSize: 21, color: BRAND_COLOR };

const revealUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

/* ============================================================
   HELPERS
============================================================ */

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-CA") : "—";

/**
 * Grid layout classes per gallery size. Each array is indexed by
 * tile position; index 0 is always the "hero" tile of that layout.
 * Mobile (below `md`) always falls back to a single full-width
 * column via `col-span-12`, so every layout is responsive by default.
 */
const GALLERY_LAYOUTS = {
  1: ["col-span-12 h-[400px] md:h-[560px]"],

  2: [
    "col-span-12 h-[360px] md:h-[500px] lg:col-span-8",
    "col-span-12 h-[280px] md:h-[500px] lg:col-span-4",
  ],

  // 3 images: one full-width tile on top, two even tiles below it.
  3: [
    "col-span-12 h-[300px] md:h-[420px]",
    "col-span-6 h-[200px] md:h-[300px]",
    "col-span-6 h-[200px] md:h-[300px]",
  ],

  4: [
    "col-span-12 h-[360px] md:h-[500px] lg:col-span-8",
    "col-span-12 h-[280px] md:h-[500px] lg:col-span-4",
    "col-span-6 h-[230px] md:h-[300px] lg:col-span-4",
    "col-span-6 h-[230px] md:h-[300px] lg:col-span-8",
  ],
};

const getGalleryTileClass = (index, imageCount) => {
  const layout = GALLERY_LAYOUTS[imageCount] || GALLERY_LAYOUTS[4];
  return layout[index] ?? layout[layout.length - 1];
};

/**
 * `sizes` attribute per tile, matched to the corresponding layout
 * above so Next/Image doesn't over-fetch on smaller viewports.
 */
const getGallerySizes = (index, imageCount) => {
  if (imageCount === 1) return "100vw";

  if (imageCount === 3) {
    return index === 0 ? "100vw" : "(max-width: 767px) 100vw, 50vw";
  }

  // 2- and 4-image layouts share the same main/side split.
  return index === 0
    ? "(max-width: 1024px) 100vw, 66vw"
    : "(max-width: 1024px) 50vw, 33vw";
};

/* ============================================================
   DATA HOOK
============================================================ */

function useDestination(destinationId) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: false,
  });

  const fetchDestination = useCallback(async () => {
    if (!destinationId) return;

    setState((prev) => ({ ...prev, loading: true, error: false }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/destinations/${destinationId}`
      );

      if (!res.ok) throw new Error(`Failed to fetch destination (${res.status})`);

      const json = await res.json();
      setState({ data: json?.data ?? null, loading: false, error: false });
    } catch (err) {
      console.error("Destination fetch error:", err);
      setState({ data: null, loading: false, error: true });
    }
  }, [destinationId]);

  useEffect(() => {
    fetchDestination();
  }, [fetchDestination]);

  return state;
}

/* ============================================================
   SMALL PRESENTATIONAL PIECES
============================================================ */

function IconStat({ icon: Icon, label, value, suffix }) {
  return (
    <div className="px-4 py-7 md:px-7 md:py-8">
      <div className="flex items-center gap-3">
        <Icon sx={ICON_SX} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
          {label}
        </span>
      </div>

      <p className="mt-3 text-lg font-semibold text-[#111827]">
        {value}
        {suffix && (
          <span className="ml-1 text-xs font-normal text-gray-400">{suffix}</span>
        )}
      </p>
    </div>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-[#2095ae]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2095ae]">
        {children}
      </span>
    </div>
  );
}

function GalleryImage({ src, alt, index, imageCount }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] ${getGalleryTileClass(
        index,
        imageCount
      )}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={getGallerySizes(index, imageCount)}
        className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
      />
      {index === 0 && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <main className="min-h-screen bg-[#f7f8f6]">
      <section className="relative h-[620px] overflow-hidden bg-[#e8ebe8] md:h-[700px]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#e7e9e5] via-[#f0f1ee] to-[#dfe4e1]" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <div className="h-4 w-32 animate-pulse rounded-full bg-black/10" />
            <div className="mt-5 h-16 max-w-xl animate-pulse rounded-2xl bg-black/10" />
            <div className="mt-4 h-5 max-w-lg animate-pulse rounded-full bg-black/10" />
          </div>
        </div>
      </section>

      <div className="custom-container py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <div className="h-80 animate-pulse rounded-3xl bg-gray-200" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="h-24 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-[500px] animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

function ErrorState() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f8f6] px-6">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2095ae]">
          Destination
        </span>

        <h1 className="mt-4 text-4xl font-medium tracking-tight text-[#111827]">
          Destination unavailable
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500">
          We couldn&apos;t load this destination right now. Please try again
          later.
        </p>
      </div>
    </main>
  );
}

/* ============================================================
   PAGE
============================================================ */

const DestinationsDetailsPage = ({ params }) => {
  const { data: destinationData, loading, error } = useDestination(
    params?.destinationId
  );

  /* --- Derived, memoized data --------------------------------- */

  const derived = useMemo(() => {
    if (!destinationData) return null;

    const images = Array.isArray(destinationData.image)
      ? destinationData.image.filter(Boolean)
      : [];

    const attractions = Array.isArray(destinationData.attractions)
      ? destinationData.attractions
      : [];

    const location = destinationData.locations || {};
    const country =
      location?.country?.countryId || location?.country?.name || location?.country || "";
    const city = location?.city || "";

    return {
      images,
      attractions,
      city,
      country,
      startDate: formatDate(destinationData.startDate),
      endDate: formatDate(destinationData.endDate),
      description: destinationData.description || DEFAULT_DESCRIPTION,
      heroImage: destinationData.coverImage || images[0] || PLACEHOLDER_IMAGE,
    };
  }, [destinationData]);

  if (loading) return <LoadingState />;
  if (error || !destinationData || !derived) return <ErrorState />;

  const {
    images,
    attractions,
    city,
    country,
    startDate,
    endDate,
    description,
    heroImage,
  } = derived;

  const statItems = [
    {
      icon: AlarmOnOutlined,
      label: "Duration",
      value: destinationData.durationDays || "—",
      suffix: destinationData.durationDays ? "Days" : null,
    },
    {
      icon: MonetizationOnOutlined,
      label: "From",
      value: `$${destinationData.packagePrice || "—"}`,
      suffix: "/ person",
    },
    { icon: CalendarMonthOutlined, label: "Departure", value: startDate },
    { icon: CalendarMonthOutlined, label: "Return", value: endDate },
  ];

  return (
    <main className="overflow-hidden bg-[#f7f8f6] text-[#111827]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative h-[620px] overflow-hidden md:h-[700px] lg:h-[760px]">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={heroImage}
            alt={destinationData.title || "Destination"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="custom-container relative z-10 flex h-full items-end pb-20 md:pb-24 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealUp}
            className="max-w-4xl text-white"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#5bc0d5]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70">
                Destination experience
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[92px]">
              {destinationData.title}
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-md">
                <LocationOnOutlined sx={{ fontSize: 17 }} />
                <span className="text-xs font-semibold tracking-wide">
                  {city || "Explore"}
                </span>

                {country && (
                  <>
                    <span className="text-white/30">/</span>
                    <span className="text-xs text-white/65">{country}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-7 right-6 z-20 hidden items-center gap-3 text-white/60 md:flex lg:right-12"
        >
          <span className="text-[9px] uppercase tracking-[0.25em]">Explore</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
            <ArrowDownwardRounded sx={{ fontSize: 16 }} />
          </span>
        </motion.div>
      </section>

      {/* =====================================================
          QUICK DESTINATION META
      ====================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="border-b border-[#111827]/10 bg-white"
      >
        <div className="custom-container">
          <div className="grid grid-cols-2 divide-x divide-[#111827]/10 md:grid-cols-4">
            {statItems.map((item) => (
              <IconStat key={item.label} {...item} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="custom-container py-16 md:py-24 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          {/* LEFT CONTENT */}
          <div>
            {/* Gallery */}
            {images.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={revealUp}
                className="mb-20"
              >
                <div className="grid grid-cols-12 gap-3 md:gap-4">
                  {images.slice(0, 4).map((src, index) => (
                    <GalleryImage
                      key={src}
                      src={src}
                      alt={`${destinationData.title} — view ${index + 1}`}
                      index={index}
                      imageCount={images.length}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* DESTINATION INTRO */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={revealUp}
              className="mb-20"
            >
              <div className="mb-6">
                <SectionEyebrow>The journey</SectionEyebrow>
              </div>

              <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[#111827] md:text-5xl">
                A journey designed to be remembered.
              </h2>

              <div className="mt-8 max-w-3xl space-y-5 text-[15px] leading-8 text-[#111827]/60">
                <p>{description}</p>
                <p>
                  Discover the world through carefully selected experiences,
                  remarkable landscapes and authentic moments. Every part of
                  this journey has been considered to help you experience the
                  destination beyond the usual tourist trail.
                </p>
              </div>
            </motion.div>

            {/* LOCATION */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={revealUp}
              className="mb-20 border-y border-[#111827]/10 py-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2095ae]/10">
                    <LocationOnOutlined sx={ICON_SX} />
                  </div>

                  <div>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                      Destination
                    </span>
                    <p className="mt-1 text-sm font-semibold text-[#111827]">
                      {city}
                      {country ? `, ${country}` : ""}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-400">Curated by Go-Venture</span>
              </div>
            </motion.div>

            {/* ATTRACTIONS */}
            {attractions.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={revealUp}
                className="mb-20"
              >
                <div className="mb-8">
                  <SectionEyebrow>Highlights</SectionEyebrow>
                  <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.03em] md:text-5xl">
                    Places worth experiencing.
                  </h2>
                </div>

                <div className="grid gap-x-10 border-t border-[#111827]/10 md:grid-cols-2">
                  {attractions.map((attraction, index) => (
                    <div
                      key={`${attraction}-${index}`}
                      className="group flex items-center gap-4 border-b border-[#111827]/10 py-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2095ae]/10 transition-colors duration-300 group-hover:bg-[#2095ae]">
                        <Verified
                          sx={{ fontSize: 16, color: BRAND_COLOR }}
                          className="transition-colors duration-300 group-hover:!text-white"
                        />
                      </span>

                      <span className="text-sm font-medium text-[#111827]/70 transition-colors duration-300 group-hover:text-[#111827]">
                        {attraction}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* FAQ */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={revealUp}
              className="mb-20"
            >
              <div className="mb-8">
                <SectionEyebrow>Frequently asked</SectionEyebrow>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.03em] md:text-5xl">
                  Before you go.
                </h2>
              </div>

              <FAQsection />
            </motion.section>

            {/* REVIEWS */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={revealUp}
              className="border-t border-[#111827]/10 pt-12"
            >
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <SectionEyebrow>Traveler stories</SectionEyebrow>
                  <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.03em] md:text-5xl">
                    Customer experience.
                  </h2>
                </div>

                <span className="text-xs text-gray-400">
                  Experiences from our travelers
                </span>
              </div>

              <DestinationReviewsSection destinationData={destinationData} />
            </motion.section>
          </div>

          {/* BOOKING SIDEBAR */}
          <aside className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="overflow-hidden rounded-[28px] border border-[#111827]/10 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)]"
            >
              <div className="relative overflow-hidden bg-[#102f39] px-6 py-7 text-white md:px-7">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/10" />
                <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#2095ae]/20 blur-3xl" />

                <div className="relative">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#67c9dc]">
                    Plan your journey
                  </span>
                  <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.03em]">
                    Book your adventure.
                  </h2>
                  <p className="mt-3 text-xs leading-6 text-white/55">
                    Reserve your place and start planning an unforgettable
                    experience.
                  </p>
                </div>
              </div>

              <div className="border-b border-[#111827]/10 px-6 py-6 md:px-7">
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                  Package price
                </span>

                <div className="mt-2 flex items-end gap-2">
                  <span className="font-serif text-4xl font-medium tracking-tight text-[#111827]">
                    ${destinationData.packagePrice || "—"}
                  </span>
                  <span className="mb-1.5 text-xs text-gray-400">/ person</span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <CalendarMonthOutlined sx={{ fontSize: 16 }} />
                  <span>
                    {startDate} — {endDate}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <DestinationsBookingForm destinationData={destinationData} />
              </div>
            </motion.div>

            <div className="mt-5 flex items-start gap-3 px-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2095ae]/10">
                <Verified sx={{ fontSize: 16, color: BRAND_COLOR }} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#111827]">
                  Travel with confidence
                </p>
                <p className="mt-1 text-[11px] leading-5 text-gray-400">
                  Your journey is supported by the Go-Venture travel team.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="custom-container relative pb-20 md:pb-28">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/5" />
        <div className="pointer-events-none absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full bg-[#2095ae]/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-[32px] bg-[#102f38] px-7 py-14 text-white md:px-14 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#67c9dc]">
              Your next chapter
            </span>

            <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-6xl">
              The world is waiting.
              <br />
              <span className="italic text-[#67c9dc]">Go discover it.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
              From the first step to the final memory, make your next journey
              one worth telling stories about.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 text-sm font-semibold">
              <span>Start your journey</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                <ArrowForwardRounded sx={{ fontSize: 17 }} />
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default DestinationsDetailsPage;