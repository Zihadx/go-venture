"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { IconButton, Menu, MenuItem, Badge, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { findModuleByPath, ROLE_LABELS, ROLE_COLORS } from "@/config/roles";
import useCurrentUser from "@/hooks/useCurrentUser";
import RoleSwitcher from "@/components/Dashboard/RoleSwitcher/RoleSwitcher";
import ThemeToggle from "@/components/Dashboard/ThemeToggle/ThemeToggle";

const NOTIFICATIONS = [
  {
    id: 1,
    text: "New booking BKG-5041 needs confirmation",
    time: "5m ago",
  },
  {
    id: 2,
    text: "Refund requested for BKG-5019",
    time: "1h ago",
  },
  {
    id: 3,
    text: "3 new users signed up today",
    time: "3h ago",
  },
];

const DashNavbar = ({ toggleSidebar, toggleDrawer }) => {
  const pathname = usePathname();
  const { user } = useCurrentUser();

  const mod = findModuleByPath(pathname);

  const [notifAnchor, setNotifAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);

  const initials = (user?.name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div>
      {/* ================= NAVBAR ================= */}
      <div
        className="
          sticky top-0 z-40
          w-full
          border-b border-gray-200
          bg-white
          p-3
          dark:border-gray-800
          dark:bg-gray-900
          sm:p-4
        "
      >
        <div className="flex w-full items-center justify-between px-1 sm:px-2">
          {/* LEFT SIDE */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            {/* ONE MENU BUTTON FOR BOTH DESKTOP & MOBILE */}
            <IconButton
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleDrawer();
                } else {
                  toggleSidebar();
                }
              }}
              className="!flex shrink-0"
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </IconButton>

            {/* PAGE TITLE */}
            <div className="min-w-0">
              <h1
                className="
                  truncate
                  text-base
                  font-bold
                  text-gray-800
                  dark:text-gray-100
                  sm:text-lg
                "
              >
                {mod?.label || "Dashboard"}
              </h1>

              <p className="hidden text-xs text-gray-400 sm:block">
                Go-Venture Control Center
              </p>
            </div>
          </div>
        <div className="hidden sm:block rounded-xl border border-gray-200/50 bg-white/50 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-xl dark:border-white/[0.12] dark:bg-white/[0.07] dark:text-gray-200">
  <p>
    Everything is accessible for preview{" "}
    <span className="ml-2 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700 backdrop-blur-md dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-300">
      !RBAC
    </span>
  </p>
</div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* ROLE SWITCHER */}
            <div className="hidden sm:block">
              <RoleSwitcher />
            </div>

            {/* THEME */}
            <ThemeToggle />

            {/* NOTIFICATIONS */}
            <IconButton
              onClick={(e) => setNotifAnchor(e.currentTarget)}
              aria-label="Notifications"
            >
              <Badge badgeContent={NOTIFICATIONS.length} color="error">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>

            {/* NOTIFICATION MENU */}
            <Menu
              anchorEl={notifAnchor}
              open={!!notifAnchor}
              onClose={() => setNotifAnchor(null)}
              slotProps={{
                paper: {
                  className:
                    "!mt-2 !max-w-[calc(100vw-32px)] !rounded-xl dark:!bg-gray-800",
                },
              }}
            >
              <p className="px-4 py-2 text-xs font-bold uppercase text-gray-400">
                Notifications
              </p>

              <Divider />

              {NOTIFICATIONS.map((n) => (
                <MenuItem
                  key={n.id}
                  onClick={() => setNotifAnchor(null)}
                  className="!max-w-xs !whitespace-normal"
                >
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {n.text}
                    </p>

                    <p className="text-xs text-gray-400">{n.time}</p>
                  </div>
                </MenuItem>
              ))}
            </Menu>

            {/* USER */}
            <button
              onClick={(e) => setUserAnchor(e.currentTarget)}
              className="
                flex
                items-center
                gap-2
                rounded-full
                pl-1
                pr-1
                py-1
                transition-colors
                hover:bg-gray-50
                dark:hover:bg-gray-800
                sm:pr-3
              "
              aria-label="Open user menu"
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-xs
                  font-bold
                "
                style={{
                  backgroundColor: user
                    ? ROLE_COLORS[user.role]?.bg
                    : "#e5e7eb",
                  color: user ? ROLE_COLORS[user.role]?.fg : "#374151",
                }}
              >
                {initials}
              </span>

              <span className="hidden text-left leading-tight md:block">
                <span className="block max-w-[120px] truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {user?.name}
                </span>

                <span className="block text-[11px] text-gray-400">
                  {user ? ROLE_LABELS[user.role] : ""}
                </span>
              </span>
            </button>

            {/* USER MENU */}
            <Menu
              anchorEl={userAnchor}
              open={!!userAnchor}
              onClose={() => setUserAnchor(null)}
              slotProps={{
                paper: {
                  className:
                    "!mt-2 !min-w-[220px] !rounded-xl dark:!bg-gray-800",
                },
              }}
            >
              <MenuItem disabled className="!opacity-100">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {user?.email}
                  </p>

                  <p className="text-xs text-gray-400">
                    {user ? ROLE_LABELS[user.role] : ""}
                  </p>
                </div>
              </MenuItem>

              <Divider />

              <MenuItem onClick={() => setUserAnchor(null)}>
                Account settings
              </MenuItem>

              <MenuItem onClick={() => setUserAnchor(null)}>Sign out</MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  );
};

export default DashNavbar;
