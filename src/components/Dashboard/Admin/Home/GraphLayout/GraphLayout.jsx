"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GraphLayout = () => {
  // Chart options
  const [chartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: {
        show: true, // Enables toolbar for export and settings
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", // Slimmer bars for a sleeker look
        borderRadius: 15,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#fff"], // White labels for better visibility
      },
    },
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "600",
          colors: ["#333"], // Stylish category labels
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#888"], // Subtle y-axis labels
        },
      },
      title: {
        text: "Sales Amount",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    title: {
      text: "Monthly Sales Data (2024)",
      align: "center",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "700",
      },
    },
    grid: {
      borderColor: "#e7e7e7", // Light gridlines
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#8b5cf6"], // Gradient ending with a rich purple
        shadeIntensity: 0.9,
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: "dark",
      marker: {
        show: true,
      },
      y: {
        formatter: (val) => `${val} Units`, // Custom tooltip text
      },
    },
  });

  // Static chart series
  const [chartSeries] = useState([
    {
      name: "Sales",
      data: [44, 55, 41, 67, 22, 43, 56, 78, 65, 49, 60, 70], // Static sales data
    },
  ]);

  // Dynamic progress bar values
  const availableTours = 683;
  const soldOutTours = 167;
  const totalTours = availableTours + soldOutTours;

  return (
    <div className="w-full md:w-1/2">
      <div className="p-4 bg-white shadow-md rounded-lg relative z-10 overflow-hidden">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="450"
        />
      </div>

      <div className="mt-10 flex justify-between items-center gap-4">
        <div className="bg-green-900 p-8 text-white space-y-4 rounded-xl w-full">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">Available Tour Today</p>
            <h1 className="text-2xl font-semibold">{availableTours}</h1>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${(availableTours / totalTours) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-green-900 p-8 text-white space-y-4 rounded-xl w-full">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">Sold Out Tour Today</p>
            <h1 className="text-2xl font-semibold">{soldOutTours}</h1>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-600 h-4 rounded-full"
              style={{ width: `${(soldOutTours / totalTours) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-10 shadow-md p-4 md:p-8 rounded-md">
        <div className="flex justify-around items-center gap-8">
          <div className=" space-y-4 text-center">
            <h1 className="text-3xl font-semibold">657</h1>
            <p>Total Concierge</p>
          </div>
          <div className=" space-y-4 text-center">
            <h1 className="text-3xl font-semibold">2,342</h1>
            <p>Total Tourist</p>
          </div>
        </div>

        <div className="flex justify-around items-center gap-8 mt-10">
          <div className=" space-y-4 text-center">
            <h1 className="text-3xl font-semibold">57</h1>
            <p>Total Destinations</p>
          </div>
          <div className=" space-y-4 text-center">
            <h1 className="text-3xl font-semibold">42K</h1>
            <p>Total Transaction</p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-5 mt-10">
          <div>
            <h1 className="font-semibold">
              Let Travl Generate Your Annualy Report Easily
            </h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labo
            </p>
          </div>
            <button>
              <ArrowForward />
            </button>
        </div>
      </div>
    </div>
  );
};

export default GraphLayout;
