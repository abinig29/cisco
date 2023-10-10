import React from "react";

import RegistrationPageForm from "./registrationPageForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useGetCoursesQuery } from "../../courses/courseApiSillce";

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
};

export default RegistrationPage;
