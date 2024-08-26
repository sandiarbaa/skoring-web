import React from "react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  linkStatus: string;
  alokasiKuota: () => void;
  riwayatAlokasiKuota: () => void;
}

const DashboardAlokasiKuota = ({
  children,
  linkStatus,
  alokasiKuota,
  riwayatAlokasiKuota,
}: Props) => {
  return (
    <>
      <div className="px-5 pt-12 md:pt-5">
        <div className="flex w-full flex-row md:text-base text-sm">
          <Link
            href="/kuota"
            className={` font-medium mr-5 relative ${
              linkStatus === "/AlokasiKuota"
                ? "text-ijoToska after:hidden after:lg:block after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
                : "text-tulisan"
            }`}
            onClick={alokasiKuota}
          >
            Alokasi Kuota
          </Link>
          <Link
            href="/kuota"
            className={` font-medium mr-5 relative ${
              linkStatus === "/RiwayatAlokasiKuota"
                ? "text-ijoToska after:hidden after:lg:block after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
                : "text-tulisan"
            }`}
            onClick={riwayatAlokasiKuota}
          >
            Riwayat Alokasi Kuota
          </Link>
        </div>
        {children}
      </div>
    </>
  );
};

export default DashboardAlokasiKuota;
