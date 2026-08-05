"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { NAV_SECTIONS, MODULES, ROLE_LABELS } from "@/config/roles";
import useCurrentUser from "@/hooks/useCurrentUser";

const ICONS = {
  overview: SpaceDashboardOutlinedIcon,
  users: GroupOutlinedIcon,
  bookings: BookOnlineOutlinedIcon,
  tours: MapOutlinedIcon,
  payments: ReceiptLongOutlinedIcon,
  reviews: ReviewsOutlinedIcon,
  analytics: InsightsOutlinedIcon,
  settings: SettingsOutlinedIcon,
  myTrips: FlightTakeoffOutlinedIcon,
  wishlist: FavoriteBorderOutlinedIcon,
  support: SupportAgentOutlinedIcon,
  account: PersonOutlineOutlinedIcon,
};

const Sidebar = ({ isOpen, toggleDrawer }) => {
  const pathname = usePathname();
  const { user } = useCurrentUser();
  const role = user?.role;

  return (
    <div
      className={`h-screen transition-all duration-300 overflow-y-auto scrollbar-hide ${
        isOpen ? "w-64" : "w-20"
      } bg-white dark:bg-gray-900 border-r dark:border-gray-800 relative flex flex-col`}
    >
      {/* Close Button for Mobile */}
      <div className="md:hidden absolute top-2 right-2 z-10">
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-800">
        <Image src={logo} alt="Go-Venture logo" width={36} height={36} />
        <div className={`${isOpen ? "block" : "hidden"} transition-all duration-300 leading-tight`}>
          <h1 className="text-base font-bold text-secondary dark:text-white">Go-Venture</h1>
          <p className="text-[11px] text-gray-400">Control Center</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-grow py-3">
        {NAV_SECTIONS.map((section) => {
          const items = section.items
            .map((key) => ({ key, ...MODULES[key] }))
            .filter((m) => !role || m.roles.includes(role));
          if (!items.length) return null;

          return (
            <div key={section.title} className="mb-2">
              {isOpen && (
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {section.title}
                </p>
              )}
              {items.map((item) => {
                const Icon = ICONS[item.key] || SpaceDashboardOutlinedIcon;
                const active = pathname === item.path || (item.path !== "/dashboard" && pathname.startsWith(item.path));
                const isSoon = item.status === "soon";

                const content = (
                  <div
                    className={`mx-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                      active
                        ? "bg-primary/10 text-primary font-semibold"
                        : isSoon
                        ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                    {isOpen && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}
                    {isOpen && isSoon && (
                      <span className="text-[9px] font-bold uppercase tracking-wide bg-gray-100 dark:bg-gray-800 text-gray-400 rounded px-1.5 py-0.5">
                        Soon
                      </span>
                    )}
                  </div>
                );

                if (isSoon) {
                  return (
                    <Tooltip key={item.key} title="Coming in the next build phase" placement="right">
                      <div>{content}</div>
                    </Tooltip>
                  );
                }

                return (
                  <Link href={item.path} key={item.key} onClick={toggleDrawer}>
                    {content}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Role footer */}
      {isOpen && role && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400">
          Signed in as <span className="font-semibold text-gray-500">{ROLE_LABELS[role]}</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
