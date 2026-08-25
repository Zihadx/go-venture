"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import { getSupportAnalytics, getTickets } from "@/services/customer.service";
import { timeAgo } from "@/utils/format";
import StatCard from "@/components/Dashboard/ui/StatCard";
import StatusChip from "@/components/Dashboard/ui/StatusChip";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SupportOverview() {
  const [data, setData] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getSupportAnalytics().then(setData);
    getTickets({}).then((rows) => setRecent(rows.slice(0, 6)));
  }, []);

  if (!data)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-gray-100 dark:bg-white/[0.04] animate-pulse"
          />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Support dashboard
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ticket queue health and response performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={<ConfirmationNumberOutlinedIcon />}
          label="Total tickets"
          value={data.total}
          accent="#2095ae"
        />
        <StatCard
          icon={<HourglassEmptyOutlinedIcon />}
          label="Open"
          value={data.byStatus.open || 0}
          accent="#b59677"
        />
        <StatCard
          icon={<CheckCircleOutlineOutlinedIcon />}
          label="Resolved"
          value={data.resolvedCount}
          accent="#0EA65F"
        />
        <StatCard
          icon={<PriorityHighOutlinedIcon />}
          label="High priority"
          value={data.highPriorityOpen}
          accent="#DC2626"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 dashboard-card">
          <h3 className="dashboard-title">
            Ticket volume — last 7 days
          </h3>

          {/* CHART UNCHANGED */}
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
              colors: ["#2095ae"],
              dataLabels: { enabled: false },
              xaxis: {
                categories: data.trend.labels,
                labels: { style: { colors: "#9ca3af" } },
              },
              yaxis: {
                labels: { style: { colors: "#9ca3af" } },
              },
              grid: { borderColor: "#f1f5f9" },
            }}
            series={[{ name: "Tickets", data: data.trend.volume }]}
            type="bar"
            height={280}
          />
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-title">By status</h3>

          {/* CHART UNCHANGED */}
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              labels: ["Open", "In progress", "Resolved"],
              colors: ["#F59E0B", "#3730A3", "#0EA65F"],
              legend: { position: "bottom" },
              dataLabels: { enabled: false },
            }}
            series={[
              data.byStatus.open || 0,
              data.byStatus.in_progress || 0,
              data.byStatus.resolved || 0,
            ]}
            type="donut"
            height={280}
          />

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
            Avg. {data.avgRepliesPerTicket} replies per ticket
          </p>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="dashboard-title !mb-0">Recent tickets</h3>

          <Link
            href="/dashboard/support"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Go to queue →
          </Link>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-white/[0.06]">
          {recent.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {ticket.subject}
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {ticket.customer.name} · {timeAgo(ticket.createdAt)}
                </p>
              </div>

              <StatusChip status={ticket.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}