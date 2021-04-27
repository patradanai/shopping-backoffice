import React from "react";
import LayoutDashBoard from "../src/layouts/DashboardLayout";
import DashboardComponentPage from "../src/pages/Dashboard";
const DashboardPage = () => {
  return (
    <LayoutDashBoard>
      <DashboardComponentPage />
    </LayoutDashBoard>
  );
};

export default DashboardPage;
