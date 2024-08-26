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

const SingleVerticalBarChart: React.FC = () => {
  const data = {
    labels: [
      "<5Jt",
      "6Jt-10Jt",
      "11Jt-15Jt",
      "16Jt-20Jt",
      "21Jt-25Jt",
      "26Jt-30Jt",
      "36Jt-40Jt",
      ">40Jt",
    ],
    datasets: [
      {
        label: "Background",
        data: [800, 700, 500, 900, 500, 800, 700, 900], // Nilai tinggi penuh
        backgroundColor: "#74BFB2",
        borderWidth: 0,
        barThickness: 30, // Menetapkan ketebalan bar secara manual
        maxBarThickness: 30, // Menetapkan ketebalan maksimal bar
      },
      {
        label: "Filled",
        data: [500, 500, 500, 500, 500, 500, 500, 500], // Nilai tinggi bar utama
        backgroundColor: "#F5F5F5",
        borderWidth: 0,
        barThickness: 30, // Menetapkan ketebalan bar secara manual
        maxBarThickness: 30, // Menetapkan ketebalan maksimal bar
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
        stacked: true, // Enable stacking
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          maxRotation: 30, // Putar teks sebesar 30 derajat
          minRotation: 30, // Putar teks sebesar 30 derajat
          font: {
            size: 10,
          },
        },
        barPercentage: 1.0, // Set barPercentage ke 1 untuk memastikan lebar bar
        categoryPercentage: 1.0, // Set categoryPercentage ke 1 untuk memastikan lebar bar
        stacked: true, // Enable stacking
      },
    },
    plugins: {
      legend: {
        display: false, // Sembunyikan legenda jika tidak diperlukan
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="-mt-7">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SingleVerticalBarChart;
