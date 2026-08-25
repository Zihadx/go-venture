"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo/logo.png";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";

const NavItems = [
  { route: "Home", pathname: "/" },
  { route: "Destinations", pathname: "/all-destinations" },
  { route: "News", pathname: "/all-blogs" },
  { route: "Dashboard", pathname: "/dashboard" },
];

const Navbar = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:960px)");

  const userInfo = getUserInfo();
  const user = userInfo?.email || session?.user;

  const userName =
    userInfo?.name || session?.user?.name || "Traveler";

  const userImage = userInfo?.image || session?.user?.image;

  /* --------------------------------
     SCROLL BEHAVIOR
  -------------------------------- */
  useEffect(() => {
    let lastScroll = window.scrollY;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      // Top of page
      if (currentScroll <= 30) {
        setIsScrolled(false);
        setIsVisible(true);
      }

      // Scrolled page
      else {
        setIsScrolled(true);

        // Scrolling down → hide
        if (currentScroll > lastScroll + 5) {
          setIsVisible(false);
          setSearchOpen(false);
        }

        // Scrolling up → show
        if (currentScroll < lastScroll - 5) {
          setIsVisible(true);
        }
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --------------------------------
     LOGOUT
  -------------------------------- */
  const handleLogout = async () => {
    try {
      removeUserInfo();

      await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* --------------------------------
     ACTIVE ROUTE
  -------------------------------- */
  const isActive = (path) =>
    path === "/"
      ? pathname === "/"
      : pathname.startsWith(path);

  /* --------------------------------
     DYNAMIC NAVBAR COLORS
  -------------------------------- */
  const navText = isScrolled
    ? "text-gray-800"
    : "text-white";

  const mutedText = isScrolled
    ? "text-gray-500 hover:text-[#116A7F]"
    : "text-white/65 hover:text-white";

  const iconColor = isScrolled
    ? "!text-gray-800"
    : "!text-white";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-0 top-0 z-50"
          >
            <Container
              maxWidth="xl"
              className="px-4 lg:px-12"
            >
              <motion.div
                animate={{
                  backgroundColor: isScrolled
                    ? "rgba(255,255,255,0.94)"
                    : "rgba(255,255,255,0.08)",
                  borderColor: isScrolled
                    ? "rgba(15,23,42,0.08)"
                    : "rgba(255,255,255,0.16)",
                  boxShadow: isScrolled
                    ? "0 12px 35px rgba(15,23,42,0.10)"
                    : "0 10px 35px rgba(0,0,0,0.06)",
                }}
                transition={{ duration: 0.25 }}
                className="
                  mt-4
                  overflow-hidden
                  rounded-2xl
                  border
                  backdrop-blur-xl
                "
              >
                <Toolbar
                  disableGutters
                  className="h-[64px] px-3 md:px-5"
                >
                  {/* MOBILE MENU */}
                  {isMobile && (
                    <IconButton
                      onClick={() => setMenuOpen(true)}
                      className={`mr-2 ${iconColor}`}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}

                  {/* LOGO */}
                  <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2.5"
                  >
                    <div
                      className="
                        flex h-11 w-11
                        items-center justify-center
                        rounded-xl bg-white
                        shadow-sm
                      "
                    >
                      <Image
                        src={logo}
                        alt="Go Ventures"
                        width={42}
                        height={42}
                        className="h-10 w-10 object-contain"
                      />
                    </div>

                    <div className="hidden sm:block">
                      <motion.h1
                        animate={{
                          color: isScrolled
                            ? "#111827"
                            : "#ffffff",
                        }}
                        className="
                          text-lg
                          font-bold
                          tracking-tight
                        "
                      >
                        <span className="text-orange-500">
                          Go V
                        </span>
                        entures
                      </motion.h1>

                      <motion.p
                        animate={{
                          color: isScrolled
                            ? "#9ca3af"
                            : "rgba(255,255,255,.5)",
                        }}
                        className="
                          text-[8px]
                          uppercase
                          tracking-[.3em]
                        "
                      >
                        Explore Beyond
                      </motion.p>
                    </div>
                  </Link>

                  {/* DESKTOP NAVIGATION */}
                  {!isMobile && (
                    <nav
                      className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                      "
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isScrolled
                            ? "rgba(15,23,42,.05)"
                            : "rgba(0,0,0,.10)",
                        }}
                        className="flex rounded-full p-1"
                      >
                        {NavItems.map((item) => (
                          <Link
                            key={item.pathname}
                            href={item.pathname}
                            className="
                              relative
                              rounded-full
                              px-5 py-2.5
                              text-sm
                            "
                          >
                            {/* ACTIVE BACKGROUND */}
                            {isActive(item.pathname) && (
                              <motion.span
                                layoutId="activeNav"
                                transition={{
                                  type: "spring",
                                  stiffness: 350,
                                  damping: 30,
                                }}
                                className="
                                  absolute
                                  inset-0
                                  rounded-full
                                  bg-[#116A7F]
                                "
                              />
                            )}

                            {/* NAV TEXT */}
                            <motion.span
                              animate={{
                                color: isActive(item.pathname)
                                  ? "#ffffff"
                                  : isScrolled
                                  ? "#64748b"
                                  : "rgba(255,255,255,.65)",
                              }}
                              className="
                                relative
                                z-10
                                transition-colors
                                duration-300
                              "
                            >
                              {item.route}
                            </motion.span>
                          </Link>
                        ))}
                      </motion.div>
                    </nav>
                  )}

                  {/* RIGHT SIDE */}
                  <div className="ml-auto flex items-center gap-1">
                    {/* SEARCH */}
                    <IconButton
                      onClick={() =>
                        setSearchOpen((prev) => !prev)
                      }
                      className={iconColor}
                    >
                      {searchOpen ? (
                        <CloseIcon />
                      ) : (
                        <SearchIcon />
                      )}
                    </IconButton>

                    {/* USER */}
                    {user ? (
                      <Link
                        href="/dashboard"
                        className="
                          ml-1
                          hidden
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-black/5
                          bg-black/[.04]
                          py-1
                          pl-1
                          pr-4
                          md:flex
                        "
                      >
                        {userImage ? (
                          <Image
                            src={userImage}
                            alt={userName}
                            width={34}
                            height={34}
                            className="
                              h-[34px]
                              w-[34px]
                              rounded-full
                              object-cover
                            "
                          />
                        ) : (
                          <Avatar
                            className="
                              !h-[34px]
                              !w-[34px]
                              !bg-[#116A7F]
                            "
                          >
                            {userName.charAt(0)}
                          </Avatar>
                        )}

                        <span
                          className="
                            max-w-[90px]
                            truncate
                            text-xs
                            font-medium
                          "
                        >
                          {userName}
                        </span>
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="
                          ml-2
                          hidden
                          rounded-full
                          bg-[#116A7F]
                          px-5 py-2.5
                          text-xs
                          font-semibold
                          text-white
                          shadow-sm
                          transition-all
                          hover:bg-[#0D5667]
                          hover:shadow-md
                          md:block
                        "
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
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
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
                      <div
                        className="
                          mx-auto
                          flex
                          max-w-xl
                          items-center
                          rounded-2xl
                          border
                          border-black/10
                          bg-black/[.03]
                          px-4 py-3
                        "
                      >
                        <SearchIcon
                          className="
                            mr-2
                            !text-gray-400
                          "
                        />

                        <input
                          autoFocus
                          type="text"
                          placeholder="Search destinations..."
                          className="
                            w-full
                            bg-transparent
                            text-sm
                            text-gray-800
                            outline-none
                            placeholder:text-gray-400
                          "
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          className:
            "!w-[300px] !rounded-r-3xl !bg-[#111827] !text-white",
        }}
      >
        <div
          className="
            flex
            h-full
            flex-col
            p-5
          "
        >
          {/* DRAWER HEADER */}
          <div
            className="
              mb-8
              flex
              items-center
              justify-between
            "
          >
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <div
                className="
                  flex h-10 w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                "
              >
                <Image
                  src={logo}
                  alt="Go Ventures"
                  width={38}
                  height={38}
                  className="h-9 w-9 object-contain"
                />
              </div>

              <span className="font-bold">
                <span className="text-[#116A7F]">
                  Go V
                </span>
                entures
              </span>
            </Link>

            <IconButton
              onClick={() => setMenuOpen(false)}
              className="!text-white"
            >
              <CloseIcon />
            </IconButton>
          </div>

          {/* USER */}
          {user ? (
            <div
              className="
                mb-6
                flex
                items-center
                gap-3
                rounded-2xl
                bg-white/5
                p-4
              "
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={48}
                  height={48}
                  className="
                    h-12 w-12
                    rounded-full
                    object-cover
                  "
                />
              ) : (
                <Avatar className="!bg-[#116A7F]">
                  {userName.charAt(0)}
                </Avatar>
              )}

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                  "
                >
                  {userName}
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-white/40
                  "
                >
                  {userInfo?.email ||
                    session?.user?.email}
                </p>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="
                mb-6
                rounded-xl
                bg-[#116A7F]
                py-3
                text-center
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#0D5667]
              "
            >
              Login
            </Link>
          )}

          {/* MAIN LINKS */}
          <nav className="space-y-1">
            {NavItems.map((item) => (
              <Link
                key={item.pathname}
                href={item.pathname}
                onClick={() => setMenuOpen(false)}
                className={`
                  block
                  rounded-xl
                  px-4 py-3.5
                  text-sm
                  transition
                  ${
                    isActive(item.pathname)
                      ? "bg-[#116A7F] text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {item.route}
              </Link>
            ))}
          </nav>

          <div
            className="
              my-6
              h-px
              bg-white/10
            "
          />

          {/* SECONDARY LINKS */}
          <nav
            className="
              space-y-1
              text-sm
              text-white/50
            "
          >
            {[
              "Settings",
              "Helps",
              "Feedback",
              "Bookings",
              "Guide",
            ].map((item) => (
              <Link
                key={item}
                href="/"
                className="
                  block
                  rounded-xl
                  px-4 py-2.5
                  hover:bg-white/5
                  hover:text-white
                "
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* LOGOUT */}
          {user && (
            <button
              onClick={handleLogout}
              className="
                mt-auto
                flex
                items-center
                justify-between
                rounded-xl
                px-4 py-3
                text-sm
                text-red-400
                hover:bg-red-500/10
              "
            >
              Logout
              <LogoutOutlined fontSize="small" />
            </button>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;