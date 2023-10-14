import React from "react";
import { imgUrl } from "../../../utils/utils";
import { useParams } from "react-router-dom";
import { useGetNewsQuery } from "../newsApiSlice";
import { Oval } from "react-loader-spinner";
import moment from "moment";

const NewsDetail = () => {
  const { id } = useParams();
  const { data: news, isLoading } = useGetNewsQuery();
  const newsData = news?.news.find((n) => n._id === id);
  if (isLoading) {
    return (
      <div className="grid place-content-center  h-[80vh]">
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
  return newsData ? <NewsDetailpage news={newsData} /> : <NotFound />;
};

const NewsDetailpage = ({ news }) => {
  console.log(news);
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
          {news.mainContent.map((v) => {
            return (
              <div className="mt-3 first:mt-0">
                <h3 className="text-[18px] font-bold mb-2">{v.topic}</h3>
                <h5>{v.content}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
