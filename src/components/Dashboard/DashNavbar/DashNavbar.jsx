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
  { id: 1, text: "New booking BKG-5041 needs confirmation", time: "5m ago" },
  { id: 2, text: "Refund requested for BKG-5019", time: "1h ago" },
  { id: 3, text: "3 new users signed up today", time: "3h ago" },
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
      <div className="bg-white dark:bg-gray-900 p-4 w-full z-40 sticky top-0">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-4 min-w-0">
            <IconButton onClick={toggleSidebar} className="hidden md:block">
              <MenuIcon />
            </IconButton>
            <IconButton onClick={toggleDrawer} className="md:hidden">
              <MenuIcon />
            </IconButton>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
                {mod?.label || "Dashboard"}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Go-Venture Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <RoleSwitcher />
            </div>

            <ThemeToggle />

            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
              <Badge badgeContent={NOTIFICATIONS.length} color="error">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
            <Menu anchorEl={notifAnchor} open={!!notifAnchor} onClose={() => setNotifAnchor(null)}>
              <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase">Notifications</p>
              <Divider />
              {NOTIFICATIONS.map((n) => (
                <MenuItem key={n.id} onClick={() => setNotifAnchor(null)} className="!whitespace-normal max-w-xs">
                  <div>
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400">{n.time}</p>
                  </div>
                </MenuItem>
              ))}
            </Menu>

            <button
              onClick={(e) => setUserAnchor(e.currentTarget)}
              className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-gray-50 transition-colors"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: user ? ROLE_COLORS[user.role]?.bg : "#e5e7eb",
                  color: user ? ROLE_COLORS[user.role]?.fg : "#374151",
                }}
              >
                {initials}
              </span>
              <span className="hidden md:block text-left leading-tight">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">{user?.name}</span>
                <span className="block text-[11px] text-gray-400">{user ? ROLE_LABELS[user.role] : ""}</span>
              </span>
            </button>
            <Menu anchorEl={userAnchor} open={!!userAnchor} onClose={() => setUserAnchor(null)}>
              <MenuItem disabled className="!opacity-100">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{user?.email}</p>
                  <p className="text-xs text-gray-400">{user ? ROLE_LABELS[user.role] : ""}</p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setUserAnchor(null)}>Account settings</MenuItem>
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
