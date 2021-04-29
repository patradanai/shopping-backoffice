import React, { useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { axios } from "../../utils/api/shopping";
import Router from "next/router";
import LoadingComponent from "../Loading";
import { Context } from "../../context/Dashboard.reducer";

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
          console.log(res.data);

          // Set in Context
          context.ShopProfile({
            shopId: res.data?.Shop?.id,
            shopName: res.data?.Shop?.name,
          });

          // Set in LocalStorage
          localStorage.setItem(
            "shop",
            JSON.stringify({
              shopId: res.data?.Shop?.id,
              shopName: res.data?.Shop?.name,
            })
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          Cookie.remove("token");
          setTimeout(() => {
            Router.replace("/signin");
          }, 2000);
        });
    }, []);

    if (isLoading) return <LoadingComponent />;

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
