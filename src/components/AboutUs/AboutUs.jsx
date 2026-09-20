"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import EastRounded from "@mui/icons-material/EastRounded";

import image1 from "@/assets/About-us/aboutUs1.jpg";
import image3 from "@/assets/About-us/aboutUs2.jpg";
import image2 from "@/assets/About-us/aboutUs3.jpg";
import image4 from "@/assets/About-us/aboutUs4.jpg";

import { InkFilter, Seal, Stamp } from "./AboutStamps";
import AboutUsAnimation from "@/utils/AboutUs/AboutUsAnimation";

/* -------------------------------------------------------------------------- */
/*  "The Passport" — the photos are prints on a table that lean toward your    */
/*  cursor, "10+ years" is a seal, and the eight reasons people choose you     */
/*  are ink stamps that land on the page as it scrolls into view.              */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const POINTS = [
  { label: "Best Award", glyph: "award", rotate: -5 },
  { label: "100% Authentic", glyph: "seal", rotate: 3 },
  { label: "Multilingual Guides", glyph: "globe", rotate: -2 },
  { label: "Local Experts", glyph: "pin", rotate: 6 },
  { label: "Good Experience", glyph: "heart", rotate: 2 },
  { label: "Best Safety", glyph: "shield", rotate: -6 },
  { label: "Facilities & Services", glyph: "bell", rotate: 4 },
  { label: "Value for Money", glyph: "tag", rotate: -3 },
];

/* the machine-readable line at the foot of a passport page, spelling out the brand */
const mrz = (s) => s.padEnd(44, "<");
const MRZ = [
  mrz("P<GVT<<GOVENTURE<<TRAVEL<DIFFERENTLY"),
  mrz("2015<<10<YEARS<OF<DISCOVERY"),
];

/** A layer of the collage. Moves with the pointer by `depth` px; deeper layers move more. */
function Layer({ depth, rotate = 0, className = "", children }) {
  return (
    <div
      className={`absolute transition-transform duration-500 ease-out motion-reduce:transition-none ${className}`}
      style={{
        transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.7}px), 0) rotate(${rotate}deg)`,
      }}
    >
      {children}
    </div>
  );
}

function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  delay = 0,
  from = { opacity: 0, y: 30 },
}) {
  return (
    <motion.div
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={`group relative h-full w-full overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      />
    </motion.div>
  );
}

const PRINT =
  "border-[6px] border-[#F5F2EB] shadow-[0_24px_60px_-20px_rgba(17,24,39,0.35)]";

const AboutUsPage = () => {
  const stageRef = useRef(null);
  const canLean = useRef(false);

  useEffect(() => {
    canLean.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const onMove = (e) => {
    const el = stageRef.current;
    if (!canLean.current || !el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty(
      "--px",
      (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3),
    );
    el.style.setProperty(
      "--py",
      (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3),
    );
  };

  const onLeave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <section
      aria-labelledby="about-title"
      className="relative overflow-hidden py-24 bg-[#f7f8f6] sm:py-28 lg:py-36"
    >
      <InkFilter />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-[#2095AE]/[0.07] blur-[130px]" />
        <div className="absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-[#ffb020]/[0.08] blur-[130px]" />
      </div>

      <div className="custom-container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-28">
          {/* ------------------------------ collage ------------------------------ */}
          <div
            ref={stageRef}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="relative mx-auto h-[34rem] w-full max-w-[34rem] sm:h-[42rem] lg:mx-0 lg:h-[44rem] lg:max-w-none"
          >
            <Layer depth={6} className="left-0 top-0 h-[66%] w-[72%]">
              <Photo
                src={image1}
                alt="Go-Venture travel experience"
                priority
                sizes="(max-width: 1024px) 70vw, 36vw"
                className="rounded-[2rem]"
                from={{ opacity: 0, scale: 0.96 }}
              />
            </Layer>

            <Layer
              depth={16}
              rotate={3}
              className="right-0 top-[8%] z-10 h-[30%] w-[40%]"
            >
              <Photo
                src={image2}
                alt="Go-Venture destination"
                sizes="(max-width: 1024px) 40vw, 20vw"
                className={`rounded-2xl ${PRINT}`}
                delay={0.2}
                from={{ opacity: 0, x: 40 }}
              />
            </Layer>

            <Layer
              depth={12}
              rotate={-3}
              className="bottom-0 left-[3%] z-10 h-[32%] w-[50%]"
            >
              <Photo
                src={image4}
                alt="Adventure experience"
                sizes="(max-width: 1024px) 50vw, 24vw"
                className={`rounded-2xl ${PRINT}`}
                delay={0.3}
              />
            </Layer>

            <Layer
              depth={22}
              className="bottom-[4%] right-[3%] z-20 aspect-square w-[34%]"
            >
              <Photo
                src={image3}
                alt="Travel adventure"
                sizes="(max-width: 1024px) 34vw, 16vw"
                className={`rounded-full ${PRINT}`}
                delay={0.4}
                from={{ opacity: 0, scale: 0.7 }}
              />
            </Layer>

            <Layer
              depth={30}
              rotate={-8}
              className="left-[48%] top-[45%] z-30 w-[9rem] sm:w-[10.5rem] lg:w-[11.5rem]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.5, rotate: 14 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              >
                <Seal />
              </motion.div>
            </Layer>
          </div>

          {/* ------------------------------- story ------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative min-w-0"
          >
            <p className="mb-6 flex items-center gap-3 text-sm text-[#111827]/55">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2095AE]" />
              About Go-Venture
            </p>

            <h2
              id="about-title"
              className="max-w-[850px] text-[clamp(2.6rem,5vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[#111827]"
            >
              <span className="text-[#111827]/35">Travel</span> beyond the{" "}
              <span className="text-[#2095AE]"> ordinary.</span>
            </h2>

            <h3 className="mb-5 mt-9 max-w-[650px] text-xl font-medium leading-[1.35] tracking-[-0.02em] text-[#111827] sm:text-2xl">
              Journeys made to be remembered.
            </h3>

            <p className="max-w-[650px] text-[15px] leading-[1.85] text-[#111827]/60">
              We connect you with remarkable places, trusted local experiences,
              and thoughtfully planned journeys — so you can simply enjoy the
              adventure.
            </p>

            {/* The stamp page */}
            <div className="mt-7 rounded-t-2xl border border-[#111827]/10 bg-white/55 p-4 [background-image:radial-gradient(circle_at_1px_1px,rgba(17,24,39,0.07)_1px,transparent_0)] [background-size:14px_14px] sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="text-sm font-medium tracking-[-0.02em] text-[#111827]">
                  Why Go-Venture
                </h4>

                <span className="text-xs tabular-nums text-[#111827]/40">
                  {POINTS.length} reasons
                </span>
              </div>

              <ul className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                {POINTS.map((p, i) => (
                  <Stamp key={p.label} id={`gv-stamp-${i}`} index={i} {...p} />
                ))}
              </ul>
            </div>

            <div className="">
              <AboutUsAnimation />
            </div>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="mt-20 select-none overflow-hidden font-mono text-[11px] leading-5 tracking-[0.15em] text-[#111827]/[0.18] sm:text-xs sm:tracking-[0.35em]"
        >
          {MRZ.map((line) => (
            <p key={line} className="whitespace-nowrap">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
