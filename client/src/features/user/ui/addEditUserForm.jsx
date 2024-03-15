import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { userSchema } from "../userSchema";
import { FaStarOfLife } from "react-icons/fa";
import { ROLES, imgUrl } from "../../../utils/utils";

import { useNavigate } from "react-router-dom";
import { useCreateUserMutation, useUpdateUserMutation } from "../userApiSlice";
import UploadFile from "../../../components/uploadFile";
import CustomUpload from "../../../components/new-upload";

const AddCreateUserForm = ({ update, user }) => {
  const navigate = useNavigate();
  const [createUser, { isError, error, isSuccess, isLoading }] =
    useCreateUserMutation();
  const [
    updateUser,
    {
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateUserMutation();
  const [doneUploading, setDoneUploading] = useState(false);
  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      navigate("/dash/users", { replace: true });
    }
  }, [isSuccess, isUpdateSuccess, navigate]);
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const onSubmit = async (data, { resetForm }) => {
    const formData = new FormData();
    if (!data.picture) {
      return;
    } else {
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("role", data.role);
      formData.append("password", data.password);
      formData.append("picture", data.picture);

      if (update && !values.password) {
        formData.delete("password");
      }
      try {
        if (update) {
          await updateUser({ user: formData, id: user._id }).unwrap();
        } else {
          await createUser(formData).unwrap();
        }
        resetForm();
      } catch (error) {}
    }
  };

  const initialValues = {
    firstName: update ? user?.firstName : "",
    lastName: update ? user?.lastName : "",
    email: update ? user?.email : "",
    picture: update ? imgUrl + user?.picture : "",
    role: update ? user?.role : "Lecture",
  };
  const {
    touched,
    errors,
    values,
    setFieldValue,
    handleSubmit,
    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: userSchema(update),
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row  gap-10 mx-10 mt-[30px]">
        <div className="flex-1">
          <button
            type="submit"
            disabled={isLoading || isUpdateLoading}
            class="py-2.5 px-5 mr-2 text-sm font-medium disabled:bg-[#31296471] disabled:cursor-not-allowed   rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
          >
            {isLoading || isUpdateLoading ? (
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
            ) : update ? (
              "Update user"
            ) : (
              "Create user"
            )}
          </button>
          {isError && (
            <h5 className="text-sm text-red-600 text-center">
              {error?.data?.message}
            </h5>
          )}

          <div className="mb-4">
            <label
              for="firstName"
              className="block mb-2 text-sm font-medium  text-white"
            >
              First name{" "}
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                }
              </span>
            </label>
            <input
              type="text"
              {...getFieldProps("firstName")}
              id="firstName"
              className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
            />
            {touched.firstName && errors.firstName && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              for="lastName"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Last name
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                }
              </span>
            </label>
            <input
              type="text"
              {...getFieldProps("lastName")}
              id="lastName"
              className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            />

            {touched.lastName && errors.lastName && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.lastName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              for="email"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Email
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                }
              </span>
            </label>
            <input
              type="text"
              {...getFieldProps("email")}
              id="email"
              className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            />

            {touched.email && errors.email && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              for="password"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Password
              <span>
                {!update && (
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                )}
              </span>
            </label>
            <input
              type="text"
              {...getFieldProps("password")}
              id="password"
              className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            />

            {touched.email && errors.email && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              for="role"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select role
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
                }
              </span>
            </label>
            <select
              id="role"
              {...getFieldProps("role")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {options}
            </select>
            {touched.role && errors.role && (
              <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                {errors.role}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <button
            type="button"
            class="py-2.5 px-5 mr-2 text-sm opacity-0 hidden font-mediu cursor-none   rounded-lg  mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white md:inline-flex items-center"
          >
            random
          </button>

          <CustomUpload
            lable={"Cover photo"}
            picture={values.picture}
            setImg={(value) => setFieldValue("picture", value)}
          />
        </div>
      </div>
    </form>
  );
};

export default AddCreateUserForm;
