"use client";

import signUpImage from "@/assets/Sign-up/sign-up.png";
import { ArrowForwardRounded, ArrowOutwardRounded } from "@mui/icons-material";
import Image from "next/image";
import planeImage from "@/assets/All-image/plane.png";
import Link from "next/link";
import { motion } from "framer-motion";

const JoinUsPage = () => {
  return (
    <section className="relative overflow-hidden bg-[#11171a] py-24 text-white sm:py-28 lg:py-32">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.035]"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/P9mWnwy/world-map.png')",
          }}
        />

        <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#2095AE]/10 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#2095AE]/[0.06] blur-[130px]" />
      </div>

      <div className="custom-container relative z-10">
        {/* Main Content */}
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="mb-5 block font-serif text-xl italic text-[#2095AE]">
              Welcome,
            </span>

            <h2 className="max-w-2xl text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">
              Your next
              <br />
              <span className="text-white/35">adventure</span>
              <br />
              starts here.
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              Join Go-Venture and unlock a smarter way to explore the world.
              Discover exclusive deals, curated experiences, and travel
              inspiration built around the way you love to travel.
            </p>

            {/* Member Info */}
            <div className="mt-10 flex max-w-lg items-center gap-5 border-y border-white/10 py-6">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/[0.06]">
                <Image
                  src={signUpImage}
                  alt="Go-Venture membership"
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>

              <div>
                <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2095AE]">
                  Go-Venture Members
                </span>

                <p className="text-sm leading-6 text-white/45">
                  Exclusive travel deals and experiences, created for our
                  community of explorers.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/register"
                className="group inline-flex items-center gap-4 bg-[#2095AE] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#27a8c3]"
              >
                Create your account

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowForwardRounded sx={{ fontSize: 16 }} />
                </span>
              </Link>

              <Link
                href="/login"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 transition-colors duration-300 hover:text-white"
              >
                Already a member

                <ArrowOutwardRounded
                  sx={{ fontSize: 16 }}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* Right — Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[600px]">
              {/* Video */}
              <div className="group relative aspect-[0.82] overflow-hidden bg-[#080c0e] sm:aspect-[0.9] lg:aspect-[0.8]">
                <video
                  src="/joinUs.mp4"
                  className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.025]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Go-Venture travel experience"
                />

                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />

                <div className="absolute inset-0 bg-[#2095AE]/[0.035] mix-blend-screen" />

                {/* Top */}
                <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/60">
                    Go-Venture
                  </span>

                  <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2095AE]" />
                    Explore
                  </span>
                </div>

                {/* Bottom */}
                <div className="absolute bottom-7 left-6 right-6 sm:bottom-9 sm:left-8 sm:right-8">
                  <span className="mb-3 block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2095AE]">
                    Travel differently
                  </span>

                  <p className="max-w-md text-2xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-3xl">
                    The world is bigger than your usual route.
                  </p>
                </div>
              </div>

              {/* Plane */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1.5, 0],
                }}
                className="absolute -left-16 top-[40%] z-20 hidden w-[240px] lg:block xl:-left-20 xl:w-[290px]"
              >
                <Image
                  src={planeImage}
                  alt="Travel airplane"
                  width={550}
                  height={550}
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/25">
            Go-Venture
          </span>

          <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
            Your journey starts here
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUsPage;