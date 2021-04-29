import React from "react";
import WithAuth from "../../../components/WithAuth";

const MainDashboard = () => {
  return (
    <div className="w-full p-5">
      <p className="text-3xl font-serif">Dashboard</p>
    </div>
  );
};

export default WithAuth(MainDashboard);
