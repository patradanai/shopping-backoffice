import React from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

const DashboardLayout = (props) => {
  return (
    <div className="flex flex-col justify-between bg-gray-200 min-h-screen">
      <div className="flex h-full w-full flex-grow">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="h-full flex-grow">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
