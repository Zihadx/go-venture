"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  SearchRounded,
  CloseRounded,
  MenuRounded,
  ArrowForwardRounded,
  LogoutRounded,
  DashboardOutlined,
  PersonOutlineRounded,
  LuggageOutlined,
  KeyboardArrowDownRounded as ChevronDownRounded,
} from "@mui/icons-material";

import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";

import logo from "@/assets/logo/logo.png";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Destinations",
    href: "/all-destinations",
  },
  {
    label: "Journal",
    href: "/all-blogs",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];

const PROFILE_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardOutlined,
  },
  {
    label: "Profile",
    href: "/dashboard/account",
    icon: PersonOutlineRounded,
  },
  {
    label: "My journeys",
    href: "/dashboard/customer/trips",
    icon: LuggageOutlined,
  },
];

const MOBILE_SECONDARY = [
  {
    label: "Settings",
    href: "/",
  },
  {
    label: "Help",
    href: "/",
  },
  {
    label: "Travel guide",
    href: "/",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const Navbar = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  const profileRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 960px)");

  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /*
   * ------------------------------------------------------------
   * USER
   * ------------------------------------------------------------
   */

  const userInfo = getUserInfo();

  const user = userInfo?.email || session?.user;

  const userName =
    userInfo?.name ||
    session?.user?.name ||
    "Traveler";

  const userEmail =
    userInfo?.email ||
    session?.user?.email ||
    "";

  const userImage =
    userInfo?.image ||
    session?.user?.image ||
    "";

  /*
   * ------------------------------------------------------------
   * ACTIVE ROUTE
   * ------------------------------------------------------------
   */

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /*
   * ------------------------------------------------------------
   * SCROLL BEHAVIOR
   * ------------------------------------------------------------
   */

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 24) {
        setScrolled(false);
        setVisible(true);
        lastScroll = currentScroll;
        return;
      }

      setScrolled(true);

      if (currentScroll > lastScroll + 6) {
        setVisible(false);
        setSearchOpen(false);
        setProfileOpen(false);
      }

      if (currentScroll < lastScroll - 6) {
        setVisible(true);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * CLOSE PROFILE OUTSIDE CLICK
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * ESCAPE
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      setSearchOpen(false);
      setProfileOpen(false);
      setMobileOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * LOGOUT
   * ------------------------------------------------------------
   */

  const handleLogout = async () => {
    try {
      removeUserInfo();

      setProfileOpen(false);
      setMobileOpen(false);

      await signOut({
        redirect: false,
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /*
   * ------------------------------------------------------------
   * SEARCH
   * ------------------------------------------------------------
   */

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) return;

    router.push(
      `/all-destinations?search=${encodeURIComponent(value)}`
    );

    setSearchValue("");
    setSearchOpen(false);
  };

  /*
   * ------------------------------------------------------------
   * USER AVATAR
   * ------------------------------------------------------------
   */

  const UserAvatar = ({ size = 36 }) => {
    if (userImage) {
      return (
        <Image
          src={userImage}
          alt={userName}
          width={size}
          height={size}
          className="rounded-full object-cover"
        />
      );
    }

    return (
      <div
        style={{
          width: size,
          height: size,
        }}
        className="flex shrink-0 items-center justify-center rounded-full bg-[#116A7F] text-xs font-semibold text-white"
      >
        {userName.charAt(0).toUpperCase()}
      </div>
    );
  };

  /*
   * ------------------------------------------------------------
   * CLOSE MOBILE
   * ------------------------------------------------------------
   */

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* ========================================================
          DESKTOP / GLOBAL NAVBAR
      ========================================================= */}

      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -100,
              opacity: 0,
            }}
            transition={{
              duration: 0.45,
              ease: EASE,
            }}
            className="fixed inset-x-0 top-0 z-[100]"
          >
            <motion.div
              animate={{
                backgroundColor: scrolled
                  ? "rgba(255,255,255,0.96)"
                  : "rgba(8,20,31,0.04)",

                borderColor: scrolled
                  ? "rgba(15,23,42,0.08)"
                  : "rgba(255,255,255,0.14)",

                boxShadow: scrolled
                  ? "0 14px 45px rgba(15,23,42,0.08)"
                  : "0 12px 40px rgba(0,0,0,0.02)",
              }}
              transition={{
                duration: 0.35,
                ease: EASE,
              }}
              className="border-b backdrop-blur-xl"
            >
              <div className="custom-container">
                <div className="relative flex h-[76px] items-center">
                  {/* =================================================
                      MOBILE MENU
                  ================================================== */}

                  {isMobile && (
                    <motion.button
                      whileTap={{
                        scale: 0.92,
                      }}
                      type="button"
                      onClick={() =>
                        setMobileOpen(true)
                      }
                      aria-label="Open menu"
                      className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full border transition ${
                        scrolled
                          ? "border-black/10 text-[#10213a]"
                          : "border-white/15 text-white"
                      }`}
                    >
                      <MenuRounded fontSize="small" />
                    </motion.button>
                  )}

                  {/* =================================================
                      LOGO
                  ================================================== */}

                  <Link
                    href="/"
                    className="group flex shrink-0 items-center"
                  >
                    <div className="relative flex h-11 w-11 items-center justify-center">
                      <Image
                        src={logo}
                        alt="Go Venture"
                        width={42}
                        height={42}
                        priority
                        className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="ml-2.5 hidden sm:block">
                      <motion.div
                        animate={{
                          color: scrolled
                            ? "#10213a"
                            : "#ffffff",
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="text-[17px] font-bold leading-none tracking-[-0.03em]"
                      >
                        <span className="text-[#2095AE]">
                          Go V
                        </span>
                        enture
                      </motion.div>

                      <motion.div
                        animate={{
                          color: scrolled
                            ? "rgba(16,33,58,.42)"
                            : "rgba(255,255,255,.5)",
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="mt-1 text-[7px] font-medium uppercase tracking-[0.32em]"
                      >
                        Explore Beyond
                      </motion.div>
                    </div>
                  </Link>

                  {/* =================================================
                      DESKTOP NAVIGATION
                  ================================================== */}

                  {!isMobile && (
                    <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                          const active = isActive(
                            item.href
                          );

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group relative px-4 py-3"
                            >
                              <motion.span
                                animate={{
                                  color: active
                                    ? scrolled
                                      ? "#10213a"
                                      : "#ffffff"
                                    : scrolled
                                    ? "rgba(16,33,58,.55)"
                                    : "rgba(255,255,255,.68)",
                                }}
                                transition={{
                                  duration: 0.25,
                                }}
                                className="relative z-10 text-[12px] font-medium tracking-wide"
                              >
                                {item.label}
                              </motion.span>

                              <motion.span
                                initial={false}
                                animate={{
                                  width: active
                                    ? "100%"
                                    : "0%",
                                  opacity: active
                                    ? 1
                                    : 0,
                                }}
                                whileHover={{
                                  width: "100%",
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: EASE,
                                }}
                                className={`absolute bottom-1 left-1/2 h-[1.5px] -translate-x-1/2 ${
                                  scrolled
                                    ? "bg-[#2095AE]"
                                    : "bg-white"
                                }`}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </nav>
                  )}

                  {/* =================================================
                      RIGHT SIDE
                  ================================================== */}

                  <div className="ml-auto flex items-center gap-2">
                    {/* SEARCH */}

                    <motion.button
                      whileTap={{
                        scale: 0.92,
                      }}
                      type="button"
                      aria-label="Search"
                      onClick={() => {
                        setSearchOpen((value) => !value);
                        setProfileOpen(false);
                      }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                        scrolled
                          ? "text-[#10213a] hover:bg-black/5"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <AnimatePresence
                        mode="wait"
                        initial={false}
                      >
                        {searchOpen ? (
                          <motion.div
                            key="close"
                            initial={{
                              opacity: 0,
                              rotate: -45,
                            }}
                            animate={{
                              opacity: 1,
                              rotate: 0,
                            }}
                            exit={{
                              opacity: 0,
                              rotate: 45,
                            }}
                          >
                            <CloseRounded fontSize="small" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="search"
                            initial={{
                              opacity: 0,
                              scale: 0.7,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.7,
                            }}
                          >
                            <SearchRounded fontSize="small" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    {/* DIVIDER */}

                    <span
                      className={`hidden h-6 w-px md:block ${
                        scrolled
                          ? "bg-black/10"
                          : "bg-white/15"
                      }`}
                    />

                    {/* =================================================
                        PROFILE
                    ================================================== */}

                    {user ? (
                      <div
                        ref={profileRef}
                        className="relative"
                      >
                        <motion.button
                          whileTap={{
                            scale: 0.97,
                          }}
                          type="button"
                          onClick={() => {
                            setProfileOpen(
                              (value) => !value
                            );
                            setSearchOpen(false);
                          }}
                          className={`group flex items-center gap-2 rounded-full border p-1 pr-2 transition-all ${
                            scrolled
                              ? "border-black/10 bg-white hover:border-black/15 hover:bg-black/[.025]"
                              : "border-white/15 bg-white/10 hover:bg-white/15"
                          }`}
                        >
                          <UserAvatar size={34} />

                          <span
                            className={`hidden max-w-[90px] truncate text-xs font-semibold lg:block ${
                              scrolled
                                ? "text-[#10213a]"
                                : "text-white"
                            }`}
                          >
                            {userName}
                          </span>

                          <ChevronDownRounded
                            className={`hidden transition-transform duration-300 md:block ${
                              profileOpen
                                ? "rotate-180"
                                : ""
                            } ${
                              scrolled
                                ? "text-gray-400"
                                : "text-white/50"
                            }`}
                            sx={{
                              fontSize: 16,
                            }}
                          />
                        </motion.button>

                        {/* PROFILE MENU */}

                        <AnimatePresence>
                          {profileOpen && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: -10,
                                scale: 0.96,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                y: -8,
                                scale: 0.97,
                              }}
                              transition={{
                                duration: 0.25,
                                ease: EASE,
                              }}
                              className="absolute right-0 top-[calc(100%+12px)] w-[280px] overflow-hidden rounded-[22px] border border-black/[.07] bg-white p-2 shadow-[0_25px_70px_rgba(15,23,42,.16)]"
                            >
                              {/* PROFILE */}

                              <div className="rounded-[17px] bg-[#f5f7f6] p-4">
                                <div className="flex items-center gap-3">
                                  <UserAvatar size={46} />

                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-[#10213a]">
                                      {userName}
                                    </p>

                                    <p className="mt-0.5 truncate text-[11px] text-gray-400">
                                      {userEmail}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* LINKS */}

                              <div className="mt-2 space-y-0.5">
                                {PROFILE_ITEMS.map(
                                  (item) => {
                                    const Icon =
                                      item.icon;

                                    const active =
                                      isActive(
                                        item.href
                                      );

                                    return (
                                      <Link
                                        key={
                                          item.href
                                        }
                                        href={
                                          item.href
                                        }
                                        onClick={() =>
                                          setProfileOpen(
                                            false
                                          )
                                        }
                                        className={`group flex items-center gap-3 rounded-[14px] px-3.5 py-3 text-sm transition ${
                                          active
                                            ? "bg-[#116A7F]/[.08] text-[#116A7F]"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-[#116A7F]"
                                        }`}
                                      >
                                        <span
                                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                            active
                                              ? "bg-[#116A7F] text-white"
                                              : "bg-gray-100 text-gray-400 group-hover:bg-[#116A7F]/10 group-hover:text-[#116A7F]"
                                          }`}
                                        >
                                          <Icon
                                            sx={{
                                              fontSize: 17,
                                            }}
                                          />
                                        </span>

                                        <span className="font-medium">
                                          {item.label}
                                        </span>

                                        <ArrowForwardRounded
                                          className="ml-auto opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-60"
                                          sx={{
                                            fontSize: 15,
                                          }}
                                        />
                                      </Link>
                                    );
                                  }
                                )}
                              </div>

                              <div className="my-2 h-px bg-gray-100" />

                              {/* LOGOUT */}

                              <button
                                type="button"
                                onClick={
                                  handleLogout
                                }
                                className="flex w-full items-center gap-3 rounded-[14px] px-3.5 py-3 text-sm text-red-500 transition hover:bg-red-50"
                              >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                                  <LogoutRounded
                                    sx={{
                                      fontSize: 17,
                                    }}
                                  />
                                </span>

                                <span className="font-medium">
                                  Sign out
                                </span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="group flex items-center gap-2 rounded-full bg-[#116A7F] px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#0d596a] hover:shadow-[0_10px_30px_rgba(17,106,127,.25)]"
                      >
                        Login
                        <ArrowForwardRounded
                          sx={{
                            fontSize: 15,
                          }}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </Link>
                    )}
                  </div>
                </div>

                {/* =====================================================
                    SEARCH PANEL
                ====================================================== */}

                <AnimatePresence initial={false}>
                  {searchOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: EASE,
                      }}
                      className="overflow-hidden"
                    >
                      <form
                        onSubmit={
                          handleSearchSubmit
                        }
                        className="mx-auto max-w-2xl pb-5"
                      >
                        <div className="group flex items-center rounded-2xl border border-black/[.08] bg-[#f6f7f6] px-4 transition focus-within:border-[#116A7F]/30 focus-within:bg-white focus-within:shadow-[0_10px_35px_rgba(15,23,42,.06)]">
                          <SearchRounded
                            className="mr-3 text-gray-400 transition-colors group-focus-within:text-[#116A7F]"
                            sx={{
                              fontSize: 21,
                            }}
                          />

                          <input
                            autoFocus
                            value={searchValue}
                            onChange={(event) =>
                              setSearchValue(
                                event.target
                                  .value
                              )
                            }
                            type="search"
                            placeholder="Search destinations, places or experiences..."
                            className="h-12 flex-1 bg-transparent text-sm text-[#10213a] outline-none placeholder:text-gray-400"
                          />

                          <button
                            type="submit"
                            className="rounded-xl bg-[#116A7F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0d596a]"
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ==========================================================
          MOBILE DRAWER
      =========================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={closeMobile}
              className="fixed inset-0 z-[110] bg-[#071525]/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                duration: 0.45,
                ease: EASE,
              }}
              className="fixed bottom-0 left-0 top-0 z-[120] flex w-[310px] max-w-[88vw] flex-col overflow-hidden bg-[#0b1824] text-white shadow-[20px_0_70px_rgba(0,0,0,.25)]"
            >
              {/* decorative glow */}

              <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-[#2095AE]/10 blur-3xl" />

              <div className="relative flex h-full flex-col p-6">
                {/* HEADER */}

                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={closeMobile}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <Image
                        src={logo}
                        alt="Go Venture"
                        width={34}
                        height={34}
                        className="h-8 w-8 object-contain"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        <span className="text-[#3ca6ba]">
                          Go V
                        </span>
                        enture
                      </p>

                      <p className="mt-0.5 text-[7px] uppercase tracking-[0.3em] text-white/35">
                        Explore Beyond
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={closeMobile}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close menu"
                  >
                    <CloseRounded fontSize="small" />
                  </button>
                </div>

                {/* USER */}

                <div className="mt-8">
                  {user ? (
                    <div className="rounded-2xl border border-white/[.06] bg-white/[.045] p-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar size={44} />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {userName}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-white/35">
                            {userEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={closeMobile}
                      className="group flex items-center justify-between rounded-2xl bg-[#116A7F] px-4 py-3.5 text-sm font-semibold"
                    >
                      Login

                      <ArrowForwardRounded
                        sx={{
                          fontSize: 18,
                        }}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  )}
                </div>

                {/* MAIN NAV */}

                <div className="mt-8">
                  <p className="mb-3 px-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25">
                    Explore
                  </p>

                  <nav className="space-y-1">
                    {NAV_ITEMS.map(
                      (item, index) => {
                        const active =
                          isActive(item.href);

                        return (
                          <motion.div
                            key={item.href}
                            initial={{
                              opacity: 0,
                              x: -15,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay:
                                index * 0.05,
                              duration: 0.35,
                              ease: EASE,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={
                                closeMobile
                              }
                              className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm transition ${
                                active
                                  ? "bg-[#116A7F] text-white"
                                  : "text-white/55 hover:bg-white/[.05] hover:text-white"
                              }`}
                            >
                              <span>
                                {item.label}
                              </span>

                              <ArrowForwardRounded
                                sx={{
                                  fontSize: 16,
                                }}
                                className={`transition-all duration-300 ${
                                  active
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:translate-x-1 group-hover:opacity-60"
                                }`}
                              />
                            </Link>
                          </motion.div>
                        );
                      }
                    )}
                  </nav>
                </div>

                {/* SECONDARY */}

                <div className="mt-8 border-t border-white/[.07] pt-7">
                  <p className="mb-3 px-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25">
                    More
                  </p>

                  <nav className="space-y-1">
                    {MOBILE_SECONDARY.map(
                      (item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeMobile}
                          className="block rounded-xl px-4 py-2.5 text-sm text-white/40 transition hover:bg-white/[.04] hover:text-white"
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </nav>
                </div>

                {/* FOOTER */}

                <div className="mt-auto">
                  {user && (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-between rounded-2xl border border-red-400/10 bg-red-400/[.04] px-4 py-3.5 text-sm text-red-300 transition hover:bg-red-400/[.08]"
                    >
                      <span>Sign out</span>

                      <LogoutRounded
                        sx={{
                          fontSize: 18,
                        }}
                      />
                    </button>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-white/[.06] pt-5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                      Go Venture
                    </span>

                    <span className="text-[9px] text-white/20">
                      Explore Beyond
                    </span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;