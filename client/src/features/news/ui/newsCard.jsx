import React from "react";
import { imgUrl } from "../../../utils/utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ news }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/news/${news._id}`)}
    >
      <div className="">
        <img
          src={news.picture}
          alt="news pic"
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </div>
      <h2 className="font-bold text-[20px]">{news.title}</h2>
      <h2 className=" text-[15px]">
       
      </h2>
      <h3 className="font-poppins mt-2">
        {moment(news.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </h3>
    </div>
  );

  // return (
  //   <div className="flex flex-col md:flex-row gap-4">
  //     <div className="flex-[1]">
  //       <img
  //         src={`${imgUrl}${news.picture}`}
  //         alt="news pic"
  //         className="w-full h-[200px] object-cover rounded-lg"
  //       />
  //     </div>
  //     <div className="flex-[2] flex flex-col ">
  //       <h2 className="font-bold text-[20px]">{news.title}</h2>
  //       <h3 className="font-poppins mt-2">
  //         {moment(news.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
  //       </h3>
  //     </div>
  //   </div>
  // );
};

export default NewsCard;
