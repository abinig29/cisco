import React from "react";
import { useParams } from "react-router-dom";
import AddCreateUserForm from "./addEditUserForm";
import { useGetUsersQuery } from "../userApiSlice";
import { Oval } from "react-loader-spinner";
import { NotFound } from "../../../components/notFound";

const AddEditUser = () => {
  const { id } = useParams();
  let update = false;
  if (id) update = true;
  const { data: users, isLoading } = useGetUsersQuery({});
  const user = users?.users.find((user) => user._id === id);

  if (isLoading)
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

  return update ? (
    user ? (
      <AddCreateUserForm user={user} update={update} />
    ) : (
      <NotFound />
    )
  ) : (
    <AddCreateUserForm user={user} update={update} />
  );
};

export default AddEditUser;
