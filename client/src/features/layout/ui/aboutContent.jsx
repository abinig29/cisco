import { useFormik } from "formik";
import React, { useEffect } from "react";
import { aboutSchema } from "../schema";
import { FaStarOfLife } from "react-icons/fa";
import {
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
} from "../layoutApiSlice";

const AboutContent = ({ layout, refetch }) => {
  const aboutContent = layout.find((v) => v.hasOwnProperty("aboutContent"));
  const aboutContentUpdate = aboutContent?.aboutContent?.length;
  const [createLayout, { isError, error, isSuccess, isLoading }] =
    useCreateLayoutMutation();
  const [
    updateLayout,
    {
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateLayoutMutation();
  const onSubmit = async (values, { resetForm }) => {
    const newsData = new FormData();
    newsData.append("type", "aboutContent");
    newsData.append("title", values.title);
    newsData.append("content", values.content);

    try {
      if (aboutContentUpdate) {
        await updateLayout(newsData).unwrap();
      } else {
        await createLayout(newsData).unwrap();
      }
      resetForm();
    } catch (error) {}
  };
  const initialValues = {
    title: aboutContentUpdate
      ? aboutContent.aboutContent[0].aboutContent.title
      : "",
    content: aboutContentUpdate
      ? aboutContent.aboutContent[0].aboutContent.content
      : "",
  };
  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      refetch();
    }
  }, [isSuccess, isUpdateSuccess]);

  const {
    touched,
    errors,
    values,
    setValues,
    handleSubmit,

    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: aboutSchema,
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <h1 className=" font-poppins text-3xl text-white mb-2">
        About page content
      </h1>
      <div>
        <div className="max-w-[600px]">
          <div className="mb-4">
            <label
              for="title"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Title{" "}
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                }
              </span>
            </label>
            <input
              type="text"
              {...getFieldProps("title")}
              id="title"
              className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
            />
            {touched.title && errors.title && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.title}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              for="content"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Content{" "}
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                }
              </span>
            </label>
            <textarea
              type="text"
              cols={20}
              {...getFieldProps("content")}
              id="content"
              className=" border text-sm rounded-lg  block w-full py-3 px-2 bg-gray-700 border-gray-600 text-white "
            />
            {touched.content && errors.content && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {errors.content}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || isUpdateLoading}
            className="bg-[#432830] disabled:bg-[#43283067] disabled:cursor-not-allowed  px-3 py-2 rounded-lg text-white inline-flex items-center"
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
            ) : (
              "save"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AboutContent;
