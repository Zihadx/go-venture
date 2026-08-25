"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FlightTakeoffOutlined,
  FavoriteBorderOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";

import { getBookingsByCustomerEmail } from "@/services/dashboard.service";
import { getWishlist, getTickets } from "@/services/customer.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatCurrency, formatDate } from "@/utils/format";
import StatusChip from "@/components/Dashboard/ui/StatusChip";
import StatCard from "@/components/Dashboard/ui/StatCard";

const ACTIVE_STATUSES = ["pending", "confirmed", "ongoing"];

const card =
  "rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none";

export default function CustomerOverview() {
  const { user } = useCurrentUser();

  const [bookings, setBookings] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    Promise.all([
      getBookingsByCustomerEmail(user.email),
      getWishlist(user.email),
      getTickets({ email: user.email }),
    ]).then(([bk, wl, tk]) => {
      setBookings(bk);
      setWishlistCount(wl.length);
      setOpenTickets(tk.filter((t) => t.status !== "resolved").length);
      setLoading(false);
    });
  }, [user?.email]);

  const upcoming = bookings.filter((b) => ACTIVE_STATUSES.includes(b.status));

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5"
          />
        ))}
      </div>
    );
  }

  const stats = [
    {
      icon: <FlightTakeoffOutlined />,
      label: "Upcoming trips",
      value: upcoming.length,
      accent: "#2095ae",
    },
    {
      icon: <FavoriteBorderOutlined />,
      label: "Wishlist",
      value: wishlistCount,
      accent: "#DC2626",
    },
    {
      icon: <SupportAgentOutlined />,
      label: "Open support tickets",
      value: openTickets,
      accent: "#7A316F",
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <header>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Travel overview
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {user.name?.split(" ")[0]} 👋
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your travel plans.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            accent={stat.accent}
          />
        ))}
      </div>

      {/* Upcoming Trips */}
      <section className={`${card} p-5`}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Upcoming trips
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Your next travel experiences
            </p>
          </div>

          <Link
            href="/dashboard/customer/trips"
            className="text-sm font-semibold text-primary transition hover:opacity-70"
          >
            View all
          </Link>
        </div>

        {!upcoming.length ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/40 py-12 text-center dark:border-white/[0.08] dark:bg-white/[0.015]">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15">
              <FlightTakeoffOutlined />
            </div>

            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              No upcoming trips yet
            </p>

            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              Start planning your next adventure.
            </p>

            <Link
              href="/all-destinations"
              className="button-primary mt-4 inline-flex px-4 py-2 text-sm"
            >
              Browse destinations
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-white/[0.055]">
            {upcoming.slice(0, 4).map((booking) => (
              <div
                key={booking.id}
                className="
          group flex items-center justify-between gap-4 rounded-xl p-3
          transition-all duration-200
          hover:bg-gray-50
          dark:hover:bg-white/[0.025]
        "
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {booking.destination}
                  </p>

                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(booking.travelDate)} · {booking.travelers}{" "}
                    traveler
                    {booking.travelers > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-sm font-semibold text-gray-700 dark:text-gray-300 sm:block">
                    {formatCurrency(booking.amount)}
                  </span>

                  <StatusChip status={booking.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
