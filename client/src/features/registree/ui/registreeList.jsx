import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import {
  useDeleteRegistreeMutation,
  useGetRegistreesQuery,
} from "../registreeApiSlice";
import Modal from "../../../components/modal";
import BasicTable from "../../../components/table";
import DeleteModal from "../../../components/deleteModal";
const userType = [
  {
    type: "All user",
  },
  {
    type: "Pending user",
  },
];

const RegistreeList = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetRegistreesQuery(
    "",
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const navigate = useNavigate();
  const [typeOfUser, setTypeofuser] = useState("All user");
  const [registrees, setRegistrees] = useState([]);
  const [selectModal, setSlectModal] = useState(false);
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
  ] = useDeleteRegistreeMutation();
  const onDelete = async () => {
    try {
      await deleteUser(deletedId).unwrap();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) setRegistrees(data.registree);
  }, [data]);
  useEffect(() => {
    if (data) {
      if (typeOfUser == "All user") return setRegistrees(data.registree);
      const pendingUser = registrees.filter((registree) => !registree.status);
      setRegistrees(pendingUser);
    }
  }, [typeOfUser]);
  const columns = [
    {
      header: "FIRST NAME",
      accessorKey: "firstName",
    },
    {
      header: "LAST NAME",
      accessorKey: "lastName",
    },
    {
      header: "EMAIL",
      accessorKey: "email",
    },
    {
      header: "PHONE NUMBER",
      accessorKey: "phoneNumber",
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: (value) => (value.getValue() ? "Confirmed" : "Pending"),
    },

    {
      header: "COURSE",
      accessorKey: "course",
      cell: (value) => value.getValue()?.courseName,
    },
    {
      header: "Action",
      accessorKey: "_id",
      cell: (value) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dash/registrees/${value.getValue()}`)}
            className="bg-[#432830] text-white px-4 rounded py-2"
          >
            View
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

  const isAllUser = typeOfUser === "All user";
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
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

      // <h3>{error?.data?.message}</h3>
    );
  }
  if (isLoading) {
    return (
      <div className="grid place-content-center  h-[90vh]">
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
        <h1 className="font-bold font-poppins text-4xl text-white">
          Registrees
        </h1>
        <div
          className="bg-gray-700 px-10 py-[8px] cursor-pointer rounded relative w-52"
          onClick={() => setSlectModal((pre) => !pre)}
        >
          <h3 className=" font-poppins text-white">{typeOfUser}</h3>
          {selectModal && (
            <div className="absolute top-100 right-0 rounded mt-4 p-2 left-0 text-white z-10 bg-gray-600 ">
              {userType.map((user) => {
                return (
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setTypeofuser(user.type)}
                  >
                    {typeOfUser === user.type ? (
                      <span className="w-3 h-3 rounded-full bg-white border-[3px] border-blue-500"></span>
                    ) : (
                      <span className="w-3 h-3 rounded-full bg-gray-600 border-[1px] "></span>
                    )}
                    <h3>{user.type}</h3>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <BasicTable data={registrees} columns={columns} filterKey={"firstName"} />
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAction={onDelete}
      />
    </div>
  );
};

export default RegistreeList;
