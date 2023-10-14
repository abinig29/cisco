import React, { useCallback, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Field, useFormik } from "formik";
import newSchema from "../schema";
import { FaStarOfLife } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useUpdateNewsMutation } from "../newsApiSlice";
import { useCreateNewsMutation } from "../newsApiSlice";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { imgUrl } from "../../../utils/utils";
import UploadFile from "../../../components/uploadFile";

const AddCreateNewsForm = ({ news, update }) => {
  const navigate = useNavigate();
  const [doneUploading, setDoneUploading] = useState(false);
  const [createNews, { isError, error, isSuccess, isLoading }] =
    useCreateNewsMutation();
  const [
    updateNews,
    {
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateNewsMutation();

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      navigate("/dash/news", { replace: true });
    }
  }, [isSuccess, isUpdateSuccess, navigate]);

  const onSubmit = async (values, { resetForm }) => {
    const newsData = {};
    newsData.title = values.title;
    newsData.picture = values.picture;
    newsData.mainContent = JSON.stringify(values.mainContent);

    try {
      if (update) {
        
        await updateNews({ news: newsData, id: news._id }).unwrap();
      } else {
        await createNews(newsData).unwrap();
      }
      resetForm();
    } catch (error) {}
  };

  const initialValues = {
    title: update ? news?.title : "",
    mainContent: update ? news?.mainContent : [{ topic: "", content: "" }],
    picture: update ? news.picture : "",
  };
  const {
    touched,
    errors,
    values,
    setValues,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: newSchema(update),
    onSubmit,
  });

  const handleAddItem = () => {
    setValues((prevValues) => ({
      ...prevValues,
      mainContent: [...prevValues.mainContent, { topic: "", content: "" }],
    }));
  };
  const handleRemoveItem = (index) => {
    console.log({ index });
    if (values.mainContent.length === 1) return;
    setValues((prevValues) => {
      const updatedMainContent = [...prevValues.mainContent];
      updatedMainContent.splice(index, 1);
      return {
        ...prevValues,
        mainContent: updatedMainContent,
      };
    });
  };
  useEffect(() => {
    if (values.picture) setDoneUploading(true);
  }, [values.picture]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row  gap-10 mx-10 mt-[30px]">
        <div className="flex-1">
          <button
            type="submit"
            disabled={isLoading || isUpdateLoading || !doneUploading}
            class="py-2.5 px-5 mr-2 disabled:bg-[#31296471] disabled:cursor-not-allowed  text-sm font-medium  rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
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
              "Update news"
            ) : (
              "Create news"
            )}
          </button>

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
          <div>
            <label
              for="title"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Main Content{" "}
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                }
              </span>
            </label>
            {values.mainContent.map((content, index) => (
              <div
                key={index}
                className="flex flex-col items-start bg-slate-600/20 p-4 mt-2 rounded-md"
              >
                <label
                  htmlFor={`mainContent[${index}].topic`}
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Topic
                </label>
                <input
                  type="text"
                  id={`mainContent[${index}].topic`}
                  name={`mainContent[${index}].topic`}
                  value={values.mainContent[index].topic}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.mainContent &&
                  touched.mainContent[index] &&
                  errors.mainContent &&
                  errors.mainContent[index] && (
                    <div className="text-sm text-red-600 dark:text-red-500">
                      {errors.mainContent[index].topic}
                    </div>
                  )}

                <label
                  className="block mb-2 text-sm font-medium  text-white"
                  htmlFor={`mainContent[${index}].content`}
                >
                  Content
                </label>
                <textarea
                  id={`mainContent[${index}].content`}
                  name={`mainContent[${index}].content`}
                  value={values.mainContent[index].content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  col={20}
                  className="border text-sm rounded-lg  block w-full py-5 px-2  bg-gray-700 border-gray-600 text-white "
                />
                {touched.mainContent &&
                  touched.mainContent[index] &&
                  errors.mainContent &&
                  errors.mainContent[index] && (
                    <div className="text-sm text-red-600 dark:text-red-500">
                      {errors.mainContent[index].content}
                    </div>
                  )}
                <button
                  type="button"
                  className="bg-red-500p-2 self-end mt-2 rounded-full bg-red-400 p-1"
                  onClick={() => handleRemoveItem(index)}
                >
                  <AiFillDelete className="text-[20px] text-white " />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            class=" p-2 mt-2 md:inline-flex   rounded-full  text-sm font-medium   cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white  items-center"
            onClick={() => handleAddItem()}
          >
            <AiOutlinePlus className="" />
            {/* Add content */}
          </button>
        </div>
        <div className="flex-1">
          <button
            type="submit"
            class="py-2.5 px-5 mr-2 text-sm font-medium opacity-0 hidden rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white md:inline-flex items-center"
          >
            news
          </button>

          <UploadFile
            setDoneUploading={setDoneUploading}
            height={150}
            textColor={"text-white"}
            lable={"Cover photo"}
            picture={values.picture}
            imgTouched={touched.picture}
            imgError={errors.picture}
            setImg={(value) => setFieldValue("picture", value)}
          />
        </div>
      </div>
    </form>
  );
};

export default AddCreateNewsForm;
