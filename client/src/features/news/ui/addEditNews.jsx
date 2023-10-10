import React from "react";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { NotFound } from "../../../components/notFound";
import { useGetNewsQuery } from "../newsApiSlice";
import AddCreateNewsForm from "./addEditNewsForm";

const AddEditNews = () => {
  const { id } = useParams();
  let update = false;
  if (id) update = true;
  const { data: news, isLoading: newsLoading } = useGetNewsQuery();
  const exactNews = news?.news.find((n) => n._id === id);
  if (newsLoading) {
    return (
      <div className="grid place-content-center  h-screen">
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

  return update ? (
    exactNews ? (
      <AddCreateNewsForm news={exactNews} update={update} />
    ) : (
      <NotFound />
    )
  ) : (
    <AddCreateNewsForm news={exactNews} update={update} />
  );
};

export default AddEditNews;
