import React, { useRef, useState } from "react";
import { useGetSingleLayoutQuery } from "../features/layout/layoutApiSlice";
import { useNavigate } from "react-router-dom";
import BannerLoader from "./loader/bannerLoader";
import { BsFillPlayFill } from "react-icons/bs";
import { imgUrl } from "../utils/utils";

const Video = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const { data, isLoading } = useGetSingleLayoutQuery("video", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const layout = data?.layout[0]?.video;
  if (isLoading) return <BannerLoader />;

  return (
    layout && (
      <section className=" py-10 md:py-24 px-10">
        <div className="lg:max-w-[800px] mx-auto w-full text-center space-y-10">
          <div className="text-slate-900">
            <h3 className="text-[30px] font-poppins">{layout.title}</h3>
            <h3 className="font-poppins">{layout.subTitle}</h3>
          </div>
          <div>
            {!showVideo ? (
              <div className="relative">
                <img
                  className="object-cover"
                  style={{ width: "100%", height: "400px" }}
                  src={imgUrl + layout.banner}
                  alt="Banner"
                />
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] bg-gray-200 rounded-full px-4 py-3 font-poppins flex items-center"
                >
                  Play video
                  <BsFillPlayFill className="text-[25px] text-slate-800 " />
                </button>
              </div>
            ) : (
              <video
                className="object-cover"
                controls
                style={{ width: "100%", height: "400px" }}
              >
                <source src={layout.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default Video;
