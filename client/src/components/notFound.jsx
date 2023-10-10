import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-transparent flex justify-center items-center flex-col">
      <h4 className=" text-[30px] mb-4 text-gray-500">Page not found!</h4>
      <button
        className="px-6 bg-[#312964] text-white font-bold text-xl py-2 rounded-full"
        onClick={() => navigate(-1)}
      >
        Back to previos page
      </button>
    </div>
  );
};
