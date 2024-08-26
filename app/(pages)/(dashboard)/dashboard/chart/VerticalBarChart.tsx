import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart: React.FC = () => {
  const data = {
    labels: [
      "21 - 30 Tahun",
      "31 - 40 Tahun",
      "41 - 50 Tahun",
      "51 - 60 Tahun",
      "< 60 Tahun>",
    ],
    datasets: [
      {
        label: "Laki-laki",
        data: [25, 30, 35, 40, 45, 50],
        backgroundColor: "#D0F9E3",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 0,
      },
      {
        label: "Perempuan",
        data: [20, 25, 30, 35, 40, 45],
        backgroundColor: "#053B49",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10,
          },
        },
        barPercentage: 1.0,
        categoryPercentage: 0.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="-mt-7">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalBarChart;
