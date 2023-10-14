import React from "react";
import { useGetCoursesQuery } from "../courseApiSillce";
import { useSelector } from "react-redux";
import CourseCard from "./courseCard";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/loader";
const PublicPageCourseGrid = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetCoursesQuery(
    {},
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const navigate = useNavigate();
  const courses = data?.courses;
  const Allcourses = courses?.length > 3 ? courses.slice(0, 3) : courses;

  if (isLoading) {
    return (
      <div className="p-10 lg:max-w-[1280px] mx-auto">
        <Loader itemCount={3} />
      </div>
    );
  }
  if (isError) {
    return <h3>{error?.data?.message}</h3>;
  }
  return (
    <>
      <div className="lg:max-w-[1280px] w-full mx-auto px-10 flex items-center flex-col pb-16">
        <h4 className="font-bold relative text-3xl text-center before:absolute before:w-20 before:left-[50%] before:-translate-x-[50%] before:bg-[#427cce] before:-bottom-5 before:h-1 ">
          Recent Courses
        </h4>
        <div className="grid lg:grid-cols-3 gap-4 mt-10 md:grid-cols-2 sm:grid-cols-1 ">
          {Allcourses.length ? (
            Allcourses.map((course) => {
              return <CourseCard key={course._id} course={course} />;
            })
          ) : (
            <h3>No course for today</h3>
          )}
        </div>
        <button
          onClick={() => navigate("/course")}
          className="px-6 bg-[#427cce] text-white  text-xl py-2 mt-8 rounded-full focus:scale-110 hover:scale-110 active:scale-[1.05]"
        >
          Explore more
        </button>
      </div>
    </>
  );
};

export default PublicPageCourseGrid;
