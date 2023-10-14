import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import aboutImg from "../.././../assets/about.jpg";
import { useFormik } from "formik";
import { faqSchema, aboutSchema } from "../schema";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { FaStarOfLife } from "react-icons/fa";
import AboutContent from "./aboutContent";
import Banner from "./banner";
import {
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
} from "../layoutApiSlice";
import Video from "./video";
import Hero from "./hero";

const LayoutForm = ({ layout, refetch }) => {
  const faq = layout.find((v) => v.hasOwnProperty("faq"));
  const faqUpdate = faq.faq.length;

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

  const initialValues = {
    faq: faqUpdate ? faq.faq[0].faq : [{ question: "", answer: "" }],
  };
  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      refetch();
    }
  }, [isSuccess, isUpdateSuccess]);
  const onSubmit = async () => {
    const newsData = new FormData();
    newsData.append("type", "faq");
    newsData.append("faq", JSON.stringify(values.faq));

    try {
      if (faqUpdate) {
        await updateLayout(newsData).unwrap();
      } else {
        await createLayout(newsData).unwrap();
      }
      resetForm();
    } catch (error) {}
  };
  const {
    touched,
    errors,
    values,
    setValues,
    handleSubmit,
    handleChange,
    handleBlur,
    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: faqSchema,
    onSubmit,
  });

  const handleAddItem = () => {
    setValues((prevValues) => ({
      ...prevValues,
      faq: [...prevValues.faq, { question: "", answer: "" }],
    }));
  };
  const handleRemoveItem = (index) => {
    if (values.faq.length === 1) return;
    setValues((prevValues) => {
      const updatedfaq = [...prevValues.faq];
      updatedfaq.splice(index, 1);
      return {
        ...prevValues,
        faq: updatedfaq,
      };
    });
  };

  return (
    <div className="px-10 py-6  items-start gap-2">
      <Banner layout={layout} refetch={refetch} />
      <h1 className=" font-poppins text-3xl text-white mb-2">Faq</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="">
          {values.faq.map((content, index) => {
            return (
              <div
                key={index}
                className=" bg-slate-600/20 p-4 mt-2 rounded-md max-w-[600px]"
              >
                <label
                  htmlFor={`faq[${index}].question`}
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Question
                </label>
                <input
                  type="text"
                  id={`faq[${index}].question`}
                  name={`faq[${index}].question`}
                  value={values.faq[index].question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.faq &&
                  touched.faq[index] &&
                  errors.faq &&
                  errors.faq[index] && (
                    <div className="text-sm text-red-600 dark:text-red-500">
                      {errors.faq[index].question}
                    </div>
                  )}

                <label
                  className="block mb-2 text-sm font-medium  text-white"
                  htmlFor={`faq[${index}].answer`}
                >
                  Answer
                </label>
                <input
                  id={`faq[${index}].answer`}
                  name={`faq[${index}].answer`}
                  value={values.faq[index].answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border text-sm rounded-lg  block w-full p-2.5  bg-gray-700 border-gray-600 text-white "
                />
                {touched.faq &&
                  touched.faq[index] &&
                  errors.faq &&
                  errors.faq[index] && (
                    <div className="text-sm text-red-600 dark:text-red-500">
                      {errors.faq[index].answer}
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
            );
          })}
          <button
            type="button"
            class=" p-2 mt-2 inline-flex   rounded-full  text-sm font-medium   cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white  items-center"
            onClick={() => handleAddItem()}
          >
            <AiOutlinePlus className="" />
            Add question
          </button>
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
      </form>
      <AboutContent layout={layout} refetch={refetch} />
      <Video layout={layout} refetch={refetch} />
      <Hero layout={layout} refetch={refetch} />
    </div>
  );
};

export default LayoutForm;
