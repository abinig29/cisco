import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { imgUrl } from "../../../utils/utils";
import { bannerSchema } from "../schema";
import { FiUploadCloud } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaStarOfLife } from "react-icons/fa";
import {
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
} from "../layoutApiSlice";
import { IoAlertOutline } from "react-icons/io5";
import UploadFile from "../../../components/uploadFile";
import CustomUpload from "../../../components/new-upload";

const Banner = ({ layout, refetch }) => {
  const banner = layout.find((v) => v.hasOwnProperty("banner"));
  const bannerUpdate = banner?.banner?.length;

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

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      refetch();
    }
  }, [isSuccess, isUpdateSuccess]);

  const onSubmit = async (values, { resetForm }) => {
    const bannerData = new FormData();
    bannerData.append("type", "banner");
    bannerData.append("title", values.title);
    bannerData.append("subTitle", values.subTitle);
    bannerData.append("picture", values.picture);

    try {
      if (bannerUpdate) {
        await updateLayout(bannerData).unwrap();
      } else {
        await createLayout(bannerData).unwrap();
      }
      resetForm();
    } catch (error) {}
  };
  const initialValues = {
    title: bannerUpdate ? banner.banner[0].banner.title : "",
    subTitle: bannerUpdate ? banner.banner[0].banner.subTitle : "",
    picture: bannerUpdate ? imgUrl + `${banner.banner[0].banner.picture}` : "",
  };

  const {
    touched,
    errors,
    values,
    setValues,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: bannerSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1 className=" font-poppins text-3xl text-white mb-2">
        Home page banner
      </h1>
      <section className={`${bannerUpdate ? `mb-20` : ``}`}>
        <div className=" w-full ">
          <div className="flex md:flex-row flex-col  ">
            <div className="flex-1   ">
              <CustomUpload
                lable={"Banner photo"}
                picture={values.picture}
                setImg={(value) => setFieldValue("picture", value)}
              />
            </div>
            <div className="flex-1 md:flex md:flex-col gap-4 items-center justify-center   p-10 text-white space-y-6 md:space-y-0">
              {bannerUpdate ? (
                <div className="flex items-center self-start text-gray-400/30">
                  <IoAlertOutline />
                  <h5>click on words to edit them</h5>
                </div>
              ) : null}
              {!bannerUpdate ? (
                <label
                  htmlFor="title"
                  className="block  text-sm font-medium  text-white self-start"
                >
                  Title{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
              ) : null}
              <textarea
                cols={2}
                className={` font-poppins   ${
                  bannerUpdate
                    ? `outline-none font-popin text-[25px] bg-transparent no-scrollbar `
                    : `border-gray-600 bg-slate-600 rounded-2xl px-2 text-[20px] py-6`
                }  w-full`}
                {...getFieldProps("title")}
              />
              {touched.title && errors.title && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.title}
                </p>
              )}
              {!bannerUpdate ? (
                <label
                  htmlFor="subTitle"
                  className="block  text-sm font-medium  text-white self-start"
                >
                  SubTitle{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
              ) : null}
              <textarea
                cols={4}
                className={` font-popin 
                ${
                  bannerUpdate
                    ? `outline-none bg-transparent no-scrollbar py-4 `
                    : `border-gray-600 bg-slate-600 rounded-2xl px-2  py-6`
                } w-full`}
                {...getFieldProps("subTitle")}
              />
              {touched.subTitle && errors.subTitle && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.subTitle}
                </p>
              )}

              <button
                disabled={true}
                onClick={() => navigate("/register")}
                className="px-6 bg-[#427cce] text-white font-bold text-xl py-4 rounded-full"
              >
                Get started
              </button>
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
      </section>
    </form>
  );
};

export default Banner;
