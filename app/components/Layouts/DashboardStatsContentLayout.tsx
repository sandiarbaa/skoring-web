import Link from "next/link";
import React from "react";

const DashboardStatsContentLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="w-full max-w-[400px] lg:max-w-[440px] shadow p-5 rounded-md">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
        <div className="pl-3">
          <h1 className="font-bold mb-1.5">{title}</h1>
          {/* Button Tahun, Bulan, Minggu */}
          <div className="flex space-x-5 text-sm">
            <Link href="#" className="text-tulisan">
              Tahun
            </Link>
            <Link
              href="#"
              className="text-tulisan shadow shadow-ijoToska bg-white border-ijoToska px-4 rounded-md border active:bg-ijoToska active:text-white active:shadow active:shadow-ijoToska"
            >
              Bulan
            </Link>
            <Link href="#" className="text-tulisan">
              Minggu
            </Link>
          </div>
        </div>
        {/* Dropdown */}
        <div className="w-28 ml-3 lg:ml-0 mt-3 lg:mt-0">
          <select
            id="fruits"
            name="fruits"
            className="block text-sm w-full mt-1 rounded-[8%] border border-gray-300 bg-white p-2 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="semua">Semua</option>
            <option value="tahun">Tahun</option>
            <option value="bulan">Bulan</option>
            <option value="minggu">Minggu</option>
          </select>
        </div>
      </div>
      <div className="w-full h-40 mt-10 relative">{children}</div>
    </div>
  );
};

export default DashboardStatsContentLayout;
