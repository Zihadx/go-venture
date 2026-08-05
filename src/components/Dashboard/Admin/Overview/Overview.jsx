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

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Overview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    getDashboardSummary().then((res) => alive && setData(res));
    return () => {
      alive = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  const { kpis, series, popularDestinations, recentBookings, pendingBookings, refundRequests, totalUsers } = data;

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Attention row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/dashboard/admin/bookings"
          className="flex items-center gap-4 rounded-xl border border-amber-100 bg-amber-50 p-4 hover:shadow-md transition-shadow"
        >
          <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
            <HourglassEmptyOutlinedIcon />
          </div>
          <div>
            <p className="font-bold text-amber-900">{pendingBookings} bookings awaiting confirmation</p>
            <p className="text-xs text-amber-700">Click to review and confirm</p>
          </div>
        </Link>
        <Link
          href="/dashboard/admin/bookings"
          className="flex items-center gap-4 rounded-xl border border-rose-100 bg-rose-50 p-4 hover:shadow-md transition-shadow"
        >
          <div className="rounded-lg bg-rose-100 p-2 text-rose-600">
            <ReplayOutlinedIcon />
          </div>
          <div>
            <p className="font-bold text-rose-900">{refundRequests} refund requests pending</p>
            <p className="text-xs text-rose-700">Cancellation rate is {kpis.cancellationRate}%</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800">Revenue — last 12 months</h3>
            <span className="text-xs text-gray-400">Avg booking value: {formatCurrency(kpis.avgBookingValue)}</span>
          </div>
          <Chart
            options={{
              chart: { toolbar: { show: false }, animations: { enabled: true } },
              stroke: { curve: "smooth", width: 3 },
              colors: ["#2095ae"],
              fill: {
                type: "gradient",
                gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 90, 100] },
              },
              dataLabels: { enabled: false },
              xaxis: { categories: series.labels, labels: { style: { colors: "#9ca3af" } } },
              yaxis: { labels: { formatter: (v) => `$${Math.round(v / 1000)}k`, style: { colors: "#9ca3af" } } },
              grid: { borderColor: "#f1f5f9" },
              tooltip: { y: { formatter: (v) => formatCurrency(v) } },
            }}
            series={[{ name: "Revenue", data: series.revenue }]}
            type="area"
            height={280}
          />
        </div>

        {/* Popular destinations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3">Top destinations</h3>
          <div className="space-y-3">
            {popularDestinations.map((d, i) => {
              const max = popularDestinations[0]?.bookings || 1;
              return (
                <div key={d.destination}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 truncate">{i + 1}. {d.destination}</span>
                    <span className="text-gray-400">{d.bookings}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: `${(d.bookings / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Recent bookings</h3>
          <Link href="/dashboard/admin/bookings" className="text-sm text-primary font-semibold hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="py-2 pr-4 font-medium">Booking</th>
                <th className="py-2 pr-4 font-medium">Customer</th>
                <th className="py-2 pr-4 font-medium">Destination</th>
                <th className="py-2 pr-4 font-medium">Travel date</th>
                <th className="py-2 pr-4 font-medium">Amount</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Booked</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2.5 pr-4 font-semibold text-gray-700">{b.id}</td>
                  <td className="py-2.5 pr-4 text-gray-600">{b.customer.name}</td>
                  <td className="py-2.5 pr-4 text-gray-600">{b.destination}</td>
                  <td className="py-2.5 pr-4 text-gray-500">{formatDate(b.travelDate)}</td>
                  <td className="py-2.5 pr-4 text-gray-700 font-medium">{formatCurrency(b.amount)}</td>
                  <td className="py-2.5 pr-4"><StatusChip status={b.status} /></td>
                  <td className="py-2.5 pr-4 text-gray-400">{timeAgo(b.bookedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
