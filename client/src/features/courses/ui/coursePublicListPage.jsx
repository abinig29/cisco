import React from "react";
import CourseCard from "./courseCard";
import { useGetCoursesQuery } from "../courseApiSillce";
import Loader from "../../../components/loader/loader";

const CoursePublicListPage = () => {
  const {
    data: courses,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetCoursesQuery(
    {},
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const Allcourses = courses?.courses;
  return (
    <div className="bg-slate-100">
      <div className="lg:max-w-[1280px] w-full mx-auto p-10 ">
        <h4 className="font-bold relative text-3xl  before:absolute before:w-20 before:left-[40px] before:-translate-x-[50%] before:bg-[#427cce] before:-bottom-5 before:h-1 ">
          {" "}
          Courses
        </h4>
        <PublicCourseList
          isLoading={isLoading}
          error={error}
          courses={Allcourses}
        />
      </div>
    </div>
  );
};

const PublicCourseList = ({ isLoading, error, courses }) => {
  if (isLoading) {
    return <Loader itemCount={6} />;
  }
  if (error) {
    return <h3>{error?.data?.message}</h3>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4 mt-10 md:grid-cols-2 sm:grid-cols-1">
      {courses && courses.length ? (
        courses.map((course) => {
          return <CourseCard key={course._id} course={course} />;
        })
      ) : (
        <h3>No course for today</h3>
      )}
    </div>
  );
};

export default CoursePublicListPage;
