import Link from "next/link";
import React from "react";

interface dashboardPermintaanLayoutsProps {
  children: React.ReactNode;
  linkStatus: string;
  permintaan: () => void;
  proses: () => void;
  hasil: () => void;
}

const DashboardPermintaanLayouts: React.FC<dashboardPermintaanLayoutsProps> = ({
  children,
  linkStatus,
  permintaan,
  proses,
  hasil,
}) => {
  return (
    <div className="px-5 pt-12 md:pt-5">
      <Link
        href="/permintaan"
        className={` font-medium mr-5 relative ${
          linkStatus === "/permintaan"
            ? "text-ijoToska after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
            : "text-tulisan"
        }`}
        onClick={permintaan}
      >
        Permintaan
      </Link>
      <Link
        href="/permintaan"
        className={` font-medium mr-5 relative ${
          linkStatus === "/proses"
            ? "text-ijoToska after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
            : "text-tulisan"
        }`}
        onClick={proses}
      >
        Proses
      </Link>
      <Link
        href="/permintaan"
        className={` font-medium mr-5 relative ${
          linkStatus === "/hasil"
            ? "text-ijoToska after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
            : "text-tulisan"
        }`}
        onClick={hasil}
      >
        Hasil
      </Link>
      {children}
    </div>
  );
};

export default DashboardPermintaanLayouts;
