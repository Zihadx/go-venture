"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const GraphLayout = () => {
  // Chart options
  const [chartOptions] = useState({
    chart: {
      type: 'bar',
      toolbar: {
        show: true, // Enables toolbar for export and settings
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%', // Slimmer bars for a sleeker look
        endingShape: 'flat', // Flat edges for a unique design
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#fff'], // White labels for better visibility
      },
    },
    xaxis: {
      categories: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: '600',
          colors: ['#333'], // Stylish category labels
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#888'], // Subtle y-axis labels
        },
      },
      title: {
        text: 'Sales Amount',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
    },
    title: {
      text: 'Monthly Sales Data (2024)',
      align: 'center',
      margin: 10,
      style: {
        fontSize: '20px',
        fontWeight: '700',
      },
    },
    grid: {
      borderColor: '#e7e7e7', // Light gridlines
      strokeDashArray: 5,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#8b5cf6'], // Gradient ending with a rich purple
        shadeIntensity: 0.9,
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: 'dark',
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
      name: 'Sales',
      data: [44, 55, 41, 67, 22, 43, 56, 78, 65, 49, 60, 70], // Static sales data
    },
  ]);

  return (
    <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
      <Chart options={chartOptions} series={chartSeries} type="bar" height="450" />
    </div>
  );
};

export default GraphLayout;

