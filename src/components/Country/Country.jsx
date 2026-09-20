"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";

import AtlasGlobe from "./AtlasGlobe";
import { fmtCoord, hueOf, normalizeCountry } from "@/libs/atlasCountries.js";

/* -------------------------------------------------------------------------- */
/*  "The Atlas" — one dark globe on a light page.                             */
/*  Pick a country in the index (or click a pin, or just watch the tour) and  */
/*  the globe flies there, lights up the surrounding land and shows its card. */
/*  Tailwind for all styling, framer-motion only for responses to a click.    */
/* -------------------------------------------------------------------------- */

const TOUR_MS = 5600;
const EASE = [0.22, 1, 0.36, 1];

/** Where "Explore …" links to. Pass `getHref` to CountryPage to match your routes. */
const defaultHref = (c) => `/countries/${c.slug}`;

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/** Country photo, or a teal-family gradient with the initial when there's no image. */
function Cover({ country, className = "" }) {
  if (country.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={country.image}
        alt=""
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  const h = 170 + (hueOf(country.name) % 50);
  return (
    <span
      className={`grid h-full w-full place-items-center text-lg font-semibold text-white/85 ${className}`}
      style={{ background: `linear-gradient(135deg, hsl(${h} 55% 34%), hsl(${h + 24} 65% 16%))` }}
    >
      {country.name.charAt(0)}
    </span>
  );
}

const CountryPage = ({ countries, getHref = defaultHref }) => {
  const list = useMemo(
    () => (Array.isArray(countries?.data) ? countries.data.map(normalizeCountry) : []),
    [countries]
  );

  const pins = useMemo(
    () =>
      list
        .filter((c) => c.coords)
        .map((c) => ({ id: c.id, name: c.name, lat: c.coords.lat, lon: c.coords.lon })),
    [list]
  );

  const [selectedId, setSelectedId] = useState(null);
  const [touring, setTouring] = useState(true); // the globe tours on its own until someone touches it
  const [inView, setInView] = useState(false);
  const [query, setQuery] = useState("");

  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef(new Map());

  const active = list.find((c) => c.id === selectedId) ?? list.find((c) => c.coords) ?? list[0] ?? null;
  const activeId = active?.id ?? null;
  const activeIndex = active ? list.indexOf(active) : 0;

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () => (q ? list.filter((c) => c.name.toLowerCase().includes(q)) : list),
    [list, q]
  );

  const choose = useCallback((id) => {
    setTouring(false);
    setSelectedId(id);
  }, []);

  const stopTour = useCallback(() => setTouring(false), []);

  /* only tour while the section is on screen */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* the tour: next country with a place on the globe */
  useEffect(() => {
    if (!touring || !inView || pins.length < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setTimeout(() => {
      const i = pins.findIndex((p) => p.id === activeId);
      setSelectedId(pins[(i + 1) % pins.length].id);
    }, TOUR_MS);
    return () => clearTimeout(id);
  }, [touring, inView, activeId, pins]);

  /* keep the active row centred in the index — scrolls the list only, never the page */
  useEffect(() => {
    const box = listRef.current;
    const el = itemRefs.current.get(activeId);
    if (!box || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo({
      top: el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2,
      left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeId]);

  const onListKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const i = visible.findIndex((c) => c.id === activeId);
    const j =
      e.key === "Home" ? 0 : e.key === "End" ? visible.length - 1 : clamp(i + step, 0, visible.length - 1);
    const next = visible[j];
    if (!next) return;
    choose(next.id);
    itemRefs.current.get(next.id)?.querySelector("button")?.focus({ preventScroll: true });
  };

  if (!active) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="atlas-title"
      className="relative overflow-hidden bg-[#F7F8F6] py-24 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.05] blur-[130px]" />
        <div className="absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.035] blur-[130px]" />
      </div>

      <div className="custom-container relative z-10">
        {/* ------------------------------ header ------------------------------ */}
        <header className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-end">
          <h2
            id="atlas-title"
            className="text-[clamp(2.6rem,5.6vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.055em] text-[#111827]"
          >
            Spin the globe.
            <br />
            Pick where you land.
          </h2>

          <p className="max-w-md text-[15px] leading-7 text-[#111827]/55 lg:justify-self-end">
            From iconic landscapes to places that rarely make the ordinary itinerary. Drag the globe,
            click a pin, or choose a country from the list.
          </p>
        </header>

        {/* ------------------------------- atlas ------------------------------ */}
        <div className="mt-12 overflow-hidden rounded-[2rem] bg-[#04131a] text-white shadow-[0_50px_120px_-40px_rgba(4,19,26,0.55)] ring-1 ring-black/5 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_23rem] lg:rounded-[2.5rem]">
          {/* stage */}
          <div className="relative lg:min-h-[42rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(40rem_28rem_at_70%_8%,rgba(32,149,174,0.24),transparent_60%),radial-gradient(28rem_20rem_at_0%_100%,rgba(255,176,32,0.09),transparent_60%)]"
            />

            <div className="relative h-[26rem] sm:h-[30rem] lg:absolute lg:inset-0 lg:h-auto">
              <AtlasGlobe pins={pins} selectedId={activeId} onSelect={setSelectedId} onInteract={stopTour} />

              {/* the country name is the headline of the stage */}
              <div className="pointer-events-none absolute left-5 top-5 max-w-[72%] sm:left-7 sm:top-7 lg:left-8 lg:top-8 lg:max-w-[46%]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h3 className="text-[clamp(2.4rem,5.2vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-shadow:0_2px_30px_rgba(4,19,26,0.8)]">
                      {active.name}
                    </h3>
                    <p className="mt-3 text-sm tabular-nums text-white/50">
                      {active.coords ? fmtCoord(active.coords) : "Not on the globe yet"}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                aria-hidden="true"
                className={`pointer-events-none absolute right-6 top-7 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs text-white/60 backdrop-blur-md transition-opacity duration-700 sm:flex ${
                  touring ? "opacity-100" : "opacity-0"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 7l-4 5 4 5M16 7l4 5-4 5M4 12h16" />
                </svg>
                Drag to spin
              </div>
            </div>

            {/* destination card */}
            <div className="relative p-4 pt-0 sm:p-5 sm:pt-0 lg:absolute lg:bottom-6 lg:left-6 lg:w-[21.5rem] lg:p-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-2.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[1.15rem] bg-white/10">
                    <Cover country={active} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,19,26,0.6),transparent_55%)]" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#04131a]/60 px-2.5 py-1 text-xs text-white/85 backdrop-blur-md">
                      {activeIndex + 1} of {list.length}
                    </span>
                    {active.count && (
                      <span className="absolute right-3 top-3 rounded-full bg-[#ffb020] px-2.5 py-1 text-xs font-semibold text-[#04131a]">
                        {active.count.n} {active.count.label}
                      </span>
                    )}
                  </div>

                  <div className="px-2 pb-1 pt-3.5">
                    {active.blurb && (
                      <p className="mb-3 text-[13px] leading-relaxed text-white/60 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] overflow-hidden">
                        {active.blurb}
                      </p>
                    )}

                    <Link
                      href={getHref(active)}
                      className="group flex items-center justify-between gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-[#04131a] transition-colors duration-300 hover:bg-[#2095AE] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38b9d4]"
                    >
                      <span className="truncate">Explore {active.name}</span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#04131a] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowForwardRounded sx={{ fontSize: 17 }} />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          {/* index: a vertical list on desktop, a swipeable strip on phones */}
          <aside className="relative border-t border-white/10 bg-white/[0.03] lg:border-l lg:border-t-0">
            <div className="flex flex-col lg:absolute lg:inset-0">
              <div className="hidden shrink-0 px-5 pb-3 pt-6 lg:block">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium tracking-tight">All countries</h3>
                  <span className="text-sm tabular-nums text-white/40">
                    {q ? `${visible.length} of ${list.length}` : list.length}
                  </span>
                </div>

                {list.length > 8 && (
                  <label className="relative mt-4 block">
                    <span className="sr-only">Search countries</span>
                    <SearchRounded
                      sx={{ fontSize: 18 }}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
                    />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        stopTour();
                      }}
                      placeholder="Search countries"
                      className="w-full rounded-full border border-white/10 bg-white/[0.05] py-2.5 pl-10 pr-10 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#38b9d4]/60"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <CloseRounded sx={{ fontSize: 16 }} />
                      </button>
                    )}
                  </label>
                )}
              </div>

              <ul
                ref={listRef}
                onKeyDown={onListKey}
                aria-label="Countries"
                className="relative flex snap-x gap-2 overflow-x-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:min-h-0 lg:flex-1 lg:snap-none lg:flex-col lg:gap-1 lg:overflow-x-hidden lg:overflow-y-auto lg:px-3 lg:pb-6 lg:pt-1 lg:[mask-image:linear-gradient(to_bottom,transparent,black_14px,black_calc(100%-32px),transparent)]"
              >
                {visible.map((c) => {
                  const on = c.id === activeId;
                  return (
                    <li
                      key={c.id}
                      ref={(el) => {
                        if (el) itemRefs.current.set(c.id, el);
                        else itemRefs.current.delete(c.id);
                      }}
                      className="w-[12.5rem] shrink-0 snap-start lg:w-auto"
                    >
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => choose(c.id)}
                        className="group relative flex w-full items-center gap-3 rounded-2xl p-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#38b9d4]"
                      >
                        {on && (
                          <motion.span
                            layoutId="atlas-active"
                            transition={{ type: "spring", stiffness: 420, damping: 38 }}
                            className="absolute inset-0 rounded-2xl bg-white/[0.09] ring-1 ring-white/10"
                          />
                        )}

                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white/10">
                          <Cover country={c} />
                        </span>

                        <span className="relative min-w-0 flex-1">
                          <span
                            className={`block truncate text-[15px] font-medium transition-colors ${
                              on ? "text-white" : "text-white/75 group-hover:text-white"
                            }`}
                          >
                            {c.name}
                          </span>
                          <span className="block truncate text-xs tabular-nums text-white/40">
                            {c.count
                              ? `${c.count.n} ${c.count.label}`
                              : c.coords
                                ? fmtCoord(c.coords)
                                : "Coming soon"}
                          </span>
                        </span>

                        <span
                          className={`relative h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                            on ? "bg-[#ffb020]" : "bg-transparent group-hover:bg-white/30"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}

                {visible.length === 0 && (
                  <li className="p-4 text-sm text-white/50">
                    No country matches &ldquo;{query}&rdquo;.{" "}
                    <button type="button" onClick={() => setQuery("")} className="underline underline-offset-2 hover:text-white">
                      Clear search
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </div>

        <p className="mt-8 text-center text-sm text-[#111827]/40">
          Wherever you&apos;re going, we&apos;ll take you there.
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {active.name}
      </p>
    </section>
  );
};

export default CountryPage;