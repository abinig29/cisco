import React from 'react'
import { selectCoursebyId } from '../courseApiSillce'
import { useSelector } from 'react-redux'
import { BiArrowToRight } from "react-icons/bi";

import { imgUrl } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ courseid }) => {
    const course = useSelector(state => selectCoursebyId(state, courseid))
    const navigate = useNavigate()



    return (
        <div className=" w-full rounded-md  overflow-hidden shadow-lg bg-white">
            <img className="w-full h-[250px] object-cover" src={`${imgUrl}${course.picture}`} alt="" />
            <div className="flex flex-col space-y-4 p-8 justify-stretch">
                <h3 className="text-2xl">{course.courseName}</h3>
                <h2 className="text-[17px] text-slate-500">
                    {
                        course?.description.length > 130 ? course.description.substring(0, 130) + '..' : course.description
                    }
                </h2>
                <h3 className="text-lg font-semibold font-poppins text-gray-600">{`${course.price} birr`}</h3>
                <div onClick={() => navigate(`/course/${course.id}`)} className="inline-flex gap-2  items-center cursor-pointer">
                    <h2 className="font-bold">Know more about the course</h2>
                    <span><BiArrowToRight /></span>
                </div>
            </div>
        </div>
    )
}

export default CourseCard