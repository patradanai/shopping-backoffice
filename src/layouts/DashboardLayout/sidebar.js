import React, { useContext } from "react";
import { Context } from "../../context/Dashboard.reducer";
import ShopIcon from "../../components/icons/Shop";
import HomeIcon from "../../components/icons/Home";
import SettingIcon from "../../components/icons/Setting";
import TeamIcon from "../../components/icons/Team";
import ProductIcon from "../../components/icons/Product";
import OrderIcon from "../../components/icons/Order";
import HistoryIcon from "../../components/icons/History";

const SideBar = () => {
  const context = useContext(Context);

  const Active = () => {
    return "h-10 flex items-center bg-gray-200 bg-opacity-40 rounded px-2 cursor-pointer";
  };

  const Inactive = () => {
    return "h-10 flex items-center hover:bg-gray-200 hover:bg-opacity-40 rounded px-2 cursor-pointer";
  };

  return (
    <div className="w-1/4 py-5 px-5 shadow" style={{ background: "#43379c" }}>
      <div className="text-xl flex items-center">
        <ShopIcon className="w-10 h-10 text-gray-400" />
        <p className="text-white font-sans ml-2 font-semibold">E-Commerce</p>
      </div>
      <div className="text-white mt-5">
        <ul>
          <li
            className={
              context.state.DashboardPage === 0 ? Active() : Inactive()
            }
            onClick={() => context.DashPageFunc(0)}
          >
            <HomeIcon className="w-6 h-6 text-gray-400 mr-2" />
            Dashboard
          </li>
          <li
            className={
              context.state.DashboardPage === 1 ? Active() : Inactive()
            }
            onClick={() => context.DashPageFunc(1)}
          >
            <TeamIcon className="w-6 h-6 text-gray-400 mr-2" />
            Staff Management
          </li>
          <li
            cl
            className={
              context.state.DashboardPage === 2 ? Active() : Inactive()
            }
            onClick={() => context.DashPageFunc(2)}
          >
            <ProductIcon className="w-6 h-6 text-gray-400 mr-2" />
            Products
          </li>
          <li
            className={
              context.state.DashboardPage === 3 ? Active() : Inactive()
            }
            onClick={() => context.DashPageFunc(3)}
          >
            <OrderIcon className="w-6 h-6 text-gray-400 mr-2" />
            Orders
          </li>
          <li
            className={
              context.state.DashboardPage === 4 ? Active() : Inactive()
            }
            onClick={() => context.DashPageFunc(4)}
          >
            <HistoryIcon className="w-6 h-6 text-gray-400 mr-2" />
            Logs
          </li>
          <li
            className={
              context.state.DashboardPage === 5 ? Active() : Inactive()
            }
            onClick={() => context.DashPageFunc(5)}
          >
            <SettingIcon className="w-6 h-6 text-gray-400 mr-2" />
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
