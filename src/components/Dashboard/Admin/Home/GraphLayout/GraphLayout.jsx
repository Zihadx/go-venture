"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowForward } from "@mui/icons-material";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GraphLayout = () => {
  // Chart configuration
  const [chartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: { show: true },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "40%", borderRadius: 15 },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#fff"] },
    },
    xaxis: {
      categories: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      labels: {
        style: { fontSize: "14px", fontWeight: "600", colors: ["#333"] },
      },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#888"] } },
      title: {
        text: "Sales Amount",
        style: { fontSize: "14px", fontWeight: "bold", color: "#333" },
      },
    },
    title: {
      text: "Monthly Sales Data (2024)",
      align: "center",
      margin: 10,
      style: { fontSize: "20px", fontWeight: "700" },
    },
    grid: { borderColor: "#e7e7e7", strokeDashArray: 5 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#8b5cf6"],
        shadeIntensity: 0.9,
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: "dark",
      marker: { show: true },
      y: { formatter: (val) => `${val} Units` },
    },
  });

  const [chartSeries] = useState([
    {
      name: "Sales",
      data: [44, 55, 41, 67, 22, 43, 56, 78, 65, 49, 60, 70],
    },
  ]);

  // Progress bar data
  const availableTours = 683;
  const soldOutTours = 167;
  const totalTours = availableTours + soldOutTours;

  return (
    <div className="w-full md:w-1/2 space-y-10">
      {/* Chart Section */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <Chart options={chartOptions} series={chartSeries} type="bar" height="450" />
      </div>

      {/* Progress Bars Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {[
          {
            title: "Available Tour Today",
            count: availableTours,
            color: "bg-blue-600",
            percentage: (availableTours / totalTours) * 100,
          },
          {
            title: "Sold Out Tour Today",
            count: soldOutTours,
            color: "bg-red-600",
            percentage: (soldOutTours / totalTours) * 100,
          },
        ].map(({ title, count, color, percentage }, idx) => (
          <div
            key={idx}
            className="bg-green-900 text-white p-6 rounded-lg flex flex-col w-full space-y-4"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">{title}</p>
              <h1 className="text-2xl font-semibold">{count}</h1>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`${color} h-4 rounded-full`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="shadow-md p-4 md:p-8 rounded-md space-y-10">
        <div className="flex justify-around gap-8">
          {[
            { count: 657, label: "Total Concierge" },
            { count: 2342, label: "Total Tourist" },
          ].map(({ count, label }, idx) => (
            <div key={idx} className="text-center space-y-2">
              <h1 className="text-3xl font-semibold">{count}</h1>
              <p>{label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-around gap-8">
          {[
            { count: 57, label: "Total Destinations" },
            { count: "42K", label: "Total Transaction" },
          ].map(({ count, label }, idx) => (
            <div key={idx} className="text-center space-y-2">
              <h1 className="text-3xl font-semibold">{count}</h1>
              <p>{label}</p>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center gap-5">
          <div>
            <h1 className="font-semibold">
              Let Go-Venture's Your Annual Report Easily
            </h1>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <button className="bg-blue-600 text-white p-2 rounded-full">
            <ArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphLayout;
