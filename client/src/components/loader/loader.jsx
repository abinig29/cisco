import React from "react";

const Loader = ({ itemCount }) => {
  const items = Array(itemCount).fill(0);
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-10 sm:grid-cols-2 grid-cols-1 w-full ">
      {items.map((course) => {
        return (
          <div
            role="status"
            class="  border border-gray-200 rounded shadow animate-pulse w-full"
          >
            <div class="flex items-center justify-center h-[250px] mb-4 bg-gray-300 rounded" />
            <div className="p-4">
              <div class="h-2.5 bg-gray-200 rounded-full  w-56 mb-8"></div>
              <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full "></div>
              <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full "></div>
              <div class="h-2.5 bg-gray-200 rounded-full  w-56 my-8"></div>
              <div class="flex flex-col mt-8 items-start ">
                <div class="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
                <div class="w-48 h-2 bg-gray-200 rounded-full "></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        );

        // return <div className="w-full animate-pulse h-[70vh] rounded-md  overflow-hidden shadow-lg bg-white" />;
      })}
    </div>
  );
};

export default Loader;
