import React, { useCallback, useEffect, useState } from "react";
import registreeSchema from "../schema";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { FiUploadCloud } from "react-icons/fi";
import { FaStarOfLife } from "react-icons/fa";

import { useCreateRegistreeMutation } from "../registreeApiSlice";
import { useNavigate } from "react-router-dom";
import { gender, registreeType } from "../../../utils/utils";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineCrisisAlert } from "react-icons/md";
import UploadFile from "../../../components/uploadFile";

const RegistrationPageForm = ({ courses, selectedCourse }) => {
  const [price, setPrice] = useState(courses[0][registreeType[0].key]);
  const [doneUploading, setDoneUploading] = useState(false);
  const [doneUploading2, setDoneUploading2] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    personalPicture: "",
    gender: "Male",
    program:"Day",
    registreeType: registreeType?.length && registreeType[0].key,
    course: selectedCourse
      ? selectedCourse._id
      : courses?.length && courses[0]._id,
    phoneNumber: "",
  };

  const navigate = useNavigate();
  const [createRegistree, { isError, error, isSuccess, isLoading }] =
    useCreateRegistreeMutation();

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    const selectedcourseId = values.course;
    const selectedCourse = courses.find(
      (course) => course._id === selectedcourseId
    ).courseName;

    try {
      const { _id: id } = await createRegistree(values).unwrap();
      const data = { course: selectedCourse, isRegisterd: true };
      resetForm();
      navigate(`/${id}/sucessfull`, { replace: true, state: data });
    } catch (error) {}
  };
  const options = courses.map((course) => {
    return (
      <option className="text-black" key={course._id} value={course._id}>
        {" "}
        {course.courseName}
      </option>
    );
  });
  const registreeOption = registreeType.map((registree) => {
    return (
      <option className="text-black" key={registree.key} value={registree.key}>
        {" "}
        {registree.value}
      </option>
    );
  });
  const programOption = ["Night", "Day"].map((registree, index) => {
    return (
      <option className="text-black" key={index} value={registree}>
        {" "}
        {registree}
      </option>
    );
  });
  const genderOption = gender.map((g) => {
    return (
      <option className="text-black capitalize" key={g} value={g}>
        {" "}
        {g}
      </option>
    );
  });

  const {
    touched,
    errors,
    values,
    setFieldValue,
    handleSubmit,
    getFieldProps,
  } = useFormik({
    initialValues,
    validationSchema: registreeSchema,
    onSubmit,
  });
  useEffect(() => {
    const course = courses.find((course) => course._id === values.course);
    setPrice(
      values.gender === "Female"
        ? course[values.registreeType] * 0.75
        : course[values.registreeType]
    );
  }, [values.registreeType, values.course]);
  useEffect(() => {
    const course = courses.find((course) => course._id === values.course);
    const price = course[values.registreeType];
    if (values.gender === "Female") setPrice(price * 0.75);
    if (values.gender === "Male") setPrice(price);
  }, [values.gender]);
  useEffect(() => {
    if (values.picture) setDoneUploading(true);
    if (values.personalPicture) setDoneUploading2(true);
  }, [values.picture, values.personalPicture]);
  return (
    <main className="bg-slate-100 min-h-[85vh]">
      <div className="flex justify-center pt-4">
        <form onSubmit={handleSubmit}>
          <div className="w-[70vw] flex gap-6 flex-col md:flex-row">
            <div className="flex-1">
              <div className="mb-2">
                <label
                  for="firstName"
                  className="block mb-2 text-sm font-medium  text-black"
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
                  className=" border text-sm   block w-full p-2  border-gray-600 "
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  for="lastName"
                  className="block mb-2 text-sm font-medium  "
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
                  className=" border  text-sm   block w-full p-2  border-gray-600 text-black"
                />

                {touched.lastName && errors.lastName && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label for="email" className="block mb-2 text-sm font-medium  ">
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
                  className=" border  text-sm   block w-full p-2  border-gray-600 "
                />

                {touched.email && errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  for="phoneNumber"
                  className="block mb-2 text-sm font-medium  "
                >
                  Phone number
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
                <input
                  type="text"
                  {...getFieldProps("phoneNumber")}
                  id="phoneNumber"
                  className=" border  text-sm   block w-full p-2  border-gray-600 text-black"
                />

                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  for="gender"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select Gender
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
                    }
                  </span>
                </label>
                <select
                  id="gender"
                  {...getFieldProps("gender")}
                  class="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark: dark:border-gray-600 dark:placeholder-black placeholder:text-gray-500"
                >
                  {genderOption}
                </select>
                {touched.gender && errors.gender && (
                  <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                    {errors.gender}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  for="regitsreeType"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select Registree Type
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
                    }
                  </span>
                </label>
                <select
                  id="registreeType"
                  {...getFieldProps("registreeType")}
                  class="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark: dark:border-gray-600 dark:placeholder-black placeholder:text-gray-500"
                >
                  {registreeOption}
                </select>
                {touched.registreeType && errors.registreeType && (
                  <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                    {errors.registreeType}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  for="course"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select course
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
                    }
                  </span>
                </label>
                <select
                  id="course"
                  {...getFieldProps("course")}
                  class="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark: dark:border-gray-600 dark:placeholder-black placeholder:text-gray-500"
                >
                  {options}
                </select>
                {touched.course && errors.course && (
                  <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                    {errors.course}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-[1px] bg-red-200 round " />

                <div className="bg-gray-400/10 font-poppins rounded-lg px-4 py-2 text-black flex items-center gap-2 border border-gray-800">
                  Price
                  <AiOutlineArrowRight />
                  {price}
                  {" Birr"}
                </div>
                <div className="flex-1 h-[1px] bg-red-200 round" />
              </div>
              <div className="flex items-center  justify-center text-[16px] text-gray-600">
                <MdOutlineCrisisAlert />
                <h3 className="">There is 15% discount to women</h3>
              </div>
            </div>
            <div className="flex-1 mt-2 ">
              <div className="mb-2">
                <label
                  for="gender"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select Program
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
                    }
                  </span>
                </label>
                <select
                  id="gender"
                  {...getFieldProps("program")}
                  class="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark: dark:border-gray-600 dark:placeholder-black placeholder:text-gray-500"
                >
                  {programOption}
                </select>
                {touched.program && errors.program && (
                  <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                    {errors.program}
                  </div>
                )}
              </div>
              <div className="md:flex md:gap-8">
                <div className="flex-1">
                  <UploadFile
                    height={150}
                    lable={"Bill photo"}
                    picture={values.picture}
                    imgTouched={touched.picture}
                    imgError={errors.picture}
                    setImg={(value) => setFieldValue("picture", value)}
                  />
                </div>
                <div className="flex-1">
                  <UploadFile
                    height={150}
                    lable={"Personal photo"}
                    picture={values.personalPicture}
                    imgTouched={touched.personalPicture}
                    imgError={errors.personalPicture}
                    setImg={(value) => setFieldValue("personalPicture", value)}
                  />
                </div>
              </div>

              <button
                disabled={!doneUploading || !doneUploading2 || isLoading}
                type="submit"
                class="py-2.5 px-5  text-sm font-medium disabled:bg-[#427cce70] disabled:cursor-not-allowed   rounded-lg cursor-pointer my-2 focus:z-10 focus:ring-2  bg-[#427cce]  text-white inline-flex items-center"
              >
                {isLoading ? (
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
                  "Register"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegistrationPageForm;
