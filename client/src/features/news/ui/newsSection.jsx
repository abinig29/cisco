import React from "react";
import { useGetNewsQuery } from "../newsApiSlice";
import NewsCard from "./newsCard";
import Loader from "../../../components/loader/loader";

const NewsSection = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetNewsQuery(
    {},
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const news = data?.news;
  return (
    <div className="bg-slate-100">
      <div className="lg:max-w-[1280px] min-h-[88vh] w-full mx-auto p-10 ">
        <h4 className="font-bold relative text-3xl  before:absolute before:w-20 before:left-[40px] before:-translate-x-[50%] before:bg-[#312964] before:-bottom-5 before:h-1 ">
          {" "}
          News
        </h4>
        <News isLoading={isLoading} error={error} news={news} />
      </div>
    </div>
  );
};
const News = ({ isLoading, error, news }) => {
  if (isLoading) {
    return <Loader itemCount={3} />;
  }
  if (error) {
    return <h3>{error?.data?.message}</h3>;
  }

  return (
    <div className=" grid lg:grid-cols-3 gap-4 mt-10 md:grid-cols-2 sm:grid-cols-1 ">
      {news && news.length ? (
        news.map((news) => {
          return <NewsCard key={news._id} news={news} />;
        })
      ) : (
        <h3>No news for today</h3>
      )}
    </div>
  );
};

export default NewsSection;
