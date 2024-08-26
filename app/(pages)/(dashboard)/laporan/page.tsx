"use client";
import ContentDashboardLaporanFitur from "@/app/components/Fragments/laporan/ContentDashboardLaporanFitur";
import ContentDashboardLaporanPermintaan from "@/app/components/Fragments/laporan/ContentDashboardLaporanPermintaan";
import ContentDashboardLaporanUser from "@/app/components/Fragments/laporan/ContentDashboardLaporanUser";
import DashboardLaporanLayouts from "@/app/components/Layouts/DashboardLaporanLayouts";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";

const LaporanPage = () => {
  const pathname = usePathname();
  const [linkStatus, setLinkStatus] = useState<string>("/laporanUser");

  function toLinkLaporanUser() {
    setLinkStatus("/laporanUser");
  }

  function toLinkLaporanPermintaan() {
    setLinkStatus("/laporanPermintaan");
  }

  function toLinkLaporanFitur() {
    setLinkStatus("/laporanFitur");
  }
  return (
    <ProtectedRoute>
      <DashboardLayout hover={pathname}>
      <DashboardLaporanLayouts
        linkStatus={linkStatus}
        laporanUser={toLinkLaporanUser}
        laporanPermintaan={toLinkLaporanPermintaan}
        laporanFitur={toLinkLaporanFitur}
      >
        {linkStatus === "/laporanUser" && <ContentDashboardLaporanUser />}
        {linkStatus === "/laporanPermintaan" && (
          <ContentDashboardLaporanPermintaan />
        )}
        {linkStatus === "/laporanFitur" && <ContentDashboardLaporanFitur />}
      </DashboardLaporanLayouts>
    </DashboardLayout>
    </ProtectedRoute>
  );
};

export default LaporanPage;
