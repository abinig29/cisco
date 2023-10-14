import React from "react";
import { useGetSingleLayoutQuery } from "../features/layout/layoutApiSlice";
import aboutServer from "../assets/aboutServer.png";
import TextLoader from "./loader/textLoader";
import { useNavigate } from "react-router-dom";

const AboutContent = () => {
  const navigate = useNavigate();

  const { data, isLoading, errors } = useGetSingleLayoutQuery("aboutContent");
  const layout = data?.layout[0]?.aboutContent;
  return (
    <div className="md:h-[400px] lg:h-[400px] h-[650px] mb-16 bg-gradient">
      <div className="flex flex-col sm:flex-row justify-between items-center px-10  max-w-[1200px] mx-auto  h-full ">
        <div className="text-gray-700 flex-1  order-2 sm:order-1 ">
          {!isLoading && !errors ? (
            <>
              <h2 className="text-[30px] font-bold font-poppins mb-6">
                {layout?.title}
              </h2>
              <h5 className="max-w-[500px] leading-7 font-poppins text-[16px]">
                {layout?.content}
              </h5>
              <button
                onClick={() => navigate("/course")}
                className="px-6 bg-[#427cce] text-white  text-xl py-3 mt-8 rounded-full focus:scale-110 hover:scale-110 active:scale-[1.05]"
              >
                Explore course
              </button>
            </>
          ) : (
            <TextLoader />
          )}
        </div>
        <div className="flex-1 order-1 sm:order-2  ">
          <img src={aboutServer} alt="about server" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
