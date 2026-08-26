"use client";

import React from "react";
import {
  AccessTimeRounded,
  ChatBubbleOutlineRounded,
  LocationOnOutlined,
  WifiRounded,
  ArrowForwardRounded,
  PhoneIphoneRounded,
  VerifiedRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";

import Image from "next/image";

import googleStore from "@/assets/App-logo/google-store.png";
import appStore from "@/assets/App-logo/apple-store.png";
import AppAnimation from "@/utils/MobileApp/AppAnimation";
import appImage from "@/assets/All-image/appSection.jpg";

const MobileApps = () => {
  const features = [
    {
      icon: <ChatBubbleOutlineRounded />,
      title: "Live Chat Support",
      description: "Get help whenever you need it.",
    },
    {
      icon: <WifiRounded />,
      title: "Stay Connected",
      description: "Access your travel essentials anywhere.",
    },
    {
      icon: <LocationOnOutlined />,
      title: "Local Insights",
      description: "Discover places beyond the usual.",
    },
    {
      icon: <AccessTimeRounded />,
      title: "Flexible Planning",
      description: "Manage your journey on your schedule.",
    },
  ];

  return (
    <section className="relative mt-28 overflow-hidden bg-[#eef8fa] py-20 md:mt-36 md:py-28">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#2095ae]/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#2095ae]/10 blur-3xl" />

        <div className="absolute right-[20%] top-10 h-24 w-24 rounded-full border border-[#2095ae]/10" />

        <div className="absolute bottom-20 left-[15%] h-16 w-16 rounded-full border border-[#2095ae]/10" />
      </div>

      <div className="custom-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative z-20"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-6 flex items-center gap-3"
            >
              <motion.span
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2095ae]/10 text-[#2095ae]"
              >
                <PhoneIphoneRounded fontSize="small" />
              </motion.span>

              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2095ae]"
              >
                Go-Venture App
              </motion.span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 28,
                filter: "blur(6px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.85,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-4xl font-medium leading-[1.08] tracking-tight text-[#10213a] md:text-5xl lg:text-6xl"
            >
              Your journey,
              <br />
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block font-serif italic text-[#2095ae]"
              >
                always with you.
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-xl text-sm leading-7 text-gray-500 md:text-base"
            >
              Plan, discover, and manage your adventures from one beautifully
              simple app. Everything you need for a smoother journey, right in
              your pocket.
            </motion.p>

            {/* Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 0.35,
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  whileHover={{
                    y: -4,
                    transition: {
                      duration: 0.25,
                      ease: "easeOut",
                    },
                  }}
                  className="group rounded-2xl border border-[#10213a]/[0.06] bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#2095ae]/20 hover:bg-white hover:shadow-[0_15px_35px_rgba(16,33,58,0.07)]"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 3,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2095ae]/10 text-[#2095ae] transition-all duration-300 group-hover:bg-[#2095ae] group-hover:text-white"
                    >
                      {React.cloneElement(feature.icon, {
                        fontSize: "small",
                      })}
                    </motion.div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#10213a]">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Download */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9"
            >
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.72,
                }}
                className="mb-3 flex items-center gap-2"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.75,
                    type: "spring",
                    stiffness: 220,
                    damping: 15,
                  }}
                >
                  <VerifiedRounded
                    sx={{
                      fontSize: 16,
                      color: "#2095ae",
                    }}
                  />
                </motion.span>

                <span className="text-xs font-medium text-gray-500">
                  Available on iOS & Android
                </span>
              </motion.div>

              <div className="flex flex-wrap items-center gap-3">
                {/* App Store */}
                <motion.a
                  href="#"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg"
                >
                  <Image
                    src={appStore}
                    alt="Download on the App Store"
                    width={150}
                    height={50}
                    className="h-[50px] w-auto"
                  />
                </motion.a>

                {/* Google Play */}
                <motion.a
                  href="#"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg"
                >
                  <Image
                    src={googleStore}
                    alt="Get it on Google Play"
                    width={150}
                    height={50}
                    className="h-[50px] w-auto"
                  />
                </motion.a>

                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                  }}
                  className="ml-1 hidden text-xs text-gray-400 sm:block"
                >
                  Download free
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT VISUAL
          ================================================== */}

          <div className="relative min-h-[500px] lg:min-h-[620px]">
            {/* Large background circle */}
            <div className="absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#2095ae]/10 md:h-[560px] md:w-[560px]" />

            {/* Outer ring */}
            <div className="absolute right-[-40px] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full border border-[#2095ae]/10 md:h-[620px] md:w-[620px]" />

            {/* Main image */}
            <div className="absolute right-0 top-1/2 w-[92%] -translate-y-1/2 overflow-hidden rounded-[40px] shadow-[0_35px_80px_rgba(16,33,58,0.18)] md:w-[88%]">
              <Image
                src={appImage}
                alt="Go-Venture mobile travel experience"
                width={800}
                height={800}
                className="h-[420px] w-full object-cover md:h-[520px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/30 via-transparent to-transparent" />
            </div>

            {/* =================================================
                FLOATING APP CARD
            ================================================== */}

            <div className="absolute bottom-5 left-0 z-20 w-[230px] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_20px_50px_rgba(16,33,58,0.15)] backdrop-blur-xl md:bottom-10 md:left-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2095ae] text-white">
                  <PhoneIphoneRounded />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Everything in</p>

                  <p className="text-sm font-semibold text-[#10213a]">
                    one place
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2095ae]" />

                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  Plan • Explore • Travel
                </span>
              </div>
            </div>

            {/* =================================================
                EXISTING ANIMATION
            ================================================== */}

            <div className="absolute bottom-0 right-0 z-30 md:bottom-4 md:right-[-15px]">
              <AppAnimation />
            </div>

            {/* =================================================
                FLOATING BADGE
            ================================================== */}

            <div className="absolute right-0 top-10 z-20 hidden rounded-full border border-white/70 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-md sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2095ae]/10">
                  <LocationOnOutlined
                    sx={{
                      fontSize: 16,
                      color: "#2095ae",
                    }}
                  />
                </span>

                <span className="text-xs font-semibold text-[#10213a]">
                  Explore the world
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM MINI CTA
        ====================================================== */}

        <div className="mt-14 flex flex-col gap-4 border-t border-[#10213a]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Your next adventure is closer than you think.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#2095ae]">
            <span>Download the app</span>

            <ArrowForwardRounded
              sx={{
                fontSize: 16,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApps;
