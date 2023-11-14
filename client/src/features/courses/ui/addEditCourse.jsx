import React from "react";
import { useParams } from "react-router-dom";
import AddCreateCourseForm from "./addEditCourseform";
import { ROLES } from "../../../utils/utils";
import { Oval } from "react-loader-spinner";
import { useGetUsersQuery } from "../../user/userApiSlice";
import { useGetCoursesQuery } from "../courseApiSillce";
import { NotFound } from "../../../components/notFound";
import { useGetCatagoriesQuery } from "../../catagory/catagoryApiSlice";
import Loader from "../../../components/loader";

const AddEditCourse = () => {
  const { id } = useParams();
  let update = false;
  if (id) update = true;
  const { data: courses, isLoading: courseLoading } = useGetCoursesQuery();
  const { data: catagory, isLoading: catagoryLoading } =
    useGetCatagoriesQuery();
  const { data: users, isLoading: userLoading } = useGetUsersQuery({});
  const course = courses?.courses.find((course) => course._id === id);
  const lectures = users?.users.filter((user) => user.role === ROLES.lecture);
  const catagories = catagory?.catagories;
  if (courseLoading || userLoading || catagoryLoading) {
    return (
      <div className="grid place-content-center  h-screen">
        <Loader
        />
      </div>
    );
  }

  return update ? (
    course && lectures && catagories ? (
      <AddCreateCourseForm
        course={course}
        lectures={lectures}
        update={update}
        catagories={catagories}
      />
    ) : (
      <NotFound />
    )
  ) : (
    lectures && catagories && (
      <AddCreateCourseForm lectures={lectures} catagories={catagories} />
    )
  );
};

export default AddEditCourse;
