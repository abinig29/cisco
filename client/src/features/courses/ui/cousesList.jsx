import React, { useEffect, useState } from "react";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../courseApiSillce";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal";
import { Oval } from "react-loader-spinner";
import { selectId, selectRole } from "../../auth/authSlice";

import BasicTable from "../../../components/table";
import DeleteModal from "../../../components/deleteModal";
import moment from "moment";
import { deleteFile } from "../../../utils/utils";
import Loader from "../../../components/loader";

const CoursesList = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetCoursesQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [openModal, setOpenModal] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [
    deleteCourse,
    {
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
    },
  ] = useDeleteCourseMutation();
  const onDelete = async () => {
    try {
      await deleteCourse(deletedId).unwrap();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const role = useSelector(selectRole);
  const id = useSelector(selectId);
  const isAdmin = role === "Admin";
  const FilterdCourse = isAdmin
    ? data?.courses
    : data?.courses?.filter((course) => {
        return course.lecture.includes(id);
      });
  const navigate = useNavigate();
  useEffect(() => {
    if (deleteIsSuccess) {
      const course = FilterdCourse.find((v) => v._id == deletedId);
      const courseBannerPath = course?.picture;
    }
  }, [deleteIsSuccess]);
  const columns = [
    {
      header: "COURSE CODE",
      accessorKey: "courseCode",
    },
    {
      header: "COURSE NAME",
      accessorKey: "courseName",
    },
    {
      header: "START DATE",
      accessorKey: "startDate",
      cell: (value) => moment(value.getValue()).format("MMMM Do YYYY"),
    },
    {
      header: "COURSE PROVIDER",
      accessorKey: "courseProvider",
      cell: (value) => value.getValue()?.catagoryName,
    },
    {
      header: "Action",
      accessorKey: "_id",
      cell: (value) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dash/courses/${value.getValue()}`)}
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
    return <Loader />;
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
        <h1 className=" font-poppins text-3xl text-white mb-2">Courses</h1>
        {isAdmin && (
          <button
            onClick={() => navigate("create")}
            className="px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg"
          >
            Add New Course
          </button>
        )}
      </div>

      <BasicTable
        data={FilterdCourse}
        columns={columns}
        filterKey={"courseName"}
        keyToDisplay={"Course name"}
      />
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAction={onDelete}
        deletedItemName={"course"}
      />
    </div>
  );
};

export default CoursesList;
