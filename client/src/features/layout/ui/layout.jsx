import React from "react";
import { Oval } from "react-loader-spinner";
import { useGetAllLayoutQuery } from "../layoutApiSlice";
import LayoutForm from "./layoutForm";

const Layout = () => {
  const { data, isLoading,refetch } = useGetAllLayoutQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const layout = data?.layout;
  if (isLoading) {
    return (
      <div className="grid place-content-center  h-screen">
        <Oval
          height={60}
          width={60}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return layout && <LayoutForm layout={layout} refetch={refetch} />;
};

export default Layout;
