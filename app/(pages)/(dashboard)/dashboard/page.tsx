"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import EmpetyData from "@/app/components/Elements/EmpetyData";

// Component
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import DashboardStatsContentLayout from "@/app/components/Layouts/DashboardStatsContentLayout";
import DoughnutChart from "./chart/DoughnutChart";
import VerticalBarChart from "./chart/VerticalBarChart";
import AreaChart from "./chart/AreaChart";

// Data
import { dashboardCardData } from "@/app/utils/dashboardCardData";
import SingleVerticalBarChart from "./chart/SingleVerticalBarChart";
import api from "../../(auth)/login/api";
import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";

interface Breakpoint {
  max: number;
  min: number;
}

interface ResponsiveType {
  [key: string]: {
    breakpoint: Breakpoint;
    items: number;
  };
}

const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DashboardPage: React.FC = () => {
  const pathname: string = usePathname();

  return (
    <ProtectedRoute>
      <DashboardLayout hover={pathname}>
        {/* Dashboard Card */}
        <section className="relative md:block w-full">
          <h1 className="pt-2 pl-5 font-bold">RIWAYAT PERMINTAAN</h1>
          {/* Card */}
          <Carousel responsive={responsive} className="mx-5">
            {dashboardCardData.map((dataCard, index) => (
              <div
                key={index}
                className="w-[100%] lg:w-[220px] border p-3 bg-white flex flex-col rounded-md shadow mt-3 carousel-item"
              >
                <div className="flex justify-start space-x-3 mb-3 lg:space-x-0">
                  <div className={`${dataCard.bgIcon} p-1.5 rounded-md mr-3`}>
                    <Image
                      src={dataCard.image}
                      alt="ai-automation"
                      width={50}
                      height={10}
                      className="scale-75"
                    />
                  </div>

                  <div className="text-[14px]">
                    <h2 className={`font-semibold title-dashboard-card-first}`}>
                      {dataCard.title}
                    </h2>
                    <p className="tracking-tighter text-[12px]">
                      {dataCard.jumlahData} Total Permintaan
                    </p>
                  </div>
                </div>
                {/* Button Lihat Detail */}
                <Link
                  href="#"
                  className={`${dataCard.bgButton} text-center text-white font-semibold py-1.5 rounded-md transition-all duration-300 hover:opacity-75`}
                >
                  Lihat Detail
                </Link>
              </div>
            ))}
          </Carousel>
        </section>

        {/* Dashboard Stats ** */}
        <section className="mt-5 mr-5 pb-5">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-7 pr-5 pt-5 lg:pt-0">
            <h1 className="text-xl pt-1 pl-5 font-bold mb-3 lg:mb-0">
              Grafik Penggunaan
            </h1>
            {/* Dropdown */}
            <div className="w-48 px-5 lg:px-0">
              <select
                id="fruits"
                name="fruits"
                className="block text-sm w-full mt-1 rounded-md border-gray-300 bg-[#F5F5F5] p-3 border shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="semua">Semua</option>
                <option value="tahun">Tahun</option>
                <option value="bulan">Bulan</option>
                <option value="minggu">Minggu</option>
              </select>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex space-y-5 lg:space-y-0 lg:space-x-5 lg:justify-between lg:px-5 mb-5 flex-col items-center lg:flex-row">
            <DashboardStatsContentLayout title="RIWAYAT PERMINTAAN">
              {/* <AreaChart /> */}
              <EmpetyData props={false} />
            </DashboardStatsContentLayout>

            <DashboardStatsContentLayout title="RIWAYAT NILAI SKOR">
              {/* <DoughnutChart /> */}
              <EmpetyData props={false} />
            </DashboardStatsContentLayout>
          </div>

          <div className="flex space-y-5 lg:space-y-0 lg:space-x-5 lg:justify-between lg:px-5 mb-5 flex-col items-center justify-center lg:flex-row">
            <DashboardStatsContentLayout title="TRACK USIA">
              {/* <VerticalBarChart /> */}
              <EmpetyData props={false} />
            </DashboardStatsContentLayout>

            <DashboardStatsContentLayout title="TRACK LOKASI">
              {/* <div className="italic font-medium text-xl h-full flex justify-center items-center text-tulisan">
                <span>Coming Soon...</span>
              </div> */}
              <EmpetyData props={false} />
            </DashboardStatsContentLayout>
          </div>

          <div className="flex space-y-5 lg:space-y-0 lg:space-x-5 lg:justify-between lg:px-5 mb-5 flex-col items-center lg:flex-row">
            <DashboardStatsContentLayout title="TRACK PENDAPATAN">
              {/* <SingleVerticalBarChart /> */}
              <EmpetyData props={false} />
            </DashboardStatsContentLayout>
          </div>
        </section>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
