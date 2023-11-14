import React from "react";
import { imgUrl } from "../../../utils/utils";
import { useParams } from "react-router-dom";
import { useGetNewsQuery } from "../newsApiSlice";
import { Oval } from "react-loader-spinner";
import moment from "moment";
import { Preview } from "../../../components/preview";
import Loader from "../../../components/loader";

const NewsDetail = () => {
  const { id } = useParams();
  const { data: news, isLoading } = useGetNewsQuery();
  const newsData = news?.news.find((n) => n._id === id);
  if (isLoading) {
    return (
      <div className="grid place-content-center  h-[80vh]">
        <Loader
        />
      </div>
    );
  }
  return newsData ? <NewsDetailpage news={newsData} /> : <NotFound />;
};

const NewsDetailpage = ({ news }) => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col max-w-[1000px] mx-auto min-h-[88vh] py-10 gap-4 px-6 md:px-0">
        <img
          src={news.picture}
          alt="news pic"
          className="w-full object-cover rounded-lg h-[500px]"
        />
        <div className="w-full justify-between flex items-center font-poppins">
          <h3 className="font-bold text-[20px] ">{news.title}</h3>
          <h3 className="font-bold">
            {moment(news.createdAt).format("MMMM Do YYYY")}
          </h3>
        </div>
        <div className="font-poppins text-black">
          <Preview value={news.mainContent} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
