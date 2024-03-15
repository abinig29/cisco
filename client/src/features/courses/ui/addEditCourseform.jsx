import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useFormik } from "formik";
import { courseSchema } from "../schema";
import { FaStarOfLife } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../courseApiSillce";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../../auth/authSlice";
import { ROLES, imgUrl } from "../../../utils/utils";
import UploadFile from "../../../components/uploadFile";
import CustomUpload from "../../../components/new-upload";

const AddCreateCourseForm = ({ update, course, lectures, catagories }) => {
  console.log(course);
  const isAdmin = useSelector(selectRole) === ROLES.admin;
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [createCourse, { isError, error, isSuccess, isLoading }] =
    useCreateCourseMutation();
  const [
    updateCourse,
    {
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateCourseMutation();
  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      navigate("/dash/courses", { replace: true });
    }
  }, [isSuccess, isUpdateSuccess, navigate]);

  // Topics
  const tempTopic = [];
  course?.topics.forEach((topic) => {
    if (course?.coverdTopics.includes(topic))
      return tempTopic.push({ lable: topic, isChecked: true });
    tempTopic.push({ lable: topic, isChecked: false });
  });
  const [topics, setTopics] = useState(update ? tempTopic : []);
  const [topic, setTopic] = useState({
    value: "",
    error: "Topic cant be null",
    isError: false,
  });
  const handleTopic = () => {
    if (!topic.value) {
      return setTopic((pre) => ({ ...pre, isError: true }));
    }
    setTopics((pre) => [...pre, { lable: topic.value, isChecked: false }]);
    setTopic((pre) => ({
      ...pre,
      value: "",
      isError: false,
    }));
  };
  const handleCoverdTopic = (e) => {
    const value = e.target.value;
    const updatedTopics = topics.map((topic) => {
      if (topic.lable === value) {
        topic.isChecked = !topic.isChecked;
      }
      return topic;
    });
    setTopics(updatedTopics);
  };
  // Topics

  const options = lectures?.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {" "}
        {user.firstName}
      </option>
    );
  });
  const catagoryOption = catagories?.map((catagory) => {
    return (
      <option key={catagory._id} value={catagory._id}>
        {" "}
        {catagory.catagoryName}
      </option>
    );
  });
  const handleLectureChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    formik.setFieldValue("lecture", selectedOptions);
  };
  // lecture

  const onSubmit = async (values, { resetForm }) => {
    if (step === 0) return setStep(1);
    const formData = new FormData();
    formData?.append("courseName", values.courseName);
    formData?.append("courseProvider", values.courseProvider);
    formData?.append("courseCode", values.courseCode);
    formData?.append("endDate", values.endDate);
    formData?.append("startDate", values.startDate);
    formData?.append("registrationDeadline", values.registrationDeadline);
    formData?.append("aauUGStudentPrice", values.aauUGStudentPrice);
    formData?.append("aauPGStudentPrice", values.aauPGStudentPrice);
    formData?.append("description", values.description);
    formData?.append("shortDescription", values.shortDescription);
    formData?.append("lecture", values.lecture);
    formData?.append("picture", values.picture);

    formData?.append(
      "aauExtensionStudentPrice",
      values.aauExtensionStudentPrice
    );
    formData?.append("aauStaffPrice", values.aauStaffPrice);
    formData?.append(
      "noneAAUSelfSponsoredPrice",
      values.noneAAUSelfSponsoredPrice
    );
    formData?.append(
      "noneAAUOrganizationSponsoredPrice",
      values.noneAAUOrganizationSponsoredPrice
    );

    if (update) {
      if (!values.endDate) {
        formData?.delete("endDate");
      }
      if (!values.startDate) {
        formData?.delete("startDate");
      }
      if (!values.registrationDeadline) {
        formData?.delete("registrationDeadline");
      }
    }
    const coverdTopics = topics.filter((topic) => topic.isChecked);
    const topicsLable = [];
    topics.forEach((topic) => topicsLable.push(topic.lable));
    const coverdTopicsLable = [];
    coverdTopics.forEach((topic) => coverdTopicsLable.push(topic.lable));

    topicsLable?.map((tl) => {
      formData.append("topics", tl);
    });
    coverdTopicsLable?.map((cl) => {
      formData.append("coverdTopics", cl);
    });

    try {
      if (update) {
        await updateCourse({ course: formData, id: course._id }).unwrap();
      } else {
        await createCourse(formData).unwrap();
      }
    } catch (error) {}
  };

  const initialValues = {
    courseName: update ? course?.courseName : "",
    courseCode: update ? course?.courseCode : "",
    endDate: null,
    startDate: null,
    registrationDeadline: null,
    courseProvider: update ? course?.courseProvider?._id : catagories[0]._id,
    aauUGStudentPrice: update ? course?.aauUGStudentPrice : "",
    aauPGStudentPrice: update ? course?.aauPGStudentPrice : "",
    aauExtensionStudentPrice: update ? course?.aauExtensionStudentPrice : "",
    aauStaffPrice: update ? course?.aauStaffPrice : "",
    noneAAUSelfSponsoredPrice: update ? course?.noneAAUSelfSponsoredPrice : "",
    noneAAUOrganizationSponsoredPrice: update
      ? course?.noneAAUOrganizationSponsoredPrice
      : "",
    picture: update ? imgUrl + course?.picture : "",
    shortDescription: update ? course?.shortDescription : "",
    description: update ? course?.description : "",
    lecture: update ? course?.lecture : [],
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
    validationSchema: courseSchema(update),
    onSubmit,
  });
  // useEffect(()=>{console.log(values)},[values])

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles?.length) {
      acceptedFiles.map((file) => setFieldValue("picture", file));
    }
  };
  const { isDragActive, getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit}>
      {step === 0 && (
        <div className="flex flex-col md:flex-row  gap-10 mx-10 mt-[50px]">
          <div className="flex-1">
            <button
              disabled={isLoading || isUpdateLoading}
              type="submit"
              class="py-2.5 px-5 mr-2 disabled:bg-[#31296471] disabled:cursor-not-allowed  text-sm font-medium   rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
            >
              Next
              <AiOutlineArrowRight className="ml-2" />
            </button>

            <div className="mb-4">
              <label
                for="courseName"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Course name{" "}
                <span>
                  {
                    <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                  }
                </span>
              </label>
              <input
                type="text"
                {...getFieldProps("courseName")}
                id="courseName"
                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                placeholder="Cisco Certified Network Associate"
              />
              {touched.courseName && errors.courseName && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.courseName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                for="courseCode"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Course code{" "}
                <span>
                  {
                    <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                  }
                </span>
              </label>
              <input
                type="text"
                {...getFieldProps("courseCode")}
                id="courseCode"
                className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                placeholder="Bonnie Green"
              />

              {touched.courseCode && errors.courseCode && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.courseCode}
                </p>
              )}
            </div>
            <div>
              <label
                for="shortDescription"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Short description
              </label>
              <textarea
                id="shortDescription"
                {...getFieldProps("shortDescription")}
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
              {touched.shortDescription && errors.shortDescription && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.shortDescription}
                </p>
              )}
            </div>
            <div>
              <label
                for="description"
                className="block my-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Course full description
              </label>
              <textarea
                id="description"
                {...getFieldProps("description")}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
              {touched.description && errors.description && (
                <p className="text-sm text-red-600 dark:text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex-1 ">
            <button class="py-2.5 px-5 mr-2 text-sm font-medium  rounded-lg cursor-pointer mb-2   items-center opacity-0">
              create course
            </button>
            <div className="flex gap-2">
              <div>
                <label className="block mb-2 text-sm font-medium  text-white">
                  Start date{" "}
                  <span>
                    {!update && (
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    )}
                  </span>
                </label>
                <div className="mb-2 inline-flex rounded bg-gray-700  text-white items-center  border border-gray-600 w-full">
                  <BsCalendar2DateFill className="text-[30px] mx-2" />
                  <DatePicker
                    onChange={(date) => setFieldValue("startDate", date)}
                    selected={values.startDate}
                    dateFormat="yyyy-MM-dd"
                    className=" p-2 bg-transparent focus:outline-none focus:ring-0 w-[100px] "
                  />
                </div>
                {touched.startDate && errors.startDate && (
                  <p className="text-sm text-red-600 dark:text-red-500 mb-2">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium  text-white">
                  End date{" "}
                  <span>
                    {!update && (
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    )}
                  </span>
                </label>
                <div className="mb-2 inline-flex rounded bg-gray-700  text-white items-center  border border-gray-600 w-full">
                  <BsCalendar2DateFill className="text-[30px] mx-2" />
                  <DatePicker
                    onChange={(date) => setFieldValue("endDate", date)}
                    selected={values.endDate}
                    dateFormat="yyyy-MM-dd"
                    className=" p-2 bg-transparent focus:outline-none focus:ring-0 w-[100px] "
                  />
                </div>
                {touched.endDate && errors.endDate && (
                  <p className="text-sm text-red-600 dark:text-red-500 mb-2">
                    {errors.endDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium  text-white">
                  Deadline
                  <span>
                    {!update && (
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    )}
                  </span>
                </label>
                <div className="mb-2 inline-flex rounded bg-gray-700  text-white items-center  border border-gray-600 w-full">
                  <BsCalendar2DateFill className="text-[30px] ml-2" />
                  <DatePicker
                    onChange={(date) =>
                      setFieldValue("registrationDeadline", date)
                    }
                    selected={values.registrationDeadline}
                    dateFormat="yyyy-MM-dd"
                    className=" p-2 bg-transparent focus:outline-none focus:ring-0 w-[100px] "
                  />
                </div>
                {touched.registrationDeadline &&
                  errors.registrationDeadline && (
                    <p className="text-sm text-red-600 dark:text-red-500 mb-2">
                      {errors.registrationDeadline}
                    </p>
                  )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="mb-4">
                <label
                  for="aauUGStudentprice"
                  className="block mb-2 text-[10px] font-medium  text-white"
                >
                  AAU UG Student Price{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
                <input
                  type="number"
                  {...getFieldProps("aauUGStudentPrice")}
                  id="aauUGStudentPrice"
                  className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.aauUGStudentPrice && errors.aauUGStudentPrice && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.aauUGStudentPrice}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  for="aauPGStudentPrice"
                  className="block mb-2 text-[10px] font-medium  text-white"
                >
                  AAU PG Student Price{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
                <input
                  type="number"
                  {...getFieldProps("aauPGStudentPrice")}
                  id="aauPGStudentPrice"
                  className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.aauPGStudentPrice && errors.aauPGStudentPrice && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.aauPGStudentPrice}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  for="aauExtensionStudentPrice"
                  className="block mb-2 text-[10px] font-medium  text-white"
                >
                  AAU Extension Student Price{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
                <input
                  type="number"
                  {...getFieldProps("aauExtensionStudentPrice")}
                  id="aauExtensionStudentPrice"
                  className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.aauExtensionStudentPrice &&
                  errors.aauExtensionStudentPrice && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errors.aauExtensionStudentPrice}
                    </p>
                  )}
              </div>
              <div className="mb-4">
                <label
                  for="aauStaffPrice"
                  className="block mb-2 text-[10px] font-medium  text-white"
                >
                  AAU Staff Price{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
                <input
                  type="number"
                  {...getFieldProps("aauStaffPrice")}
                  id="aauStaffPrice"
                  className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.aauStaffPrice && errors.aauStaffPrice && (
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {errors.aauStaffPrice}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  for="noneAAUSelfSponsoredPrice"
                  className="block mb-2 text-[10px] font-medium  text-white"
                >
                  None AAU Self Sponsered Price{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
                <input
                  type="number"
                  {...getFieldProps("noneAAUSelfSponsoredPrice")}
                  id="noneAAUSelfSponsoredPrice"
                  className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.noneAAUSelfSponsoredPrice &&
                  errors.noneAAUSelfSponsoredPrice && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errors.noneAAUSelfSponsoredPrice}
                    </p>
                  )}
              </div>
              <div className="mb-4">
                <label
                  for="noneAAUOrganizationSponsoredPrice"
                  className="block mb-2 text-[10px] font-medium  text-white"
                >
                  None AAU Organization Sponsered Price{" "}
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-1" />
                    }
                  </span>
                </label>
                <input
                  type="number"
                  {...getFieldProps("noneAAUOrganizationSponsoredPrice")}
                  id="noneAAUOrganizationSponsoredPrice"
                  className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
                />
                {touched.noneAAUOrganizationSponsoredPrice &&
                  errors.noneAAUOrganizationSponsoredPrice && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errors.noneAAUOrganizationSponsoredPrice}
                    </p>
                  )}
              </div>
            </div>

            {
              <div className="w-full">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Lectures
                  <span>
                    {
                      <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
                    }
                  </span>
                </label>
                <select
                  disabled={!isAdmin}
                  id="countries"
                  multiple
                  onChange={handleLectureChange}
                  {...getFieldProps("lecture")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {options}
                </select>
                {touched.lecture && errors.lecture && (
                  <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                    {errors.lecture}
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="max-w-[500px] mx-6 mt-[50px] px-4">
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => setStep(0)}
              disabled={isLoading || isUpdateLoading}
              class="py-2.5 disabled:bg-[#31296471] disabled:cursor-not-allowed px-5 mr-2 text-sm font-medium   rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
            >
              <AiOutlineArrowRight className="mr-2 rotate-180" />
              Previous
            </button>
            <button
              type="submit"
              disabled={isLoading || isUpdateLoading}
              class="py-2.5 px-5 mr-2 disabled:bg-[#31296471] disabled:cursor-not-allowed text-sm font-medium   rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center"
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
                "Update course"
              ) : (
                "Create course"
              )}
            </button>
          </div>

          <CustomUpload
            lable={"Cover photo"}
            picture={values.picture}
            setImg={(value) => setFieldValue("picture", value)}
          />

          <div className="w-full">
            <label
              for="catagory"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Course provider
              <span>
                {
                  <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
                }
              </span>
            </label>
            <select
              id="courseProvider"
              // onChange={(e) => setFieldValue("courseProvider", e.target.value)}
              {...getFieldProps("courseProvider")}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {catagoryOption}
            </select>
            {touched.courseProvider && errors.courseProvider && (
              <div className="text-sm text-red-600 dark:text-red-500 mb-2">
                {errors.courseProvider}
              </div>
            )}
          </div>
          <div className="flex items-start flex-col   w-full mb-3 ">
            <label
              for="username-success"
              className="block my-2 text-sm font-medium  text-white"
            >
              Add course topic
            </label>
            <div className="inline-flex items-center w-full gap-[20px]">
              <input
                type="text"
                id="username-success"
                value={topic.value}
                onChange={(e) =>
                  setTopic((pre) => ({
                    ...pre,
                    isError: false,
                    value: e.target.value,
                  }))
                }
                className=" border text-sm flex-[4] rounded-lg  block  p-2.5 bg-gray-700 border-gray-600 text-white "
                placeholder="Bonnie Green"
              />
              <button
                type="button"
                className="bg-[#432830] text-white px-4 rounded py-2 "
                onClick={handleTopic}
              >
                Add topic
              </button>
            </div>
            {topic.isError && (
              <p className="text-sm text-red-600 dark:text-red-500">
                {topic.error}
              </p>
            )}
          </div>
          {topics.map((topic) => {
            return (
              <div class="flex items-center h-10 pl-4 border border-gray-200 rounded dark:border-gray-700 mb-4">
                <input
                  id="bordered-checkbox-1"
                  value={topic.lable}
                  onChange={(e) => handleCoverdTopic(e)}
                  type="checkbox"
                  checked={topic.isChecked}
                  name="bordered-checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {topic.lable}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default AddCreateCourseForm;
