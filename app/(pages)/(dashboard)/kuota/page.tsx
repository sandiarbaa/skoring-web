"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import DashboardAlokasiKuota from "@/app/components/Layouts/DashboardAlokasiKuota";
import ContentDashboardAlokasiKuota from "@/app/components/Fragments/kuota/ContentDashboardAlokasiKuota";
import ContentDashboardRiwayatKuota from "@/app/components/Fragments/kuota/ContentDashboardRiwayatKuota";
import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";

const KuotaPage = () => {
  const pathname = usePathname();
  const [linkStatus, setLinkStatus] = useState<string>("/AlokasiKuota");

  const toLinkAlokasiKuota = () => {
    setLinkStatus("/AlokasiKuota");
  };
  function toLinkRiwayatAlokasiKuota() {
    setLinkStatus("/RiwayatAlokasiKuota");
  }

  return (
    <ProtectedRoute>
      <DashboardLayout alokasiKuota={linkStatus} hover={pathname}>
      <DashboardAlokasiKuota
        linkStatus={linkStatus}
        alokasiKuota={toLinkAlokasiKuota}
        riwayatAlokasiKuota={toLinkRiwayatAlokasiKuota}
      >
        {linkStatus === "/AlokasiKuota" && (
          <ContentDashboardAlokasiKuota
            riwayatAlokasiKuota={toLinkRiwayatAlokasiKuota}
          />
        )}
        {linkStatus === "/RiwayatAlokasiKuota" && (
          <ContentDashboardRiwayatKuota />
        )}
      </DashboardAlokasiKuota>
    </DashboardLayout>
    </ProtectedRoute>
  );
};

export default KuotaPage;
