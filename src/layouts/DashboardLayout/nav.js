import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white h-12 flex items-center justify-between px-5 shadow">
      <div>Search</div>
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
