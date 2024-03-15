import React from "react";
import { BiArrowToRight } from "react-icons/bi";

import { imgUrl } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      className=" w-full rounded-md  overflow-hidden shadow-lg bg-white cursor-pointer"
    >
      <img
        className="w-full h-[250px] object-cover"
        src={imgUrl + course.picture}
        alt=""
        lazyLoading={true}
      />
      <div className="flex flex-col space-y-4 p-8 justify-stretch">
        <h3 className="text-2xl">{course.courseName}</h3>
        <h2 className="text-[17px] text-slate-500">
          {course?.description.length > 130
            ? course.description.substring(0, 130) + ".."
            : course.description}
        </h2>
        <div className="inline-flex gap-2  items-center cursor-pointer">
          <h2 className="font-bold">Know more about the course</h2>
          <span>
            <BiArrowToRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
