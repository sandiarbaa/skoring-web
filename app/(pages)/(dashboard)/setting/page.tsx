"use client";

import React from "react";
import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  return (
    <div>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div>Setting</div>
        </DashboardLayout>
      </ProtectedRoute>
    </div>
  );
};

export default Page;
