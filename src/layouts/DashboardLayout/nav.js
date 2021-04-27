import React from "react";
import SerchIcon from "../../components/icons/Search";

const Navbar = () => {
  return (
    <nav className="w-full bg-white h-12 flex items-center justify-between px-5 shadow">
      <div className="flex items-center">
        <SerchIcon className="w-6 h-6 text-gray-400" />
        <input
          className="py-1 px-3 text-sm rounded-full outline-none"
          placeholder="Seach"
        />
      </div>
      <div>
        <ul className="flex space-x-3">
          <li>Login</li>
          <li>SignOut</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
