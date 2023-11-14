import React from "react";

import RegistrationPageForm from "./registrationPageForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useGetCoursesQuery } from "../../courses/courseApiSillce";
import Loader from "../../../components/loader";

const RegistrationPage = () => {
  const { id } = useParams();
  let selectedCoureExists = false;
  if (id) selectedCoureExists = true;
  const { data } = useGetCoursesQuery();
  const courses = data?.courses;
  const course = courses?.find((course) => course._id === id);

  return courses ? (
    <RegistrationPageForm selectedCourse={course} courses={courses} />
  ) : (
    <div className="grid place-content-center  h-screen">
      <Loader
      />
    </div>
  );
};

export default RegistrationPage;
