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

const BarChart: React.FC = () => {
  const data = {
    labels: [
      "AI Automation",
      "AI Document Verification",
      "AI Location & Movement",
      "AI Capacity & Earning Power",
      "AI Capital Strength Analysis",
      "AI Collateral & Guarantee",
      "AI Condition Analysis",
      "AI Constraint Analysis",
      "AI Constraint Analysis",
    ],
    datasets: [
      {
        label: "Laki-laki",
        data: [250, 400, 600, 400, 700, 930, 400, 800, 1000],
        backgroundColor: "#D0F9E3",
        borderColor: "#1B9984",
        borderWidth: 2,
      },
      {
        label: "Perempuan",
        data: [200, 250, 650, 350, 800, 450, 700, 550, 800],
        backgroundColor: "#F9B7B4",
        borderColor: "#EE2D24",
        borderWidth: 2,
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
          stepSize: 200,
          max: 1000,
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
          autoSkip: false,
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
    <div className="overflow-x-auto">
      <div style={{ width: "1200px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
