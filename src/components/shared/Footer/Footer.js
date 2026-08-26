"use client";

import { Box, Container, IconButton, Divider, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo/logo.png";
import appleStore from "../../../assets/App-logo/apple-store.png";
import googleStore from "../../../assets/App-logo/google-store.png";

import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  ArrowUpwardRounded,
  ArrowForwardRounded,
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";

import { FaPaypal, FaStripe, FaCcMastercard, FaCcVisa } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Destinations", href: "/destinations" },
    { label: "Travel Services", href: "/services" },
    { label: "Blogs & Stories", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  const travelLinks = [
    { label: "Popular Destinations", href: "/destinations" },
    { label: "Hot Deals", href: "/hot-deals" },
    { label: "Travel Packages", href: "/packages" },
    { label: "Travel Guide", href: "/blogs" },
    { label: "Special Offers", href: "/offers" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      icon: <Facebook />,
      href: "#",
    },
    {
      label: "Instagram",
      icon: <Instagram />,
      href: "#",
    },
    {
      label: "LinkedIn",
      icon: <LinkedIn />,
      href: "#",
    },
    {
      label: "Twitter",
      icon: <Twitter />,
      href: "#",
    },
  ];

  const paymentMethods = [
    {
      label: "PayPal",
      icon: <FaPaypal />,
    },
    {
      label: "Stripe",
      icon: <FaStripe />,
    },
    {
      label: "Mastercard",
      icon: <FaCcMastercard />,
    },
    {
      label: "Visa",
      icon: <FaCcVisa />,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#061824] text-white">
      {/* =========================================================
          TOP BRAND LINE
      ========================================================= */}

      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#2095AE] to-transparent opacity-80" />

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Travel image */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061824]/85 via-[#061824]/95 to-[#061824]" />

        {/* Teal ambient glow */}
        <div className="absolute -left-40 top-32 h-[420px] w-[420px] rounded-full bg-[#2095AE]/10 blur-[120px]" />

        <div className="absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-[#2095AE]/10 blur-[120px]" />

        {/* Small decorative glow */}
        <div className="absolute left-1/2 top-[55%] h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-3xl" />
      </div>

      <Container maxWidth={false} className="custom-container relative z-10">
        {/* =========================================================
            PREMIUM CTA
        ========================================================= */}

        <section
          className="
         
            relative
            overflow-hidden
            rounded-b-[32px]
            border
            border-[#2095AE]/20
            bg-[#2095AE]/[0.055]
            
            py-10
            shadow-[0_0_80px_rgba(32,149,174,0.08)]
            backdrop-blur-xl
          
            md:py-14
            custom-container
          "
        >
          {/* Decorative circles */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#2095AE]/10" />

          <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full border border-[#2095AE]/10" />

          <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[#2095AE]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* CTA Content */}

            <div className="max-w-2xl ">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#2095AE]" />

                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#36B8D4]">
                  Your next journey starts here
                </span>
              </div>

              <h2 className="max-w-2xl text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
                Don&apos;t just dream about
                <span className="font-serif italic text-[#36B8D4]">
                  {" "}
                  the world.
                </span>
                <br />
                Go experience it.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Discover extraordinary destinations, thoughtfully designed
                journeys, and unforgettable experiences made around the way you
                want to travel.
              </p>
            </div>

            {/* CTA Button */}

            <Link
              href="/destinations"
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#2095AE]
                px-7
                py-4
                text-sm
                font-semibold
                text-white
                shadow-[0_10px_35px_rgba(32,149,174,0.18)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:bg-[#2FB3CF]
                hover:shadow-[0_20px_45px_rgba(32,149,174,0.35)]
              "
            >
              Explore Destinations
              <ArrowForwardRounded
                fontSize="small"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>

        {/* =========================================================
            MAIN FOOTER CONTENT
        ========================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            py-16
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]
            lg:gap-10
            lg:py-20
             custom-container
          "
        >
          {/* =====================================================
              BRAND / CONTACT
          ===================================================== */}

          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  overflow-hidden
          
                "
              >
                <Image
                  src={logo}
                  width={56}
                  height={56}
                  alt="Go Venture"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Go-Venture
                </h3>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-[#2095AE]">
                  Travel Beyond
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/50">
              We design remarkable journeys for curious travelers who want to
              see more, experience more, and remember every moment.
            </p>

            {/* Contact Information */}

            <div className="mt-8 space-y-4">
              <a
                href="tel:+423536242365"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-white/60
                  transition-colors
                  hover:text-white
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#2095AE]/20
                    bg-[#2095AE]/[0.06]
                    text-[#36B8D4]
                    transition-all
                    duration-300
                    group-hover:border-[#2095AE]/50
                    group-hover:bg-[#2095AE]/10
                  "
                >
                  <PhoneOutlined fontSize="small" />
                </span>

                <span>+423 5362 42365</span>
              </a>

              <a
                href="mailto:goventure@gmail.com"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-white/60
                  transition-colors
                  hover:text-white
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#2095AE]/20
                    bg-[#2095AE]/[0.06]
                    text-[#36B8D4]
                    transition-all
                    duration-300
                    group-hover:border-[#2095AE]/50
                    group-hover:bg-[#2095AE]/10
                  "
                >
                  <EmailOutlined fontSize="small" />
                </span>

                <span>goventure@gmail.com</span>
              </a>
            </div>

            {/* Social Icons */}

            <div className="mt-8 flex items-center gap-2">
              {socialLinks.map((social) => (
                <Tooltip key={social.label} title={social.label} arrow>
                  <IconButton
                    component="a"
                    href={social.href}
                    aria-label={social.label}
                    sx={{
                      width: 40,
                      height: 40,
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(32,149,174,0.18)",
                      background: "rgba(32,149,174,0.05)",
                      transition: "all .35s ease",

                      "&:hover": {
                        color: "#fff",
                        background: "#2095AE",
                        borderColor: "#2095AE",
                        transform: "translateY(-4px) scale(1.04)",
                        boxShadow: "0 10px 25px rgba(32,149,174,0.25)",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* =====================================================
              EXPLORE
          ===================================================== */}

          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2095AE]">
              Explore
            </p>

            <h3 className="mb-7 text-xl font-medium text-white">Quick Links</h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="
                      group
                      flex
                      items-center
                      text-sm
                      text-white/45
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-white
                    "
                  >
                    <ArrowForwardRounded
                      sx={{
                        fontSize: 15,
                        width: 0,
                        marginRight: 0,
                        opacity: 0,
                        color: "#2095AE",
                        transition: "all .3s ease",
                      }}
                      className="
                        group-hover:mr-2
                        group-hover:w-auto
                        group-hover:opacity-100
                      "
                    />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              TRAVEL
          ===================================================== */}

          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2095AE]">
              Discover
            </p>

            <h3 className="mb-7 text-xl font-medium text-white">
              Travel With Us
            </h3>

            <ul className="space-y-4">
              {travelLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="
                      group
                      flex
                      items-center
                      text-sm
                      text-white/45
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-white
                    "
                  >
                    <ArrowForwardRounded
                      sx={{
                        fontSize: 15,
                        width: 0,
                        marginRight: 0,
                        opacity: 0,
                        color: "#2095AE",
                        transition: "all .3s ease",
                      }}
                      className="
                        group-hover:mr-2
                        group-hover:w-auto
                        group-hover:opacity-100
                      "
                    />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              APP / CONNECT
          ===================================================== */}

          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2095AE]">
              Stay Connected
            </p>

            <h3 className="mb-4 text-xl font-medium text-white">
              Travel smarter
            </h3>

            <p className="max-w-sm text-sm leading-6 text-white/45">
              Get inspiration, manage your trips, and discover your next
              adventure from anywhere.
            </p>

            {/* App Buttons */}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#"
                aria-label="Download on the App Store"
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-black/30
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#2095AE]/40
                  hover:bg-black/50
                  hover:shadow-[0_10px_30px_rgba(32,149,174,0.12)]
                "
              >
                <Image
                  src={appleStore}
                  width={125}
                  height={42}
                  alt="Download on the App Store"
                  className="h-[42px] w-auto object-contain"
                />
              </a>

              <a
                href="#"
                aria-label="Get it on Google Play"
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-black/30
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#2095AE]/40
                  hover:bg-black/50
                  hover:shadow-[0_10px_30px_rgba(32,149,174,0.12)]
                "
              >
                <Image
                  src={googleStore}
                  width={125}
                  height={42}
                  alt="Get it on Google Play"
                  className="h-[42px] w-auto object-contain"
                />
              </a>
            </div>

            {/* Location */}

            <div className="mt-7 flex items-start gap-3">
              <LocationOnOutlined
                sx={{
                  fontSize: 20,
                  color: "#2095AE",
                  marginTop: "2px",
                }}
              />

              <p className="text-sm leading-6 text-white/45">
                Crafting journeys
                <br />
                across the world.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            DIVIDER
        ========================================================= */}

        <Divider
          sx={{
            borderColor: "rgba(32,149,174,0.12)",
          }}
        />

        {/* =========================================================
            BOTTOM BAR
        ========================================================= */}

        <div
          className="
            flex
            flex-col
            gap-6
            py-7
            md:flex-row
            md:items-center
            md:justify-between
             custom-container
          "
        >
          {/* Copyright / Legal */}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-xs text-white/35">
              © {currentYear} Go-Venture. All rights reserved.
            </p>

            <div className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

            <div className="flex items-center gap-4 text-xs text-white/35">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-[#2095AE]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-[#2095AE]"
              >
                Terms
              </Link>

              <Link
                href="/contact"
                className="transition-colors hover:text-[#2095AE]"
              >
                Support
              </Link>
            </div>
          </div>

          {/* Payment Methods */}

          <div className="flex items-center gap-2">
            <span className="mr-2 hidden text-[10px] uppercase tracking-[0.15em] text-white/25 sm:block">
              Secure payments
            </span>

            {paymentMethods.map((payment) => (
              <Tooltip key={payment.label} title={payment.label} arrow>
                <div
                  className="
                    flex
                    h-9
                    w-11
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#2095AE]/15
                    bg-[#2095AE]/[0.05]
                    text-lg
                    text-white/50
                    transition-all
                    duration-300
                    hover:border-[#2095AE]/50
                    hover:bg-[#2095AE]
                    hover:text-white
                    hover:shadow-[0_8px_20px_rgba(32,149,174,0.2)]
                  "
                >
                  {payment.icon}
                </div>
              </Tooltip>
            ))}
          </div>

          {/* Back To Top */}

          <Tooltip title="Back to top" arrow>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#2095AE]/20
                bg-[#2095AE]/[0.05]
                text-white/50
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#2095AE]
                hover:bg-[#2095AE]
                hover:text-white
                hover:shadow-[0_10px_25px_rgba(32,149,174,0.25)]
              "
            >
              <ArrowUpwardRounded
                fontSize="small"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </Tooltip>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
