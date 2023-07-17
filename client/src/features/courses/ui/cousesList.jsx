import React from 'react'
import { selectIds, useGetCoursesQuery } from '../courseApiSillce'
import { useSelector } from 'react-redux'
import CourseRow from './courseRow'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/modal'
import { Oval } from 'react-loader-spinner'
import { selectId, selectRole } from '../../auth/authSlice'

const CoursesList = () => {
    const { data, isLoading, isError, error, isSuccess } = useGetCoursesQuery({
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const role = useSelector(selectRole)
    const id = useSelector(selectId)
    const isAdmin = role === "Admin"

    const lectureCourseId = data?.ids.filter(courseId => data?.entities[courseId].lecture.includes("64b5204588f9c0729a552b89"))
    const allCoursesIds = useSelector(selectIds)
    const displayedCourses = isAdmin ? allCoursesIds : lectureCourseId
    const navigate = useNavigate()
    if (isLoading) {
        return (
            <div className='grid place-content-center  h-screen'>
                <Oval
                    height={120}
                    width={120}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}

                />
            </div>
        )
    }
    if (isError) {
        return (
            <Modal width={'w-[400px]'} isOpen={isError} onClose={() => { }}  >
                <div class="p-6 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{error?.data?.message}</h3>
                    <button onClick={() => navigate('/login', { replace: true })} type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Login again</button>
                </div>

            </Modal>

            // <h3>{error?.data?.message}</h3>
        )
    }
    return (
        <div>

            <div className='px-10 py-6 flex justify-between '>
                <h1 className='font-bold font-poppins text-4xl text-white'>Courses</h1>
                {isAdmin && <button onClick={() => navigate("create",)} className='px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg'>Add New Course</button>}
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
                                Price(birr)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayedCourses.map(id => {
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