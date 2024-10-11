import CustomKanban from "@/components/dashboard/share/KanvaBoards";

import DashboardLayout from "@/components/layouts/DashboardLayout";

import React from "react";

const Share = () => {
  return (
    <DashboardLayout>
      <div className="flex mt-16 justify-between">
        <CustomKanban />
      </div>
    </DashboardLayout>
  );
};

export default Share;
