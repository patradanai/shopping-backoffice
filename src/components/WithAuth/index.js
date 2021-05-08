import React, { useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { axios } from "../../utils/api/shopping";
import Router from "next/router";
import LoadingComponent from "../Loading";
import { Context } from "../../context/Dashboard.reducer";
import _ from "lodash";
const WithAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const context = useContext(Context);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const token = Cookie.get("token");

      // Get profile
      axios
        .get("/auth/profile", { headers: { authorization: `Bearer ${token}` } })
        .then((res) => {
          if (_.includes(["ROLE_CUSTOMER"], res.data?.Roles[0]?.role)) {
            setTimeout(() => {
              Router.replace("/signin");
            }, 2000);
            return;
          }
          // Set in Context
          context.ShopProfile({
            shopId: res.data?.Shop?.id,
            shopName: res.data?.Shop?.name,
            isActive: res.data?.Shop?.isActive,
          });

          context.UserProfile({
            email: res.data?.email,
            fname: res.data?.fname,
            lname: res.data?.lname,
            role: res.data?.Roles[0]?.role,
            phone: res.data?.phone,
          });

          // Set in LocalStorage
          localStorage.setItem(
            "shop",
            JSON.stringify({
              shopId: res.data?.Shop?.id,
              shopName: res.data?.Shop?.name,
            })
          );
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          Cookie.remove("token");
          setTimeout(() => {
            Router.replace("/signin");
          }, 2000);
        });
    }, []);

    // if (isLoading) return <LoadingComponent />;

    return <WrappedComponent {...props} />;
  };

  // Check Auth Server Side

  Wrapper.getInitialProps = async (context) => {
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context));

    return { ...componentProps };
  };
  return Wrapper;
};

export default WithAuth;
