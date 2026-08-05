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

  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Support dashboard</h2>
        <p className="text-gray-500">Ticket queue health and response performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<ConfirmationNumberOutlinedIcon />} label="Total tickets" value={data.total} accent="#2095ae" />
        <StatCard icon={<HourglassEmptyOutlinedIcon />} label="Open" value={data.byStatus.open || 0} accent="#b59677" />
        <StatCard icon={<CheckCircleOutlineOutlinedIcon />} label="Resolved" value={data.resolvedCount} accent="#0EA65F" />
        <StatCard icon={<PriorityHighOutlinedIcon />} label="High priority open" value={data.highPriorityOpen} accent="#DC2626" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-2">Ticket volume — last 7 days</h3>
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
              colors: ["#2095ae"],
              dataLabels: { enabled: false },
              xaxis: { categories: data.trend.labels, labels: { style: { colors: "#9ca3af" } } },
              yaxis: { labels: { style: { colors: "#9ca3af" } } },
              grid: { borderColor: "#f1f5f9" },
            }}
            series={[{ name: "Tickets", data: data.trend.volume }]}
            type="bar"
            height={280}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3">By status</h3>
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              labels: ["Open", "In progress", "Resolved"],
              colors: ["#F59E0B", "#3730A3", "#0EA65F"],
              legend: { position: "bottom" },
              dataLabels: { enabled: false },
            }}
            series={[data.byStatus.open || 0, data.byStatus.in_progress || 0, data.byStatus.resolved || 0]}
            type="donut"
            height={280}
          />
          <p className="text-center text-xs text-gray-400 mt-2">Avg. {data.avgRepliesPerTicket} replies per ticket</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Recent tickets</h3>
          <Link href="/dashboard/support" className="text-sm text-primary font-semibold hover:underline">Go to queue</Link>
        </div>
        <div className="space-y-3">
          {recent.map((t) => (
            <div key={t.id} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-700 truncate">{t.subject}</p>
                <p className="text-xs text-gray-400">{t.customer.name} · {timeAgo(t.createdAt)}</p>
              </div>
              <StatusChip status={t.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
