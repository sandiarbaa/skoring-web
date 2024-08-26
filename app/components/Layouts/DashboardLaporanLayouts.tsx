import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  linkStatus: string;
  laporanUser: () => void;
  laporanPermintaan: () => void;
  laporanFitur: () => void;
}

const DashboardLaporanLayouts = ({
  children,
  linkStatus,
  laporanUser,
  laporanPermintaan,
  laporanFitur,
}: Props) => {
  return (
    <div className="px-5 pt-12 md:pt-5">
      <div className="flex flex-col lg:flex-row">
        <Link
          href="/laporan"
          className={` font-medium mr-5 relative w-32 ${
            linkStatus === "/laporanUser"
              ? "text-ijoToska after:hidden after:lg:block after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
              : "text-tulisan"
          }`}
          onClick={laporanUser}
        >
          Laporan User
        </Link>

        <Link
          href="/laporan"
          className={` font-medium mr-5 relative w-40 ${
            linkStatus === "/laporanPermintaan"
              ? "text-ijoToska after:hidden after:lg:block after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
              : "text-tulisan"
          }`}
          onClick={laporanPermintaan}
        >
          Laporan Permintaan
        </Link>

        <Link
          href="/laporan"
          className={` font-medium mr-5 relative w-32 ${
            linkStatus === "/laporanFitur"
              ? "text-ijoToska after:hidden after:lg:block after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
              : "text-tulisan"
          }`}
          onClick={laporanFitur}
        >
          Laporan Fitur
        </Link>
      </div>
      {children}
    </div>
  );
};

export default DashboardLaporanLayouts;
