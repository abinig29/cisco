import React from 'react'
import { selectCoursebyId } from '../courseApiSillce'
import { useSelector } from 'react-redux'
import { BiArrowToRight } from "react-icons/bi";

import { imgUrl } from '../../../utils'

const CourseCard = ({ courseid }) => {
    const course = useSelector(state => selectCoursebyId(state, courseid))


    return (
        <div className=" w-full rounded-md  overflow-hidden shadow-lg bg-white">
            <img className="w-full h-[250px] object-cover" src={`${imgUrl}${course.picture}`} alt="" />
            <div className="flex flex-col space-y-4 p-8 justify-stretch">
                <h3 className="text-2xl">{course.courseName}</h3>
                <h2 className="text-[17px] text-slate-500">
                    {
                        course.shortDescription ? course.shortDescription : course?.description.length > 100 ? course.description.substring(0, 100) : course.description
                    }
                </h2>
                <div className="inline-flex gap-2  items-center cursor-pointer">
                    <h2 className="font-bold">Know more about the course</h2>
                    <span><BiArrowToRight /></span>
                </div>
            </div>
        </div>
    )
}

export default CourseCard