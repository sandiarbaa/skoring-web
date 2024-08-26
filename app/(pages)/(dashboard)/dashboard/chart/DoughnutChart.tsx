"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "A (Sangat Baik)",
    "B (Baik)",
    "C (Cukup Baik)",
    "D (Buruk)",
    "E (Sangat Buruk)",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [13, 12, 7, 5, 5],
      backgroundColor: [
        "rgba(19, 131, 123, 1)",
        "rgba(74, 193, 162, 1)",
        "rgba(253, 230, 138, 1)",
        "rgba(231, 175, 82, 1)",
        "rgba(137, 124, 192, 1)",
      ],
      borderWidth: 0,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      position: "right",
    },
  },
  maintainAspectRatio: false,
};

const DoughnutChart: React.FC = () => {
  return <Doughnut data={data} options={options} width={130} height={130} />;
};

export default DoughnutChart;
