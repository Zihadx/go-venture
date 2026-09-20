"use client";

import React from "react";
import {
  ChatBubbleOutlineRounded,
  WifiRounded,
  ExploreOutlined,
  AccessTimeRounded,
  FlightTakeoffRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import Image from "next/image";

import googleStore from "@/assets/App-logo/google-store.png";
import appStore from "@/assets/App-logo/apple-store.png";
import AppAnimation from "@/utils/MobileApp/AppAnimation";
import appImage from "@/assets/All-image/appSection.jpg";

/**
 * Design direction — "boarding pass"
 * One tall card, split in two with no gap between the halves: the top is
 * the existing AppAnimation component (contained and scaled to fit, shown
 * as-is), the bottom is a die-cut boarding-pass ticket — photo, perforated
 * line, passenger stub. They read as one continuous object.
 *
 * Colors are theme tokens — light by default, `dark:` variants for dark
 * mode — driven by the standard Tailwind `darkMode: 'class'` toggle.
 */

const DISPLAY_FONT =
  "'Fraunces', ui-serif, Georgia, 'Times New Roman', serif";

const manifest = [
  {
    icon: <ChatBubbleOutlineRounded fontSize="small" />,
    title: "Live support",
    detail: "A real person, any hour.",
  },
  {
    icon: <WifiRounded fontSize="small" />,
    title: "Offline maps",
    detail: "Works with no signal.",
  },
  {
    icon: <ExploreOutlined fontSize="small" />,
    title: "Local finds",
    detail: "Beyond the guidebook.",
  },
  {
    icon: <AccessTimeRounded fontSize="small" />,
    title: "Flexible plans",
    detail: "Reroute, no fees.",
  },
];

const barcodeBars = [36, 58, 26, 66, 42, 52, 30, 62, 46, 38, 54, 28];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const MobileApps = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#2094ae13] py-10 dark:bg-[#0B1420] sm:py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-[#1D8FA6]/[0.06] blur-[100px] dark:bg-[#2CA6C0]/10" />
      </div>

      <motion.div
        initial={reduceMotion ? undefined : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="custom-container relative z-10"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
          {/* ============================= LEFT ============================= */}
          <div>
            <motion.div variants={rise} className="flex items-center gap-2">
              <FlightTakeoffRounded
                sx={{ fontSize: 14 }}
                className="text-[#1D8FA6] dark:text-[#2CA6C0]"
              />
              <span
                className="text-xs italic text-[#5C6B78] dark:text-[#9FB4C2]"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                A flight plan for wanderers
              </span>
            </motion.div>

            <motion.h2
              variants={rise}
              className="mt-3 max-w-md text-[1.75rem] leading-[1.15] tracking-tight text-[#12233A] dark:text-[#F5F1E6] sm:text-3xl md:text-4xl lg:text-[2.65rem]"
              style={{ fontFamily: DISPLAY_FONT, fontWeight: 500 }}
            >
              Pack light. Wander far.
            </motion.h2>

            <motion.p
              variants={rise}
              className="mt-4 max-w-sm text-sm leading-6 text-[#5C6B78] dark:text-[#9FB4C2]"
            >
              Tickets, maps, and a place to ask questions at 2am — one app,
              your whole trip.
            </motion.p>

            {/* Manifest — compact grid, no card chrome */}
            <motion.ul
              variants={rise}
              className="mt-7 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
            >
              {manifest.map((entry) => (
                <li key={entry.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1D8FA6]/20 bg-white text-[#1D8FA6] dark:border-[#2CA6C0]/25 dark:bg-[#12233A] dark:text-[#2CA6C0]">
                    {entry.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#12233A] dark:text-[#F5F1E6]">
                      {entry.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-[#7A8791] dark:text-[#7C93A0]">
                      {entry.detail}
                    </p>
                  </div>
                </li>
              ))}
            </motion.ul>

            {/* Download */}
            <motion.div variants={rise} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  className="overflow-hidden rounded-xl shadow-[0_10px_24px_rgba(18,35,58,0.14)] transition-transform duration-300 hover:-translate-y-0.5 dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                >
                  <Image
                    src={appStore}
                    alt="Download on the App Store"
                    width={136}
                    height={44}
                    className="h-11 w-auto"
                  />
                </a>
                <a
                  href="#"
                  className="overflow-hidden rounded-xl shadow-[0_10px_24px_rgba(18,35,58,0.14)] transition-transform duration-300 hover:-translate-y-0.5 dark:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                >
                  <Image
                    src={googleStore}
                    alt="Get it on Google Play"
                    width={136}
                    height={44}
                    className="h-11 w-auto"
                  />
                </a>
              </div>
              <p className="mt-3 text-xs text-[#7A8791] dark:text-[#7C93A0]">
                Free to download. No fees to switch plans.
              </p>
            </motion.div>
          </div>

          {/* ============================= RIGHT — APP + TICKET, ONE CARD ============================= */}
          <motion.div variants={rise} className="relative">
            <div className="relative mx-auto w-full max-w-[340px] h-[520px]">
              <div className="overflow-hidden rounded-[40px] bg-[#F5F1E6] shadow-[0_28px_60px_rgba(18,35,58,0.18)] dark:shadow-[0_28px_60px_rgba(3,10,18,0.55)]">
                {/* Top — the app itself, in motion, fully visible */}
                <div className="relative w-full overflow-hidden bg-[#12233A] h-[310px]">
                  <div className="absolute inset-0 flex items-center justify-center mt-9">
                    <div className="scale-[0.42]">
                      <AppAnimation/>
                    </div>
                  </div>
                </div>

                {/* Bottom — the boarding pass, set flush against it, no gap */}
                <div>
                  {/* Photo */}
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={appImage}
                      alt="Go-Venture mobile travel experience"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1420]/70 via-[#0B1420]/5 to-transparent" />

                    <div
                      className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#F5F1E6]/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#12233A] shadow-md"
                      style={{ fontFamily: DISPLAY_FONT }}
                    >
                      <FlightTakeoffRounded sx={{ fontSize: 12 }} className="text-[#1D8FA6]" />
                      home&nbsp;✈&nbsp;away
                    </div>
                  </div>

                  {/* Perforation */}
                  <div className="relative">
                    <span className="absolute -left-3 top-0 h-5 w-5 -translate-y-1/2 rounded-full bg-[#F7F4EE] dark:bg-[#0B1420]" />
                    <span className="absolute -right-3 top-0 h-5 w-5 -translate-y-1/2 rounded-full bg-[#F7F4EE] dark:bg-[#0B1420]" />
                    <div className="border-t border-dashed border-[#12233A]/20" />
                  </div>

                  {/* Stub */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <p className="text-[9px] font-medium text-[#12233A]/45">
                        Passenger
                      </p>
                      <p
                        className="text-sm italic text-[#12233A]"
                        style={{ fontFamily: DISPLAY_FONT }}
                      >
                        You, exploring
                      </p>
                    </div>
                    <div className="flex h-6 items-end gap-[2.5px]" aria-hidden="true">
                      {barcodeBars.map((height, index) => (
                        <span
                          key={index}
                          className="w-[2px] rounded-full bg-[#12233A]/70"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.div
          variants={rise}
          className="mt-10 flex flex-col gap-3 border-t border-[#12233A]/10 pt-5 dark:border-[#2CA6C0]/10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-[#7A8791] dark:text-[#7C93A0]">
            Most trips start with one tap.
          </p>
          <a
            href="#"
            className="group flex items-center gap-1.5 text-xs font-semibold text-[#1D8FA6] dark:text-[#2CA6C0]"
          >
            <span>Download the app</span>
            <ArrowForwardRounded
              sx={{ fontSize: 14 }}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MobileApps;