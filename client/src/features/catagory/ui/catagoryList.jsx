import React, { useEffect, useState } from "react";
import {
  useCreateCatagoryMutation,
  useDeleteCatagoryMutation,
  useGetCatagoriesQuery,
  useUpdateCatagoryMutation,
} from "../catagoryApiSlice";
import { AiOutlineSwapRight, AiFillDelete } from "react-icons/ai";
import { IoAlertOutline } from "react-icons/io5";
import { FaStarOfLife } from "react-icons/fa";
import DeleteModal from "../../../components/deleteModal";

const CatagoryList = () => {
  const { data, isLoading: catagoryLoading } = useGetCatagoriesQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [
    deleteCatagory,
    {
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
    },
  ] = useDeleteCatagoryMutation();

  const onDelete = async () => {
    try {
      await deleteCatagory(deletedId).unwrap();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [createCatagory, { isError, error, isSuccess, isLoading }] =
    useCreateCatagoryMutation();
  const [updateCatagory, { isLoading: updateLoading }] =
    useUpdateCatagoryMutation();
  const catagories = data?.catagories;
  const onSubmit = async () => {
    try {
      if (editingId)
        await updateCatagory({
          catagory: { catagoryName: name },
          id: editingId,
        }).unwrap();
      else await createCatagory({ catagoryName: name }).unwrap();
      setName("");
      setEditingId("");
    } catch (error) {}
  };
  useEffect(() => {
    if (editingId)
      setName(
        catagories.find((catagory) => catagory._id === editingId).catagoryName
      );
  }, [editingId]);
  useEffect(() => {
    if (!name) setEditingId("");
  }, [name]);
  return (
    <div className="px-10 py-6 flex flex-col justify-between items-start gap-2">
      <button
        onClick={() => onSubmit()}
        disabled={isLoading || updateLoading}
        class="py-2.5 px-5 mr-2 text-sm font-medium disabled:bg-[#31296471] disabled:cursor-not-allowed  rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
      >
        {isLoading || updateLoading ? (
          <>
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600 "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            <h3>Loading...</h3>
          </>
        ) : editingId ? (
          "Update catagory"
        ) : (
          "Create Catagory"
        )}
      </button>
      <label
        for="catagoryName"
        className="block mb-2 text-sm font-medium  text-white"
      >
        Catagory name{" "}
        <span>
          {<FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />}
        </span>
      </label>
      <input
        type="text"
        id="catagoryName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white max-w-[400px] "
      />
      <div className="flex items-center text-gray-400/30">
        <IoAlertOutline />
        <h5>click the catagory to edit its name</h5>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {catagories?.map((catagory) => {
          return (
            <div className="flex items-center gap-4">
              <div
                className="max-w-[400px] flex-1 text-white text-[22px] flex items-center gap-4 bg-gray-300/10 px-2 rounded cursor-pointer"
                onClick={() => setEditingId(catagory._id)}
              >
                <AiOutlineSwapRight />
                {catagory.catagoryName}
              </div>
              <button
                onClick={() => {
                  setDeletedId(catagory._id);
                  setOpenModal(true);
                }}
                className="bg-red-300 p-1 rounded-lg"
              >
                <AiFillDelete className="text-[22px] text-white" />
              </button>
            </div>
          );
        })}
      </div>
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAction={onDelete}
        deletedItemName={"Course provider"}
      />
    </div>
  );
};
export default CatagoryList;
