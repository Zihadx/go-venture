"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getAgentDashboard } from "@/services/dashboard.service";
import { formatCurrency, formatDate } from "@/utils/format";
import useCurrentUser from "@/hooks/useCurrentUser";
import StatCard from "@/components/Dashboard/ui/StatCard";
import StatusChip from "@/components/Dashboard/ui/StatusChip";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AgentOverview() {
  const { user } = useCurrentUser();
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAgentDashboard(user?.name).then((res) => {
      setData(res);
      setTasks(res.tasks);
    });
  }, [user?.name]);

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    // TODO: persist to a real /api/tasks endpoint once the backend is wired.
  };

  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />)}
      </div>
    );
  }

  const { kpis, series, customers, recentBookings } = data;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Agent dashboard — {data.agentName}</h2>
        <p className="text-gray-500">Your bookings, commission, and customer portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<BookOnlineOutlinedIcon />} label="My bookings" value={kpis.totalBookings} accent="#7A316F" />
        <StatCard icon={<PaidOutlinedIcon />} label="My commission" value={formatCurrency(kpis.commission)} accent="#2095ae" />
        <StatCard icon={<FlightTakeoffOutlinedIcon />} label="Upcoming trips" value={kpis.upcoming} accent="#0EA65F" />
        <StatCard icon={<HourglassEmptyOutlinedIcon />} label="Awaiting confirmation" value={kpis.pending} accent="#b59677" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-2">Bookings & commission — last 12 months</h3>
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              stroke: { curve: "smooth", width: [0, 3] },
              colors: ["#7A316F", "#2095ae"],
              plotOptions: { bar: { columnWidth: "45%", borderRadius: 4 } },
              dataLabels: { enabled: false },
              xaxis: { categories: series.labels, labels: { style: { colors: "#9ca3af" } } },
              yaxis: [
                { title: { text: "Bookings" }, labels: { style: { colors: "#9ca3af" } } },
                { opposite: true, title: { text: "Commission ($)" }, labels: { style: { colors: "#9ca3af" } } },
              ],
              grid: { borderColor: "#f1f5f9" },
              legend: { position: "top" },
            }}
            series={[
              { name: "Bookings", type: "column", data: series.bookingsCount },
              { name: "Commission", type: "line", data: series.commission },
            ]}
            type="line"
            height={300}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3">My tasks</h3>
          <div className="space-y-2">
            {tasks.length === 0 && <p className="text-sm text-gray-400">No open tasks — nice work.</p>}
            {tasks.map((t) => (
              <button
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className="flex items-start gap-2 w-full text-left p-2 rounded-lg hover:bg-gray-50"
              >
                {t.done ? (
                  <CheckBoxIcon sx={{ fontSize: 20, color: "#0EA65F" }} />
                ) : (
                  <CheckBoxOutlineBlankIcon sx={{ fontSize: 20, color: "#d1d5db" }} />
                )}
                <div className="min-w-0">
                  <p className={`text-sm ${t.done ? "line-through text-gray-400" : "text-gray-700"}`}>{t.title}</p>
                  <p className="text-xs text-gray-400">Due in {t.dueInDays}d</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3">My customers</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {customers.map((c) => (
              <div key={c.email} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{formatCurrency(c.spend)}</p>
                  <p className="text-xs text-gray-400">{c.bookings} booking{c.bookings > 1 ? "s" : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Recent bookings</h3>
            <Link href="/dashboard/admin/bookings" className="text-sm text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{b.destination}</p>
                  <p className="text-xs text-gray-400">{b.customer.name} · {formatDate(b.travelDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{formatCurrency(b.amount)}</span>
                  <StatusChip status={b.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
