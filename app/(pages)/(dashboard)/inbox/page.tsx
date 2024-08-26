"use client";

import EmpetyData from "@/app/components/Elements/EmpetyData";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
// import { useState } from "react";
import { usePathname } from "next/navigation";
import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";
// import ContentDashboardInbox from "@/app/components/Fragments/inbox/ContentDashboardInbox";

const InboxPage = () => {
  // const [inActive, setInActive] = useState<string>("");
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <DashboardLayout hover={pathname}>
      {/* {inActive ? (
        <ContentDashboardInbox data={inActive} />
      ) : (
        <EmpetyData onAddData={setInActive} />
      )} */}
      <div className="flex justify-center items-center h-screen">
        <EmpetyData props={true} href="/dashboard" label="+ Request Inbox" />
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
};

export default InboxPage;
