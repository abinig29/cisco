import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header";
import { imgUrl, registreeType } from "../../../utils/utils";
import { differenceInDays, parseISO } from "date-fns";
import { Oval } from "react-loader-spinner";
import { useGetCoursesQuery } from "../courseApiSillce";
import { NotFound } from "../../../components/notFound";
import { CiCalendarDate } from "react-icons/ci";
import { AiOutlineCheckCircle } from "react-icons/ai";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { data: courses, isLoading } = useGetCoursesQuery();
  const course = courses?.courses.find((course) => course._id === id);
  if (isLoading) {
    return (
      <div className="grid place-content-center  h-[80vh]">
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
  }
  return course ? <CourseDetail course={course} /> : <NotFound />;
};

export default CourseDetailPage;

const CourseDetail = ({ course }) => {
  const navigate = useNavigate();
  const today = new Date();
  const remainingDays = differenceInDays(
    new Date(course.registrationDeadline),
    today
  );
  const daysPassed = Math.abs(remainingDays);
  const dayToDisplay =
    remainingDays > 0 ? (
      <div className="font-bold text-[20px]">
        {remainingDays}
        <br />
        <span className="text-[16px] font-thin">Days left</span>
      </div>
    ) : remainingDays === 0 ? (
      <span>Today</span>
    ) : (
      <div className="font-bold text-[20px]">
        {daysPassed}
        <br />
        <span className="text-[12px] font-thin">Days Passed</span>
      </div>
    );
  const classStyle = remainingDays > 0 ? "left" : "passed";
  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="lg:max-w-[1280px] w-full mx-auto p-10 ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-[3] flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <img
                className="w-full"
                src={`${imgUrl}${course.picture}`}
                alt=""
              />
              <h5
                className={`w-[100px] h-[100px] rounded-full flex justify-center items-center ${
                  classStyle === "passed" ? `bg-red-600` : `bg-green-400`
                } text-white font-poppins rounded-full mt-2 py-2 text-center absolute bottom-[-20px] right-[-30px]`}
              >
                {dayToDisplay}
              </h5>
            </div>
            <div className="flex-1">
              <h2 className="font-bold font-poppins text-2xl">
                {course.courseName}
              </h2>
              <h5 className="font-poppins mt-6">{course.shortDescription}</h5>
            </div>
          </div>
          <div className="flex-1  shadow rounded flex flex-col  bg-white px-4 py-8  gap-4">
            <div className=" font-poppins flex  justify-between">
              <div className="flex gap-2">
                <CiCalendarDate className="text-[25px]" />
                Start date
              </div>
              {parseISO(course.startDate).toDateString()}
            </div>
            <div className=" font-poppins flex justify-between">
              <div className="flex gap-2">
                <CiCalendarDate className="text-[25px]" />
                End date
              </div>

              {parseISO(course.endDate).toDateString()}
            </div>
            <div className=" font-poppins flex justify-between">
              <div className="flex gap-2">
                <CiCalendarDate className="text-[25px]" />
                Registration <br /> Deadline
              </div>

              {parseISO(course.registrationDeadline).toDateString()}
            </div>
            <button
              onClick={() => navigate(`/${course._id}/register`)}
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-slate-600 bg-[#312964] py-3 px-7 text- text-white text-lg mt-2"
            >
              Enroll now
            </button>
          </div>
        </div>
        <div className="bg-white p-8 mt-10 flex flex-col md:flex-row ">
          <div className="flex-1">
            <h3 className="font-bold font-poppins mb-2">About the course</h3>
            <h4 className="font-poppins">{course.description}</h4>
            <h3 className="font-bold font-poppins my-2">What you will learn</h3>
            <div className="flex flex-col">
              {course.topics.map((topic) => {
                return (
                  <div className="inline-flex gap-2 items-center">
                    <div className="bg-black  w-2 h-2 rounded-full" />
                    <h3 className="pl-4 font-poppins">{topic}</h3>
                  </div>
                );
              })}
            </div>
            <h3 className="font-bold font-poppins my-2">Covered topics</h3>
            <div className="flex flex-col">
              {course.coverdTopics.length ? (
                course.coverdTopics.map((topic) => {
                  return (
                    <div className="inline-flex gap-2 items-center">
                      <AiOutlineCheckCircle className="text-[20px]" />
                      <h3 className="pl-4 font-poppins">{topic}</h3>
                    </div>
                  );
                })
              ) : (
                <span className="text-gray-400 ml-2">When the course started, coverd topics will display here.</span>
              )}
            </div>
          </div>
          <div className="flex-1 font-poppins mt-10 md:mt-0 ml-0 md:ml-10 max-w-[500px]">
            <div className="">
              <h3 className="font-bold font-poppins mb-2">Price list</h3>
              <div className="space-y-2">
                {registreeType.map((t) => {
                  return (
                    <div className=" gap-2 items-center grid grid-cols-2 bg-slate-200 rounded py-1 px-3">
                      <h3>{t.value}</h3>
                      <h3 className="pl-4 font-poppins">{course[t.key]} Birr</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
