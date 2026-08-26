"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowOutwardRounded,
  CheckRounded,
  EastRounded,
} from "@mui/icons-material";

import image1 from "@/assets/About-us/aboutUs1.jpg";
import image3 from "@/assets/About-us/aboutUs2.jpg";
import image2 from "@/assets/About-us/aboutUs3.jpg";
import image4 from "@/assets/About-us/aboutUs4.jpg";

import AboutUsAnimation from "@/utils/AboutUs/AboutUsAnimation";

const AboutUsPage = () => {
  const items = [
    "Best Award",
    "100% Authentic",
    "Multilingual Guides",
    "Local Experts",
    "Good Experience",
    "Best Safety",
    "Facilities & Services",
    "Value for Money",
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7f8f6] py-24 sm:py-28 lg:py-36">
      {/* =========================================================
          BACKGROUND ART DIRECTION
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
      </div>

      <div className="custom-container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 xl:gap-32">
          {/* =====================================================
              LEFT — EDITORIAL IMAGE COMPOSITION
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[620px] sm:min-h-[700px]"
          >
            {/* Editorial index */}

            <div className="absolute left-0 top-0 z-30 flex items-center gap-4">
           

              <span className="h-px w-10 bg-[#2095AE]/50" />

              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#111827]/45">
                About Go-Venture
              </span>
            </div>

            {/* Main image */}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1.1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-14 h-[370px] w-[82%] overflow-hidden rounded-[2px] sm:h-[430px] lg:h-[460px]"
            >
              <Image
                src={image1}
                alt="Go-Venture travel experience"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 40vw"
                className="object-cover transition-transform duration-[1.4s] hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-[#2095AE]/10" />

              <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                <span className="h-2 w-2 rounded-full bg-[#2095AE]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                  Since 2015
                </span>
              </div>
            </motion.div>

            {/* Secondary landscape image */}

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-12 right-0 z-20 h-[210px] w-[67%] overflow-hidden border-[8px] border-[#f7f8f6] sm:h-[245px]"
            >
              <Image
                src={image2}
                alt="Go-Venture destination"
                fill
                sizes="(max-width: 1024px) 55vw, 32vw"
                className="object-cover transition-transform duration-[1.2s] hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10" />
            </motion.div>

            {/* Circular image */}

            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1,
                delay: 0.4,
                type: "spring",
                stiffness: 80,
                damping: 16,
              }}
              className="absolute right-[8%] top-[46%] z-30 h-[145px] w-[145px] overflow-hidden rounded-full border-[7px] border-[#f7f8f6] shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:h-[175px] sm:w-[175px]"
            >
              <Image
                src={image3}
                alt="Travel adventure"
                fill
                sizes="175px"
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
            </motion.div>

            {/* Bottom image */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-0 left-[6%] z-10 h-[125px] w-[52%] overflow-hidden sm:h-[150px]"
            >
              <Image
                src={image4}
                alt="Adventure experience"
                fill
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
            </motion.div>

            {/* Floating stat */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="absolute bottom-0 right-[2%] z-40 hidden bg-[#111827] px-7 py-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.18)] sm:block"
            >
              <div className="flex items-end gap-3">
                <span className="text-4xl font-semibold tracking-[-0.06em]">
                  10+
                </span>

                <span className="mb-1 text-[9px] uppercase leading-relaxed tracking-[0.2em] text-white/50">
                  Years of
                  <br />
                  Discovery
                </span>
              </div>
            </motion.div>

            {/* Decorative brand line */}

            <div className="absolute bottom-[25%] left-0 hidden h-px w-16 bg-[#2095AE] sm:block" />
          </motion.div>

          {/* =====================================================
              RIGHT — CONTENT / EDITORIAL STORY
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Eyebrow */}

            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#2095AE]" />

              <Typography
                component="span"
                className="!text-[10px] !font-semibold !uppercase !tracking-[0.3em] !text-[#2095AE]"
              >
                The Go-Venture Story
              </Typography>
            </div>

            {/* Main heading */}

            <Typography
              component="h2"
              className="!max-w-[850px] !text-[clamp(2.8rem,5.2vw,5.5rem)] !font-medium !leading-[0.94] !tracking-[-0.055em] !text-[#111827]"
            >
              We don&apos;t just
              <br />
              <span className="font-serif italic text-[#2095AE]">
                plan journeys.
              </span>
              <br />
              We create them.
            </Typography>

            {/* Accent divider */}

            <div className="my-9 flex items-center gap-4">
              <div className="h-px w-20 bg-[#111827]/15" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#2095AE]" />
              <div className="h-px w-8 bg-[#111827]/10" />
            </div>

            {/* Supporting heading */}

            <Typography
              component="h3"
              className="!mb-5 !max-w-[650px] !text-xl !font-medium !leading-[1.35] !tracking-[-0.02em] !text-[#111827] sm:!text-2xl"
            >
              A decade of turning destinations into meaningful experiences.
            </Typography>

            {/* Description */}

            <Typography
              component="p"
              className="!mb-10 !max-w-[650px] !text-[15px] !font-normal !leading-[1.85] !text-[#111827]/60"
            >
              Celebrate the spirit of wanderlust with Go-Venture, where every
              journey is designed to become an unforgettable adventure. From
              pristine beaches to majestic mountains, we connect travelers
              with remarkable destinations through trusted local expertise,
              thoughtful planning, and experiences that stay with you long
              after the journey ends.
            </Typography>

            {/* =================================================
                TRUST / BENEFIT SYSTEM
            ================================================== */}

            <div className="relative border-y border-[#111827]/10 py-7">
              <div className="mb-6 flex items-center justify-between">
                <Typography
                  component="span"
                  className="!text-[10px] !font-semibold !uppercase !tracking-[0.25em] !text-[#111827]/40"
                >
                  Why travelers choose us
                </Typography>

                <span className="text-[10px] font-medium tracking-[0.15em] text-[#111827]/30">
                  08 / 08
                </span>
              </div>

              <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.045,
                    }}
                    className="group flex items-center gap-4 border-b border-[#111827]/[0.07] py-3.5 last:border-b-0 sm:nth-[odd]:border-r sm:nth-[odd]:pr-6"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2095AE]/25 bg-[#2095AE]/[0.06] transition-all duration-300 group-hover:border-[#2095AE] group-hover:bg-[#2095AE]">
                      <CheckRounded
                        sx={{ fontSize: 14 }}
                        className="text-[#2095AE] transition-colors duration-300 group-hover:text-white"
                      />
                    </span>

                    <Typography
                      component="span"
                      className="!text-[13px] !font-medium !tracking-[-0.01em] !text-[#111827]/75 transition-colors duration-300 group-hover:text-[#2095AE]"
                    >
                      {item}
                    </Typography>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom action area */}

            <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              {/* Brand statement */}

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827]">
                  <ArrowOutwardRounded
                    sx={{ fontSize: 17 }}
                    className="text-white"
                  />
                </div>

                <div>
                  <Typography
                    component="span"
                    className="!block !text-[10px] !font-semibold !uppercase !tracking-[0.2em] !text-[#111827]/35"
                  >
                    Travel differently
                  </Typography>

                  <Typography
                    component="span"
                    className="!text-xs !font-medium !text-[#111827]/70"
                  >
                    Discover the Go-Venture way
                  </Typography>
                </div>
              </div>

              {/* CTA */}

              <motion.a
                href="/all-destinations"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-5 self-start text-sm font-semibold text-[#111827]"
              >
                <span className="relative">
                  Explore our world
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[#2095AE] transition-transform duration-300 group-hover:scale-x-0" />
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111827]/15 transition-all duration-300 group-hover:border-[#2095AE] group-hover:bg-[#2095AE]">
                  <EastRounded
                    sx={{ fontSize: 17 }}
                    className="text-[#111827] transition-colors duration-300 group-hover:text-white"
                  />
                </span>
              </motion.a>
            </div>

            {/* Existing animation preserved */}

            <div className="mt-10">
              <AboutUsAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;