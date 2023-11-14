import React from "react";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { NotFound } from "../../../components/notFound";
import { useGetNewsQuery } from "../newsApiSlice";
import AddCreateNewsForm from "./addEditNewsForm";
import Loader from "../../../components/loader";

const AddEditNews = () => {
  const { id } = useParams();
  let update = false;
  if (id) update = true;
  const { data: news, isLoading: newsLoading } = useGetNewsQuery();
  const exactNews = news?.news.find((n) => n._id === id);
  if (newsLoading) {
    return (
      <div className="grid place-content-center  h-screen">
        <Loader
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
