"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

// Component
import ContentDashboardHasil from "@/app/components/Fragments/permintaan/ContentDashboardHasil";
import ContentDashboardPermintaan from "@/app/components/Fragments/permintaan/ContentDashboardPermintaan";
import ContentDashboardProses from "@/app/components/Fragments/permintaan/ContentDashboardProses";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import DashboardPermintaanLayouts from "@/app/components/Layouts/DashboardPermintaanLayouts";
import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";

interface UsersProsesDataProps {
  nik: string;
  nama: string;
  tanggalInput: string;
}

const PermintaanPage = () => {
  const [linkStatus, setLinkStatus] = useState<string>("/permintaan"); // pengubah isi content dari tiap tab
  const [usersProsesData, setUsersProsesData] = useState<
    UsersProsesDataProps[]
  >([]); // data person yg akan di tampilkan di tab proses, saat proses cek skoring
  const pathname = usePathname();

  // console.log("from permintaan page:", usersProsesData);

  // tab permintaan
  function toLinkPermintaan() {
    setLinkStatus("/permintaan");
  }

  // tab proses
  function toLinkProses() {
    setLinkStatus("/proses");
  }

  // tab hasil
  function toLinkHasil() {
    setLinkStatus("/hasil");
  }

  return (
    <ProtectedRoute>
      <DashboardLayout hover={pathname}>
      <DashboardPermintaanLayouts
        linkStatus={linkStatus}
        permintaan={toLinkPermintaan}
        proses={toLinkProses}
        hasil={toLinkHasil}
      >
        {linkStatus === "/permintaan" && (
          <ContentDashboardPermintaan
            proses={toLinkProses}
            hasil={toLinkHasil}
            setUsersProsesData={setUsersProsesData}
          />
        )}
        {linkStatus === "/proses" && (
          <ContentDashboardProses usersProsesData={usersProsesData} />
        )}
        {linkStatus === "/hasil" && <ContentDashboardHasil />}
      </DashboardPermintaanLayouts>
    </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PermintaanPage;
