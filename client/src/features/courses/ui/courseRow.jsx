import React from 'react'
import { useSelector } from 'react-redux'
import { selectCoursebyId } from '../courseApiSillce'
import { useNavigate } from 'react-router-dom'

const CourseRow = ({ courseId }) => {
    const navigate = useNavigate()

    const course = useSelector(state => selectCoursebyId(state, courseId))
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {course.courseCode}
            </th>
            <td class="px-6 py-4">
                {course.courseName}
            </td>
            <td class="px-6 py-4">
                {course.endDate.split('T')[0]}
            </td>
            <td class="px-6 py-4">
                {course.coverdTopics.length}
            </td>
            <td className="px-6 py-4">
                <button onClick={() => navigate(`/dash/courses/${course.id}`)} className='bg-[#432830] text-white px-4 rounded py-2'>Edit</button>
            </td>
        </tr>
    )
}

export default CourseRow