import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="grid place-content-center  h-screen">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
