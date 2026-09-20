"use client";

import { useRef, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import ContactSupportOutlined from "@mui/icons-material/ContactSupportOutlined";
import FamilyRestroomOutlined from "@mui/icons-material/FamilyRestroomOutlined";
import ShapeLineOutlined from "@mui/icons-material/ShapeLineOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";

import { FamilyDemo, ItineraryDemo, SupportDemo, TrustDemo } from "./ServiceDemos";

/* -------------------------------------------------------------------------- */
/*  "Show, don't tell": every service is a small working demo. Picking one    */
/*  moves the traveller along the journey rail and swaps the demo.            */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const JOURNEY = ["Imagine", "Plan", "Explore", "Discover", "Arrive"];

const services = [
  {
    id: "itineraries",
    icon: ShapeLineOutlined,
    title: "Personalized Itineraries",
    description:
      "Travel plans shaped around your interests, pace, preferences, and the way you want to experience a destination.",
    tag: "Tailored planning",
    stop: 1, // where this service sits on the journey rail
    Demo: ItineraryDemo,
  },
  {
    id: "family",
    icon: FamilyRestroomOutlined,
    title: "Family-Friendly Trips",
    description:
      "Thoughtfully planned journeys that make traveling together comfortable, engaging, and effortless.",
    tag: "Made for everyone",
    stop: 2,
    Demo: FamilyDemo,
  },
  {
    id: "support",
    icon: ContactSupportOutlined,
    title: "24/7 Travel Support",
    description:
      "From planning to arrival and everything in between, our team remains available whenever you need us.",
    tag: "Always available",
    stop: 3,
    Demo: SupportDemo,
  },
  {
    id: "trusted",
    icon: VerifiedOutlined,
    title: "Trusted Experiences",
    description:
      "Reliable planning, transparent service, and carefully selected experiences designed around peace of mind.",
    tag: "Travel with confidence",
    stop: 4,
    Demo: TrustDemo,
  },
];

const PLANE_D =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

/** The old "journey strip", now a live indicator: the plane rides to the stop of the chosen service. */
function JourneyRail({ stop }) {
  const last = JOURNEY.length - 1;
  const pct = (stop / last) * 100;
  const glide = "duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <div className="relative mx-7 h-[4.25rem] sm:mx-12" aria-hidden="true">
      <div className="absolute inset-x-0 top-[15px] border-t border-dashed border-[#111827]/20" />
      <div
        className={`absolute left-0 top-[14px] h-[2px] rounded-full bg-[#2095AE] transition-[width] ${glide}`}
        style={{ width: `${pct}%` }}
      />

      {JOURNEY.map((label, i) => (
        <div
          key={label}
          className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${(i / last) * 100}%` }}
        >
          <span
            className={`mt-[10px] block h-[11px] w-[11px] rounded-full border-2 transition-colors duration-500 ${
              i <= stop ? "border-[#2095AE] bg-[#2095AE]" : "border-[#111827]/25 bg-[#F7F8F5]"
            }`}
          />
          <span
            className={`mt-3 text-[12px] transition-colors duration-500 ${
              i === stop ? "font-medium text-[#111827]" : "text-[#111827]/40"
            }`}
          >
            {label}
          </span>
        </div>
      ))}

      <span
        className={`absolute top-0 -ml-[15px] grid h-[30px] w-[30px] place-items-center rounded-full bg-white text-[#ffb020] shadow-[0_0_0_1px_rgba(17,24,39,0.06),0_8px_20px_-6px_rgba(255,176,32,0.65)] transition-[left] ${glide}`}
        style={{ left: `${pct}%` }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d={PLANE_D} transform="rotate(90 12 12)" />
        </svg>
      </span>
    </div>
  );
}

const ServicesPage = () => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const tabRefs = useRef([]);

  const active = services[index];
  const { Demo } = active;

  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next = index;
    if (step) next = (index + step + services.length) % services.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = services.length - 1;
    else return;
    e.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-[#F7F8F5] py-24 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#2095AE]/[0.05] blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#ffb020]/[0.05] blur-[120px]" />
      </div>

      <div className="custom-container relative z-10">
        {/* ------------------------------ header ------------------------------ */}
        <header className="grid gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end">
          <h2
            id="services-title"
            className="text-[clamp(2.75rem,6vw,5.75rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#111827]"
          >
            Travel differently.
            <br />
            Experience everything.
          </h2>

          <p className="max-w-sm text-[15px] leading-7 text-[#111827]/60 lg:justify-self-end lg:pb-2">
            From the first conversation to the moment you return home, every detail is designed around
            comfort, confidence, and discovery. Pick a service and see how it works.
          </p>
        </header>

        {/* ------------------------------ workspace ---------------------------- */}
        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-12">
          {/* service tabs */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Our services"
            onKeyDown={onKeyDown}
            className="relative flex flex-col self-start"
          >
            {services.map((s, i) => {
              const on = i === index;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`service-tab-${s.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="service-panel"
                  aria-label={s.title}
                  aria-describedby={`service-desc-${s.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className="group relative py-5 pl-8 pr-2 text-left outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-[#2095AE]"
                >
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-[#111827]/10" />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-[-1px] w-[3px] origin-top rounded-full bg-[#2095AE] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      on ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <span className="flex items-center gap-4">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                        on ? "bg-[#2095AE] text-white" : "bg-[#2095AE]/[0.08] text-[#2095AE] group-hover:bg-[#2095AE]/15"
                      }`}
                    >
                      <Icon sx={{ fontSize: 19 }} />
                    </span>
                    <span
                      className={`text-[clamp(1.3rem,2vw,1.75rem)] font-medium leading-tight tracking-[-0.04em] transition-colors duration-500 ${
                        on ? "text-[#111827]" : "text-[#111827]/40 group-hover:text-[#111827]/70"
                      }`}
                    >
                      {s.title}
                    </span>
                  </span>

                  {/* height reveal with a plain CSS grid-rows transition */}
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="block min-h-0 overflow-hidden">
                      <span className="block pb-1 pl-14 pt-3">
                        <span id={`service-desc-${s.id}`} className="block max-w-sm text-[14.5px] leading-7 text-[#111827]/60">
                          {s.description}
                        </span>
                        <span className="mt-3 inline-block rounded-full bg-[#2095AE]/10 px-3 py-1 text-xs text-[#1a7f95]">
                          {s.tag}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* stage */}
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active.id}`}
            className="relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-[#111827]/[0.07] bg-[#F1F5F5] shadow-[0_40px_100px_-50px_rgba(17,24,39,0.3)] lg:min-h-[38rem] lg:rounded-[2.5rem]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(17,24,39,0.11)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_50%_40%,black_35%,transparent_85%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(34rem_22rem_at_85%_-10%,rgba(32,149,174,0.16),transparent_65%),radial-gradient(26rem_18rem_at_0%_105%,rgba(255,176,32,0.12),transparent_65%)]"
            />

            <div className="relative px-4 pt-7 sm:px-8 sm:pt-9">
              <JourneyRail stop={active.stop} />
            </div>

            <div className="relative flex min-w-0 flex-1 flex-col justify-center px-4 pb-6 pt-4 sm:px-8 sm:pb-9">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                className="w-full min-w-0"
              >
                <Demo />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;