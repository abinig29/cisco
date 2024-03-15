import React from "react";
import { useParams } from "react-router-dom";
import AddCreateUserForm from "./addEditUserForm";
import { useGetUsersQuery } from "../userApiSlice";
import { Oval } from "react-loader-spinner";
import { NotFound } from "../../../components/notFound";
import Loader from "../../../components/loader";

const AddEditUser = () => {
  const { id } = useParams();
  let update = false;
  if (id) update = true;
  const { data: users, isLoading } = useGetUsersQuery({});
  const user = users?.users.find((user) => user._id === id);

  if (isLoading && update)
    return (
      <div className="grid place-content-center  h-screen">
        <Loader />
      </div>
    );

  return update ? (
    user ? (
      <AddCreateUserForm user={user} update={update} />
    ) : (
      <NotFound />
    )
  ) : (
    <AddCreateUserForm update={update} />
  );
};

export default AddEditUser;
