"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import { getDashboardSummary } from "@/services/dashboard.service";
import { formatCurrency, formatDate, timeAgo } from "@/utils/format";

import StatCard from "@/components/Dashboard/ui/StatCard";
import StatusChip from "@/components/Dashboard/ui/StatusChip";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const card =
  "rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5";

export default function Overview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;

    getDashboardSummary().then((res) => {
      if (active) setData(res);
    });

    return () => {
      active = false;
    };
  }, []);

  /* ---------------- LOADING ---------------- */

  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  const {
    kpis,
    series,
    popularDestinations,
    recentBookings,
    pendingBookings,
    refundRequests,
    totalUsers,
  } = data;

  /* ---------------- ALERTS ---------------- */

  const alerts = [
    {
      icon: <HourglassEmptyOutlinedIcon />,
      text: `${pendingBookings} bookings awaiting confirmation`,
      sub: "Click to review and confirm",
      style:
        "border-amber-200/70 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
      iconStyle:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300",
      textStyle: "text-amber-900 dark:text-amber-200",
    },
    {
      icon: <ReplayOutlinedIcon />,
      text: `${refundRequests} refund requests pending`,
      sub: `Cancellation rate is ${kpis.cancellationRate}%`,
      style:
        "border-rose-200/70 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/30",
      iconStyle:
        "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300",
      textStyle: "text-rose-900 dark:text-rose-200",
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">
      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          icon={<PaidOutlinedIcon />}
          label="Total revenue"
          value={formatCurrency(kpis.totalRevenue)}
          accent="#2095ae"
        />

        <StatCard
          icon={<BookOnlineOutlinedIcon />}
          label="Total bookings"
          value={kpis.totalBookings}
          accent="#7A316F"
        />

        <StatCard
          icon={<GroupOutlinedIcon />}
          label="Active customers"
          value={totalUsers}
          accent="#b59677"
        />

        <StatCard
          icon={<TrendingUpOutlinedIcon />}
          label="Conversion rate"
          value={`${kpis.conversionRate}%`}
          accent="#964834"
        />
      </div>

      {/* =====================================================
          ALERTS
      ====================================================== */}

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {alerts.map((item) => (
          <Link
            key={item.text}
            href="/dashboard/admin/bookings"
            className={`group flex min-w-0 items-center gap-3 rounded-2xl border p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4 ${item.style}`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
            >
              {item.icon}
            </div>

            <div className="min-w-0">
              <p
                className={`truncate text-sm font-bold ${item.textStyle}`}
              >
                {item.text}
              </p>

              <p className="mt-0.5 truncate text-xs opacity-60">
                {item.sub}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* =====================================================
          CHARTS
      ====================================================== */}

      <div className="grid min-w-0 gap-4 sm:gap-5 lg:grid-cols-3">
        {/* Revenue */}

        <div className={`${card} min-w-0 lg:col-span-2`}>
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-gray-100">
                Revenue
              </h3>

              <p className="text-[11px] text-gray-400 sm:text-xs">
                Last 12 months
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400 sm:text-xs">
              Avg: {formatCurrency(kpis.avgBookingValue)}
            </span>
          </div>

          <div className="-mx-2 overflow-hidden sm:mx-0">
            <Chart
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                  animations: {
                    enabled: true,
                  },
                  background: "transparent",
                },

                stroke: {
                  curve: "smooth",
                  width: 3,
                },

                colors: ["#2095ae"],

                dataLabels: {
                  enabled: false,
                },

                xaxis: {
                  categories: series.labels,

                  labels: {
                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },

                  axisBorder: {
                    show: false,
                  },

                  axisTicks: {
                    show: false,
                  },
                },

                yaxis: {
                  labels: {
                    formatter: (v) =>
                      `$${Math.round(v / 1000)}k`,

                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },
                },

                grid: {
                  borderColor: "#e5e7eb",
                  strokeDashArray: 4,
                },

                tooltip: {
                  theme: "dark",

                  y: {
                    formatter: (v) => formatCurrency(v),
                  },
                },

                responsive: [
                  {
                    breakpoint: 640,

                    options: {
                      chart: {
                        height: 230,
                      },

                      xaxis: {
                        labels: {
                          rotate: -45,
                          hideOverlappingLabels: true,
                        },
                      },
                    },
                  },
                ],
              }}
              series={[
                {
                  name: "Revenue",
                  data: series.revenue,
                },
              ]}
              type="area"
              height={260}
            />
          </div>
        </div>

        {/* Top destinations */}

        <div className={`${card} min-w-0`}>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-gray-100">
              Top destinations
            </h3>

            <p className="text-xs text-gray-400">
              Most popular this period
            </p>
          </div>

          <div className="space-y-4">
            {popularDestinations.map((d, i) => {
              const max =
                popularDestinations[0]?.bookings || 1;

              return (
                <div key={d.destination}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="min-w-0 truncate text-gray-600 dark:text-gray-300">
                      <span className="mr-1 text-gray-400">
                        {i + 1}.
                      </span>

                      {d.destination}
                    </span>

                    <span className="shrink-0 font-medium text-gray-400">
                      {d.bookings}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{
                        width: `${(d.bookings / max) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          RECENT BOOKINGS
      ====================================================== */}

      <div className={card}>
        {/* Header */}

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-gray-100">
              Recent bookings
            </h3>

            <p className="hidden text-xs text-gray-400 sm:block">
              Latest customer activity
            </p>
          </div>

          <Link
            href="/dashboard/admin/bookings"
            className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10 sm:text-sm"
          >
            View all
          </Link>
        </div>

        {/* =================================================
            MOBILE BOOKING CARDS
        ================================================= */}

        <div className="space-y-3 md:hidden">
          {recentBookings.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 transition hover:border-gray-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/40 dark:hover:border-gray-700"
            >
              {/* Top */}

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                    {b.id}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                    {b.customer.name}
                  </p>
                </div>

                <div className="shrink-0">
                  <StatusChip status={b.status} />
                </div>
              </div>

              {/* Details */}

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-200/70 pt-3 dark:border-gray-700">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    Destination
                  </p>

                  <p className="mt-0.5 truncate text-xs font-medium text-gray-700 dark:text-gray-300">
                    {b.destination}
                  </p>
                </div>

                <div className="min-w-0 text-right">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    Amount
                  </p>

                  <p className="mt-0.5 truncate text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(b.amount)}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    Travel date
                  </p>

                  <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                    {formatDate(b.travelDate)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    Booked
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {timeAgo(b.bookedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =================================================
            TABLET / DESKTOP TABLE
        ================================================= */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs text-gray-400 dark:border-gray-800">
                {[
                  "Booking",
                  "Customer",
                  "Destination",
                  "Travel date",
                  "Amount",
                  "Status",
                  "Booked",
                ].map((x) => (
                  <th
                    key={x}
                    className="whitespace-nowrap px-3 py-3 font-medium"
                  >
                    {x}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                >
                  <td className="px-3 py-3 font-semibold text-gray-800 dark:text-gray-200">
                    {b.id}
                  </td>

                  <td className="max-w-[150px] truncate px-3 py-3 text-gray-600 dark:text-gray-300">
                    {b.customer.name}
                  </td>

                  <td className="max-w-[150px] truncate px-3 py-3 text-gray-600 dark:text-gray-300">
                    {b.destination}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(b.travelDate)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-700 dark:text-gray-200">
                    {formatCurrency(b.amount)}
                  </td>

                  <td className="px-3 py-3">
                    <StatusChip status={b.status} />
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-gray-400">
                    {timeAgo(b.bookedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}