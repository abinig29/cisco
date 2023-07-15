import React from 'react'

import { selectIds, useGetCoursesQuery } from '../courseApiSillce'
import { useSelector } from 'react-redux'
import CourseRow from './courseRow'
import { useNavigate } from 'react-router-dom'

const CoursesList = () => {
    // const { data: courses, isLoading, isError, error, isSuccess } = useGetCoursesQuery({
    //     refetchOnFocus: true,
    //     refetchOnMountOrArgChange: true
    // })
    const allCoursesIds = useSelector(selectIds)
    const navigate = useNavigate()
    // if (isLoading) {
    //     return (
    //         <h3>Loading</h3>
    //     )
    // }
    // if (isError) {
    //     return (
    //         <h3>{error?.data?.message}</h3>
    //     )
    // }
    return (
        <div>

            <div className='px-10 py-6 flex justify-between '>
                <h1 className='font-bold font-poppins text-4xl text-white'>Courses</h1>
                <button onClick={() => navigate("create",)} className='px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg'>Add New Course</button>
            </div>

            <div className="relative overflow-x-auto  ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-[#312964] ">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Covered Topics
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allCoursesIds.map(id => {
                                return (<CourseRow key={id} courseId={id} />)
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CoursesList