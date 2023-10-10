import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FiUploadCloud } from "react-icons/fi";
import { ErrorMessage, Field, useFormik } from "formik";
import newSchema from "../schema";
import { FaStarOfLife } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useUpdateNewsMutation } from "../newsApiSlice";
import { useCreateNewsMutation } from "../newsApiSlice";
import { AiFillCloseCircle, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { imgUrl } from "../../../utils/utils";

const AddCreateNewsForm = ({ news, update }) => {
  const navigate = useNavigate();
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
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      navigate("/dash/news", { replace: true });
    }
  }, [isSuccess, isUpdateSuccess, navigate]);

  const onSubmit = async (values, { resetForm }) => {
    const newsData = new FormData();
    newsData.append("title", values.title);
    newsData.append("picture", values.picture);

    newsData.append("mainContent", JSON.stringify(values.mainContent));

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
    picture: update ? `${imgUrl}${news.picture}` : "",
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

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
      acceptedFiles.map((file) => setFieldValue("picture", file));
    }
  });
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
    setFieldValue("picture", "");
  };
  const { isDragActive, getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row  gap-10 mx-10 mt-[30px]">
        <div className="flex-1">
          <button
            type="submit"
            class="py-2.5 px-5 mr-2 text-sm font-medium  rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
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
            class="py-2.5 px-5 mr-2 text-sm font-medium opacity-0  rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
          >
            news
          </button>
          <div>
            {update && typeof values.picture === "string" && (
              <img
                src={values.picture}
                alt={"alt"}
                width={100}
                height={100}
                className="h-full w-full object-cover "
              />
            )}
          </div>
          {!files.length && (
            <div>
              <div
                {...getRootProps({
                  className:
                    `w-full border-dashed border-gray-500 border mt-4 cursor-pointer mb-4 ${update && typeof values.picture === "string" ?`h-[80px]`:`h-[380px]`} text-white flex flex-col items-center justify-center`,
                })}
              >
                <input {...getInputProps()} />
                {values.picture ? (
                  <>{ update && typeof values.picture === "string"?"change the cover photo":values.picture.name}</>
                ) : isDragActive ? (
                  <>Draging.... </>
                ) : (
                  <div className=" py-3 flex flex-col items-center text-white">
                    <FiUploadCloud className="text-[40px]" />
                    <h3>Drag and drop to upload</h3>
                    <h5>or browse</h5>
                  </div>
                )}
              </div>
              {touched.picture && errors.picture && (
                <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                  {errors.picture}
                </div>
              )}
            </div>
          )}

          {typeof values.picture !== "string" &&
            files.map((file) => (
              <div
                key={file.name}
                className="relative h-[385px] flex-1 bg-red-400 mt-4"
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-cover "
                />
                <button
                  type="button"
                  className=" bg-secondary-400 rounded-full absolute -top-3 -right-3 "
                  onClick={() => removeFile(file.name)}
                >
                  <AiFillCloseCircle className="text-[30px] text-white hover:text-gray-600" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </form>
  );
};

export default AddCreateNewsForm;
