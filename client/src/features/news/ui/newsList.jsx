import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal";
import { Oval } from "react-loader-spinner";
import { useDeleteNewsMutation, useGetNewsQuery } from "../newsApiSlice";
import moment from "moment";

import BasicTable from "../../../components/table";
import DeleteModal from "../../../components/deleteModal";

const NewsList = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetNewsQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [
    deleteNews,
    {
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
    },
  ] = useDeleteNewsMutation();

  const onDelete = async () => {
    try {
      await deleteNews(deletedId).unwrap();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const news = data?.news;
  /** @type import('@tanstack/react-table').ColumnDef<any> */

  const columns = [
    {
      header: "ID",
      accessorKey: "_id",
    },

    {
      header: "TITLE",
      accessorKey: "title",
    },
    {
      header: "CREATED AT",
      accessorKey: "createdAt",
      cell: (value) => moment(value.getValue()).format("MMMM Do YYYY"),
    },

    {
      header: "Action",
      accessorKey: "_id",
      cell: (value) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dash/news/${value.getValue()}`)}
            className="bg-[#432830] text-white px-4 rounded py-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpenModal(true);
              setDeletedId(value.getValue());
            }}
            className="bg-[#432830] text-white px-4 rounded py-2"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
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
  if (isError) {
    return (
      <Modal width={"w-[400px]"} isOpen={isError} onClose={() => {}}>
        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {error?.data?.message}
          </h3>
          <button
            onClick={() => navigate("/login", { replace: true })}
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Login again
          </button>
        </div>
      </Modal>
    );
  }
  return (
    <div>
      <div className="px-10 py-6 flex justify-between ">
        <h1 className="font-bold font-poppins text-4xl text-white">News</h1>

        <button
          onClick={() => navigate("create")}
          className="px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg"
        >
          Add New News
        </button>
      </div>
      <BasicTable data={news} columns={columns} filterKey={"title"} />
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAction={onDelete}
      />
    </div>
  );
};

export default NewsList;
