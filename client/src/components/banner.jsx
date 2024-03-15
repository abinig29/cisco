import React from "react";
import { useGetSingleLayoutQuery } from "../features/layout/layoutApiSlice";
import { imgUrl } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import BannerLoader from "./loader/bannerLoader";

const Banner = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleLayoutQuery("banner", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const layout = data?.layout[0]?.banner;
  if (isLoading) return <BannerLoader />;

  return (
    layout && (
      <section>
        <div className="lg:max-w-[1200px] mx-auto w-full">
          <div className="flex md:flex-row flex-col items-center">
            <div className="flex-1 p-10">
              <img
                className="w-full rounded"
                src={imgUrl + layout.picture}
                alt=""
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 items-center  p-10">
              <h1 className="font-popin text-[25px]">{layout.title}</h1>
              <h5>{layout.subTitle}</h5>
              <button
                onClick={() => navigate("/about")}
                className="px-6 bg-[#427cce] text-white  text-xl py-3 mt-8 rounded-full focus:scale-110 hover:scale-110 active:scale-[1.05]"
              >
                See How it works
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Banner;
