import React from "react";

const LoadingButton = () => {
  return (
    <div
      className="motion-safe::animate-spin animate-spin rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"
      style={{ borderTopColor: "red" }}
    ></div>
  );
};

export default LoadingButton;
