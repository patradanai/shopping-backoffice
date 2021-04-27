import React from "react";
import ShopIcon from "../../components/icons/Shop";
const SideBar = () => {
  return (
    <div className="w-1/4 py-5 px-3" style={{ background: "#43379c" }}>
      <div className="text-xl flex items-center">
        <ShopIcon className="w-10 h-10 bg-gray-400" />
        <p className="text-white font-sans ml-2 font-semibold">E-Commerce</p>
      </div>
      <div className="text-white mt-5">
        <ul>
          <li>Dashboard</li>
          <li>Staff Management</li>
          <li>Product</li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
