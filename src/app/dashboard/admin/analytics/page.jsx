"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

import { getAnalyticsOverview } from "@/services/dashboard.service";
import { formatCurrency } from "@/utils/format";
import { exportToCsv } from "@/utils/exportCsv";
import StatCard from "@/components/Dashboard/ui/StatCard";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const card =
  "min-w-0 overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-5";

const chartOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: "inherit",
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "light",
  },
  grid: {
    borderColor: "#e5e7eb",
    strokeDashArray: 4,
  },
};

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;

    getAnalyticsOverview().then((res) => {
      if (alive) setData(res);
    });

    return () => {
      alive = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
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
    agentPerformance,
  } = data;

  return (
    <div className="w-full min-w-0 space-y-5 pb-8 sm:space-y-6">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Analytics
          </p>

          <h1 className="mt-1 truncate text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-xl">
            Business performance
          </h1>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Business performance across the last 12 months.
          </p>
        </div>

        <button
          onClick={() =>
            exportToCsv("go-venture-report-summary", [
              {
                metric: "Total revenue",
                value: kpis.totalRevenue,
              },
              {
                metric: "Total bookings",
                value: kpis.totalBookings,
              },
              {
                metric: "Active customers",
                value: kpis.activeCustomers,
              },
              {
                metric: "Conversion rate (%)",
                value: kpis.conversionRate,
              },
              {
                metric: "Cancellation rate (%)",
                value: kpis.cancellationRate,
              },
              {
                metric: "Average booking value",
                value: kpis.avgBookingValue,
              },
            ])
          }
          className="flex w-full items-center justify-center rounded-xl border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/5 active:scale-[0.98] sm:w-auto"
        >
          Export summary report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          icon={<TrendingUpOutlinedIcon />}
          label="Conversion rate"
          value={`${kpis.conversionRate}%`}
          accent="#0EA65F"
        />

        <StatCard
          icon={<TrendingDownOutlinedIcon />}
          label="Cancellation rate"
          value={`${kpis.cancellationRate}%`}
          accent="#DC2626"
        />

        <StatCard
          icon={<PaidOutlinedIcon />}
          label="Avg. booking value"
          value={formatCurrency(kpis.avgBookingValue)}
          accent="#b59677"
        />

        <StatCard
          icon={<BookOnlineOutlinedIcon />}
          label="Active customers"
          value={kpis.activeCustomers}
          accent="#964834"
        />
      </div>

      {/* Booking + Cancellation */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Booking Trend */}
        <div className={card}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-base">
                Booking trend
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Monthly booking activity
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-semibold text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
              12 Months
            </span>
          </div>

          <div className="w-full min-w-0 overflow-hidden">
            <Chart
              options={{
                ...chartOptions,

                plotOptions: {
                  bar: {
                    borderRadius: 6,
                    columnWidth: "52%",
                  },
                },

                colors: ["#7A316F"],

                xaxis: {
                  categories: series.labels,
                  labels: {
                    rotate: -45,
                    hideOverlappingLabels: true,
                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },
                },

                yaxis: {
                  labels: {
                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },
                },

                responsive: [
                  {
                    breakpoint: 640,
                    options: {
                      chart: {
                        height: 230,
                      },
                      plotOptions: {
                        bar: {
                          columnWidth: "48%",
                        },
                      },
                    },
                  },
                ],
              }}
              series={[
                {
                  name: "Bookings",
                  data: series.bookingsCount,
                },
              ]}
              type="bar"
              height={280}
            />
          </div>
        </div>

        {/* Cancellation */}
        <div className={card}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-base">
                Cancellations per month
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Monthly cancellation activity
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300">
              Monitoring
            </span>
          </div>

          <div className="w-full min-w-0 overflow-hidden">
            <Chart
              options={{
                ...chartOptions,

                stroke: {
                  curve: "smooth",
                  width: 3,
                },

                colors: ["#DC2626"],

                markers: {
                  size: 3,
                  strokeWidth: 0,
                  hover: {
                    size: 5,
                  },
                },

                xaxis: {
                  categories: series.labels,
                  labels: {
                    rotate: -45,
                    hideOverlappingLabels: true,
                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },
                },

                yaxis: {
                  labels: {
                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },
                },

                responsive: [
                  {
                    breakpoint: 640,
                    options: {
                      chart: {
                        height: 230,
                      },
                      markers: {
                        size: 2,
                      },
                    },
                  },
                ],
              }}
              series={[
                {
                  name: "Cancellations",
                  data: series.cancellations,
                },
              ]}
              type="line"
              height={280}
            />
          </div>
        </div>
      </div>

      {/* Destination + Agent */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Popular Destinations */}
        <div className={card}>
          <div className="mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-base">
              Popular destinations
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Most booked destinations
            </p>
          </div>

          <div className="w-full min-w-0 overflow-hidden">
            <Chart
              options={{
                ...chartOptions,

                plotOptions: {
                  bar: {
                    horizontal: true,
                    borderRadius: 6,
                    barHeight: "55%",
                  },
                },

                colors: ["#2095ae"],

                xaxis: {
                  categories: popularDestinations.map(
                    (d) => d.destination
                  ),
                  labels: {
                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },
                },

                yaxis: {
                  labels: {
                    maxWidth: 110,
                    style: {
                      colors: "#94a3b8",
                      fontSize: "10px",
                    },
                  },
                },

                responsive: [
                  {
                    breakpoint: 640,
                    options: {
                      chart: {
                        height: 250,
                      },
                      yaxis: {
                        labels: {
                          maxWidth: 90,
                        },
                      },
                    },
                  },
                ],
              }}
              series={[
                {
                  name: "Bookings",
                  data: popularDestinations.map(
                    (d) => d.bookings
                  ),
                },
              ]}
              type="bar"
              height={280}
            />
          </div>
        </div>

        {/* Agent Performance */}
        <div className={card}>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-base">
                Agent performance
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Performance comparison by agent
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {agentPerformance.length} Agents
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
            <TableContainer
              sx={{
                overflowX: "auto",
              }}
            >
              <Table
                size="small"
                sx={{
                  minWidth: 620,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "rgba(148, 163, 184, 0.08)",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        color: "inherit",
                      }}
                    >
                      Agent
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Bookings
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Revenue
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Commission
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Cancel rate
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {agentPerformance.map((a) => (
                    <TableRow
                      key={a.agent}
                      hover
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          fontWeight: 600,
                        }}
                      >
                        {a.agent}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.totalBookings}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatCurrency(a.revenue)}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatCurrency(a.commission)}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          whiteSpace: "nowrap",
                          color:
                            a.cancellationRate > 20
                              ? "#dc2626"
                              : "#64748b",
                          fontWeight:
                            a.cancellationRate > 20
                              ? 700
                              : 500,
                        }}
                      >
                        {a.cancellationRate}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <p className="mt-2 text-[11px] text-gray-400 sm:hidden">
            Swipe horizontally to view all columns.
          </p>
        </div>
      </div>
    </div>
  );
}