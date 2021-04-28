import React from "react";
import { useRouter } from "next/router";
const MainApp = () => {
  const router = useRouter();

  return <>TEST</>;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/signin",
    },
    props: {},
  };
};

export default MainApp;
