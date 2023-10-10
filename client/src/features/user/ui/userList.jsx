import React, { useState } from "react";
import { Oval } from "react-loader-spinner";

import { useDeleteUserMutation, useGetUsersQuery } from "../userApiSlice.js";
import { useNavigate } from "react-router-dom";
import BasicTable from "../../../components/table.jsx";
import DeleteModal from "../../../components/deleteModal.jsx";
import { imgUrl } from "../../../utils/utils.js";

const UsersList = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetUsersQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const users = data?.users;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [
    deleteUser,
    {
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
    },
  ] = useDeleteUserMutation();
  const profileImg = (picture) =>
    picture ? (
      <img
        class="w-10 h-10 rounded-full object-cover"
        src={`${imgUrl}${picture}`}
        alt="Rounded avatar"
      ></img>
    ) : (
      <div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          class="absolute w-10 h-10 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    );
  const columns = [
    {
      header: "Profile",
      accessorKey: "picture",
      cell: (value) => profileImg(value.getValue()),
    },

    {
      header: "USER NAME",
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      header: "EMAIL",
      accessorKey: "email",
    },
    {
      header: "ROLE",
      accessorKey: "role",
    },

    {
      header: "Action",
      accessorKey: "_id",
      cell: (value) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dash/user/${value.getValue()}`)}
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

  const onDelete = async () => {
    try {
      await deleteUser(deletedId).unwrap();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (isError) {
    return (
      <div>
        <div className="px-10 py-6 flex justify-between ">
          <h1 className="font-bold font-poppins text-4xl text-white">Users</h1>
          <button
            onClick={() => navigate("create")}
            className="px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg"
          >
            Add New User
          </button>
        </div>
        <h3>{error?.data?.message}</h3>
      </div>
    );
  }
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

  return (
    <div>
      <div className="px-10 py-6 flex justify-between ">
        <h1 className="font-bold font-poppins text-4xl text-white">Users</h1>
        <button
          onClick={() => navigate("create")}
          className="px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg"
        >
          Add New User
        </button>
      </div>

      <BasicTable data={users} columns={columns} filterKey={"email"} />
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAction={onDelete}
        deletedItemName={'user'}
      />
    </div>
  );
};

export default UsersList;
