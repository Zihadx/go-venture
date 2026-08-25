"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  AppBar,
  Avatar,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";

import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import logo from "@/assets/logo/logo.png";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/all-destinations" },
  { label: "News", href: "/all-blogs" },
  { label: "Dashboard", href: "/dashboard" },
];

const PROFILE_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardOutlinedIcon,
  },
  {
    label: "Profile",
    href: "/dashboard/account",
    icon: PersonOutlineIcon,
  },
  {
    label: "Bookings",
    href: "/dashboard/customer/trips",
    icon: BookOutlinedIcon,
  },
];

const SECONDARY_ITEMS = ["Settings", "Help", "Feedback", "Guide"];

const Navbar = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:960px)");

  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const userInfo = getUserInfo();

  const user = userInfo?.email || session?.user;
  const userName = userInfo?.name || session?.user?.name || "Traveler";
  const userEmail = userInfo?.email || session?.user?.email;
  const userImage = userInfo?.image || session?.user?.image;

  /* ---------------- ACTIVE ROUTE ---------------- */

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* ---------------- SCROLL ---------------- */

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current <= 30) {
        setScrolled(false);
        setVisible(true);
      } else {
        setScrolled(true);

        if (current > lastScroll + 5) {
          setVisible(false);
          setSearchOpen(false);
          setProfileOpen(false);
        }

        if (current < lastScroll - 5) {
          setVisible(true);
        }
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- OUTSIDE PROFILE CLICK ---------------- */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- LOGOUT ---------------- */

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

  /* ---------------- USER AVATAR ---------------- */

  const UserAvatar = ({ size = 34 }) => (
    userImage ? (
      <Image
        src={userImage}
        alt={userName}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    ) : (
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: "#116A7F",
          fontSize: size <= 34 ? 14 : 18,
        }}
      >
        {userName.charAt(0).toUpperCase()}
      </Avatar>
    )
  );

  /* ---------------- CLOSE MOBILE ---------------- */

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-0 top-0 z-50"
          >
            <div>
              <motion.div
                animate={{
                  backgroundColor: scrolled
                    ? "rgba(255,255,255,.96)"
                    : "rgba(255,255,255,.08)",
                  borderColor: scrolled
                    ? "rgba(15,23,42,.08)"
                    : "rgba(255,255,255,.16)",
                  boxShadow: scrolled
                    ? "0 12px 35px rgba(15,23,42,.10)"
                    : "0 10px 35px rgba(0,0,0,.06)",
                }}
                transition={{ duration: 0.25 }}
                className="relative overflow-visible border backdrop-blur-xl"
              >
                <Toolbar
                  disableGutters
                  className="h-16 custom-container"
                >
                  {/* MOBILE MENU */}

                  {isMobile && (
                    <IconButton
                      onClick={() => setMobileOpen(true)}
                      className={`mr-1 ${
                        scrolled ? "!text-gray-800" : "!text-white"
                      }`}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}

                  {/* LOGO */}

                  <Link
                    href="/"
                    className="flex shrink-0 items-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl">
                      <Image
                        src={logo}
                        alt="Go Ventures"
                        width={40}
                        height={40}
                        className="h-9 w-9 object-contain"
                      />
                    </div>

                    <div className="hidden sm:block">
                      <motion.h1
                        animate={{
                          color: scrolled ? "#111827" : "#fff",
                        }}
                        className="text-lg font-bold"
                      >
                        <span className="text-orange-500">Go V</span>
                        enture
                      </motion.h1>

                      <motion.p
                        animate={{
                          color: scrolled
                            ? "#9ca3af"
                            : "rgba(255,255,255,.5)",
                        }}
                        className="text-[8px] uppercase tracking-[.3em]"
                      >
                        Explore Beyond
                      </motion.p>
                    </div>
                  </Link>

                  {/* DESKTOP NAV */}

                  {!isMobile && (
                    <nav className="absolute left-1/2 -translate-x-1/2">
                      <div
                        className={`flex rounded-full p-1 ${
                          scrolled
                            ? "bg-slate-900/[.05]"
                            : "bg-black/[.10]"
                        }`}
                      >
                        {NAV_ITEMS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="relative rounded-full px-4 py-2.5 text-sm"
                          >
                            {isActive(item.href) && (
                              <motion.span
                                layoutId="activeNav"
                                className="absolute inset-0 rounded-full bg-[#116A7F]"
                                transition={{
                                  type: "spring",
                                  stiffness: 350,
                                  damping: 30,
                                }}
                              />
                            )}

                            <span
                              className={`relative z-10 ${
                                isActive(item.href)
                                  ? "text-white"
                                  : scrolled
                                  ? "text-slate-500"
                                  : "text-white/65"
                              }`}
                            >
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </nav>
                  )}

                  {/* RIGHT SIDE */}

                  <div className="ml-auto flex items-center gap-1">
                    {/* SEARCH */}

                    <IconButton
                      onClick={() => setSearchOpen((v) => !v)}
                      className={
                        scrolled ? "!text-gray-800" : "!text-white"
                      }
                    >
                      {searchOpen ? <CloseIcon /> : <SearchIcon />}
                    </IconButton>

                    {/* PROFILE */}

                    {user ? (
                      <div ref={profileRef} className="relative">
                        <button
                          onClick={() =>
                            setProfileOpen((v) => !v)
                          }
                          className={`ml-1 flex items-center gap-2 rounded-full border p-1 transition ${
                            scrolled
                              ? "border-black/10 bg-black/[.04] hover:bg-black/[.07]"
                              : "border-white/10 bg-white/10 hover:bg-white/15"
                          }`}
                        >
                          <UserAvatar />

                          <span
                            className={`hidden max-w-[90px] truncate pr-2 text-xs font-semibold md:block ${
                              scrolled
                                ? "text-gray-700"
                                : "text-white"
                            }`}
                          >
                            {userName}
                          </span>
                        </button>

                        {/* PROFILE DROPDOWN */}

                        <AnimatePresence>
                          {profileOpen && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: -8,
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
                                scale: 0.96,
                              }}
                              transition={{ duration: 0.18 }}
                              className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
                            >
                              {/* PROFILE HEADER */}

                              <div className="mb-2 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                                <UserAvatar size={42} />

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-gray-800">
                                    {userName}
                                  </p>

                                  <p className="truncate text-xs text-gray-400">
                                    {userEmail}
                                  </p>
                                </div>
                              </div>

                              {/* PROFILE LINKS */}

                              <div className="space-y-1">
                                {PROFILE_ITEMS.map((item) => {
                                  const Icon = item.icon;

                                  return (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() =>
                                        setProfileOpen(false)
                                      }
                                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition hover:bg-[#116A7F]/10 hover:text-[#116A7F]"
                                    >
                                      <Icon fontSize="small" />

                                      <span>{item.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>

                              <div className="my-2 h-px bg-gray-100" />

                              {/* LOGOUT */}

                              <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                              >
                                <LogoutOutlinedIcon fontSize="small" />

                                <span>Logout</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="ml-1 hidden rounded-full bg-[#116A7F] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0D5667] md:block"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                </Toolbar>

                {/* SEARCH */}

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      className="px-4 pb-4"
                    >
                      <div className="mx-auto flex max-w-xl items-center rounded-2xl border border-black/10 bg-black/[.03] px-4 py-3">
                        <SearchIcon className="mr-2 !text-gray-400" />

                        <input
                          autoFocus
                          type="text"
                          placeholder="Search destinations..."
                          className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ================= MOBILE DRAWER ================= */}

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={closeMobile}
        PaperProps={{
          className:
            "!w-[290px] !max-w-[85vw] !rounded-r-3xl !bg-[#111827] !text-white",
        }}
      >
        <div className="flex h-full flex-col p-5">
          {/* HEADER */}

          <div className="mb-7 flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMobile}
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <Image
                  src={logo}
                  alt="Go Ventures"
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              </div>

              <span className="font-bold">
                <span className="text-[#3ca6ba]">Go V</span>
                entures
              </span>
            </Link>

            <IconButton
              onClick={closeMobile}
              className="!text-white"
            >
              <CloseIcon />
            </IconButton>
          </div>

          {/* USER */}

          {user ? (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <UserAvatar size={46} />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {userName}
                </p>

                <p className="truncate text-xs text-white/40">
                  {userEmail}
                </p>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={closeMobile}
              className="mb-6 rounded-xl bg-[#116A7F] py-3 text-center text-sm font-semibold text-white"
            >
              Login
            </Link>
          )}

          {/* MAIN NAV */}

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={`block rounded-xl px-4 py-3.5 text-sm transition ${
                  isActive(item.href)
                    ? "bg-[#116A7F] text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="my-6 h-px bg-white/10" />

          {/* SECONDARY */}

          <nav className="space-y-1">
            {SECONDARY_ITEMS.map((item) => (
              <Link
                key={item}
                href="/"
                onClick={closeMobile}
                className="block rounded-xl px-4 py-2.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* MOBILE LOGOUT */}

          {user && (
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center justify-between rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <span>Logout</span>
              <LogoutOutlinedIcon fontSize="small" />
            </button>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;