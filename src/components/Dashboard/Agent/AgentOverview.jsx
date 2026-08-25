"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  BookOnlineOutlined,
  PaidOutlined,
  HourglassEmptyOutlined,
  FlightTakeoffOutlined,
  CheckBoxOutlineBlank,
  CheckBox,
} from "@mui/icons-material";

import { getAgentDashboard } from "@/services/dashboard.service";
import { formatCurrency, formatDate } from "@/utils/format";
import useCurrentUser from "@/hooks/useCurrentUser";
import StatCard from "@/components/Dashboard/ui/StatCard";
import StatusChip from "@/components/Dashboard/ui/StatusChip";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const card =
  "rounded-2xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none";

export default function AgentOverview() {
  const { user } = useCurrentUser();
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.name) return;

    getAgentDashboard(user.name).then((res) => {
      setData(res);
      setTasks(res.tasks);
    });
  }, [user?.name]);

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  if (!data) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5"
          />
        ))}
      </div>
    );
  }

  const { kpis, series, customers, recentBookings } = data;

  const stats = [
    [BookOnlineOutlined, "My bookings", kpis.totalBookings, "#7A316F"],
    [PaidOutlined, "My commission", formatCurrency(kpis.commission), "#2095ae"],
    [FlightTakeoffOutlined, "Upcoming trips", kpis.upcoming, "#0EA65F"],
    [
      HourglassEmptyOutlined,
      "Awaiting confirmation",
      kpis.pending,
      "#b59677",
    ],
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <header>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Agent workspace
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {data.agentName}
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your bookings, commission, and customer portfolio.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(([Icon, label, value, accent]) => (
          <StatCard
            key={label}
            icon={<Icon />}
            label={label}
            value={value}
            accent={accent}
          />
        ))}
      </div>

      {/* Chart + Tasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={`${card} p-5 lg:col-span-2`}>
          <div className="mb-2">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Bookings & commission
            </h3>

            <p className="text-xs text-gray-400">
              Performance over the last 12 months
            </p>
          </div>

          {/* CHART — intentionally unchanged */}
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              stroke: { curve: "smooth", width: [0, 3] },
              colors: ["#7A316F", "#2095ae"],
              plotOptions: {
                bar: { columnWidth: "45%", borderRadius: 4 },
              },
              dataLabels: { enabled: false },
              xaxis: {
                categories: series.labels,
                labels: {
                  style: { colors: "#9ca3af" },
                },
              },
              yaxis: [
                {
                  title: { text: "Bookings" },
                  labels: { style: { colors: "#9ca3af" } },
                },
                {
                  opposite: true,
                  title: { text: "Commission ($)" },
                  labels: { style: { colors: "#9ca3af" } },
                },
              ],
              grid: { borderColor: "#f1f5f9" },
              legend: { position: "top" },
            }}
            series={[
              {
                name: "Bookings",
                type: "column",
                data: series.bookingsCount,
              },
              {
                name: "Commission",
                type: "line",
                data: series.commission,
              },
            ]}
            type="line"
            height={300}
          />
        </div>

        {/* Tasks */}
        <section className={`${card} p-5`}>
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">
              My tasks
            </h3>
            <p className="text-xs text-gray-400">
              Stay on top of your priorities
            </p>
          </div>

          <div className="space-y-1">
            {!tasks.length && (
              <p className="py-6 text-center text-sm text-gray-400">
                No open tasks — nice work.
              </p>
            )}

            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-gray-50 dark:hover:bg-white/5"
              >
                {task.done ? (
                  <CheckBox
                    sx={{ fontSize: 20, color: "#0EA65F" }}
                  />
                ) : (
                  <CheckBoxOutlineBlank
                    sx={{ fontSize: 20, color: "#d1d5db" }}
                  />
                )}

                <div className="min-w-0">
                  <p
                    className={`text-sm ${
                      task.done
                        ? "text-gray-400 line-through"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Due in {task.dueInDays}d
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Customers + Bookings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customers */}
        <section className={`${card} p-5`}>
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">
              My customers
            </h3>
            <p className="text-xs text-gray-400">
              Your customer portfolio
            </p>
          </div>

          <div className="max-h-72 space-y-1 overflow-y-auto">
            {customers.map((customer) => (
              <div
                key={customer.email}
                className="flex items-center justify-between rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {customer.name}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {customer.email}
                  </p>
                </div>

                <div className="ml-4 text-right">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {formatCurrency(customer.spend)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {customer.bookings} booking
                    {customer.bookings > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent bookings */}
        <section className={`${card} p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Recent bookings
              </h3>
              <p className="text-xs text-gray-400">
                Latest customer activity
              </p>
            </div>

            <Link
              href="/dashboard/admin/bookings"
              className="text-sm font-semibold text-primary transition hover:opacity-70"
            >
              View all
            </Link>
          </div>

          <div className="space-y-1">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {booking.destination}
                  </p>

                  <p className="truncate text-xs text-gray-400">
                    {booking.customer.name} ·{" "}
                    {formatDate(booking.travelDate)}
                  </p>
                </div>

                <div className="ml-4 flex items-center gap-3">
                  <span className="hidden text-sm font-medium text-gray-600 dark:text-gray-300 sm:block">
                    {formatCurrency(booking.amount)}
                  </span>

                  <StatusChip status={booking.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}