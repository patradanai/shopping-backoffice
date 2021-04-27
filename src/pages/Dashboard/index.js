import React, { useContext } from "react";
import { Context } from "../../context/Dashboard.reducer";
import HistoryDashboard from "./History";
import OrderDashboard from "./Order";
import ProductDashboard from "./Product";
import SettingDashboard from "./Settings";
import StaffDashboard from "./Staff";
import MainDashboard from "./Dashboard";
const DashboardComponentPage = () => {
  const context = useContext(Context);

  const StatePage = (page) => {
    switch (page) {
      case 0:
        return <MainDashboard />;
      case 1:
        return <StaffDashboard />;
      case 2:
        return <ProductDashboard />;
      case 3:
        return <OrderDashboard />;
      case 4:
        return <HistoryDashboard />;
      case 5:
        return <SettingDashboard />;
      default:
        return <MainDashboard />;
    }
  };

  return <div>{StatePage(context.state.DashboardPage)}</div>;
};

export default DashboardComponentPage;
