import React from "react";

const BannerLoader = () => {
  return (
    <div
      role="status"
      class="   animate-pulse w-full lg:max-w-[1200px] mx-auto flex md:flex-row flex-col items-center mb-6 "
    >
      <div class="flex-1 h-[300px] mb-4 bg-gray-300 rounded" />
      <div className="p-4 flex-1 flex flex-col">
        <div class="h-2.5 bg-gray-200 rounded-full  w-56 mb-8"></div>
        <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full "></div>
        <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full "></div>
        <div class="h-14 bg-gray-200 rounded-full  w-56 my-8 self-center"></div>
        
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default BannerLoader;
