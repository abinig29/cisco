import React from "react";
import { Oval } from "react-loader-spinner";
import { useGetAllLayoutQuery } from "../layoutApiSlice";
import LayoutForm from "./layoutForm";
import Loader from "../../../components/loader";

const Layout = () => {
  const { data, isLoading, refetch } = useGetAllLayoutQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const layout = data?.layout;
  if (isLoading) {
    return (
      <div className="grid place-content-center  h-screen">
        <Loader />
      </div>
    );
  }

  return layout && <LayoutForm layout={layout} refetch={refetch} />;
};

export default Layout;
