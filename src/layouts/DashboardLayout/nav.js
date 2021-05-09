import React, { useContext } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { Context } from "../../context/Dashboard.reducer";
import LogoutIcon from "../../components/icons/Logout";
import SerchIcon from "../../components/icons/Search";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const context = useContext(Context);

  const handlesingOut = () => {
    // Clear Cookie and Local
    Cookie.remove("token");

    localStorage.removeItem("shop");

    // Clear Context
    context.UserProfile({});
    context.ShopProfile({});

    setTimeout(() => {
      router.replace("/signin");
    }, 1000);
  };

  return (
    <nav className="w-full bg-white h-12 flex items-center justify-between px-5 shadow">
      <div></div>
      <div>
        <ul className="flex space-x-3 items-center">
          <li className="">
            <div className="flex items-center hover:bg-blue-300 px-2 py-1 hover:text-white cursor-pointer">
              {context.state.userProfiles.fname ? (
                <>
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                    <Image src={"/images/avatar.png"} width={64} height={64} />
                  </div>
                  <p className="uppercase">
                    {context.state.userProfiles.fname +
                      " " +
                      context.state.userProfiles.lname}
                  </p>
                </>
              ) : null}
            </div>
          </li>
          <li>
            <div
              className="h-12 w-12 flex items-center justify-center hover:bg-blue-300 px-2 py-1 hover:text-white cursor-pointer"
              onClick={handlesingOut}
            >
              <LogoutIcon />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
