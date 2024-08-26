"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartArea,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, "rgba(144, 238, 144, 0)");
  gradient.addColorStop(1, "rgba(0, 128, 0, 0.8)");
  return gradient;
};

const initialData: ChartData<"line"> = {
  labels: [
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
  datasets: [
    {
      label: "Permintaan",
      data: [120, 198, 200, 389, 400, 435, 400, 365, 600, 670, 650, 800],
      fill: true,
      backgroundColor: "lightgreen",
      borderColor: "green",
      tension: 1,
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Area Chart Example",
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        font: {
          size: 10,
        },
      },
    },
    y: {
      display: true,
      title: {
        display: true,
      },
      max: 1000,
    },
  },
};

const AreaChart: React.FC = () => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>(initialData);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const canvas = chart.canvas;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = createGradient(ctx, chart.chartArea);
        const updatedData = {
          ...initialData,
          datasets: initialData.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: gradient,
          })),
        };
        setChartData(updatedData);
      }
    }
  }, []);

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default AreaChart;
