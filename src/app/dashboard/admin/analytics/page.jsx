"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import { getAnalyticsOverview } from "@/services/dashboard.service";
import { formatCurrency } from "@/utils/format";
import { exportToCsv } from "@/utils/exportCsv";
import StatCard from "@/components/Dashboard/ui/StatCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    getAnalyticsOverview().then((res) => alive && setData(res));
    return () => { alive = false; };
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />)}
      </div>
    );
  }

  const { kpis, series, popularDestinations, agentPerformance } = data;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-500">Business performance across the last 12 months.</p>
        <button
          onClick={() =>
            exportToCsv("go-venture-report-summary", [
              { metric: "Total revenue", value: kpis.totalRevenue },
              { metric: "Total bookings", value: kpis.totalBookings },
              { metric: "Active customers", value: kpis.activeCustomers },
              { metric: "Conversion rate (%)", value: kpis.conversionRate },
              { metric: "Cancellation rate (%)", value: kpis.cancellationRate },
              { metric: "Average booking value", value: kpis.avgBookingValue },
            ])
          }
          className="text-sm font-semibold text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/5 transition-colors whitespace-nowrap"
        >
          Export summary report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard icon={<PaidOutlinedIcon />} label="Total revenue" value={formatCurrency(kpis.totalRevenue)} accent="#2095ae" />
        <StatCard icon={<BookOnlineOutlinedIcon />} label="Total bookings" value={kpis.totalBookings} accent="#7A316F" />
        <StatCard icon={<TrendingUpOutlinedIcon />} label="Conversion rate" value={`${kpis.conversionRate}%`} accent="#0EA65F" />
        <StatCard icon={<TrendingDownOutlinedIcon />} label="Cancellation rate" value={`${kpis.cancellationRate}%`} accent="#DC2626" />
        <StatCard icon={<PaidOutlinedIcon />} label="Avg. booking value" value={formatCurrency(kpis.avgBookingValue)} accent="#b59677" />
        <StatCard icon={<BookOnlineOutlinedIcon />} label="Active customers" value={kpis.activeCustomers} accent="#964834" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-2">Booking trend</h3>
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              plotOptions: { bar: { borderRadius: 6, columnWidth: "55%" } },
              colors: ["#7A316F"],
              dataLabels: { enabled: false },
              xaxis: { categories: series.labels, labels: { style: { colors: "#9ca3af" } } },
              yaxis: { labels: { style: { colors: "#9ca3af" } } },
              grid: { borderColor: "#f1f5f9" },
            }}
            series={[{ name: "Bookings", data: series.bookingsCount }]}
            type="bar"
            height={280}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-2">Cancellations per month</h3>
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              stroke: { curve: "smooth", width: 3 },
              colors: ["#DC2626"],
              dataLabels: { enabled: false },
              xaxis: { categories: series.labels, labels: { style: { colors: "#9ca3af" } } },
              yaxis: { labels: { style: { colors: "#9ca3af" } } },
              grid: { borderColor: "#f1f5f9" },
            }}
            series={[{ name: "Cancellations", data: series.cancellations }]}
            type="line"
            height={280}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3">Popular destinations</h3>
          <Chart
            options={{
              chart: { toolbar: { show: false } },
              plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "55%" } },
              colors: ["#2095ae"],
              dataLabels: { enabled: false },
              xaxis: { categories: popularDestinations.map((d) => d.destination), labels: { style: { colors: "#9ca3af" } } },
              grid: { borderColor: "#f1f5f9" },
            }}
            series={[{ name: "Bookings", data: popularDestinations.map((d) => d.bookings) }]}
            type="bar"
            height={280}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-3">Agent performance</h3>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>Agent</TableCell>
                  <TableCell align="right">Bookings</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">Commission</TableCell>
                  <TableCell align="right">Cancel rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentPerformance.map((a) => (
                  <TableRow key={a.agent} hover>
                    <TableCell className="font-medium text-gray-700">{a.agent}</TableCell>
                    <TableCell align="right">{a.totalBookings}</TableCell>
                    <TableCell align="right">{formatCurrency(a.revenue)}</TableCell>
                    <TableCell align="right">{formatCurrency(a.commission)}</TableCell>
                    <TableCell align="right" className={a.cancellationRate > 20 ? "text-red-600 font-semibold" : "text-gray-500"}>
                      {a.cancellationRate}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
