import React from 'react'
import { selectIds, useGetCoursesQuery, } from '../courseApiSillce'
import { useSelector } from 'react-redux'
import CourseCard from './courseCard'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
const PublicPageCourseGrid = () => {
    const { data: courses, isLoading, isError, error, isSuccess } = useGetCoursesQuery("coursesList", {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const navigate = useNavigate()
    console.log(courses)

    const allCoursesIds = useSelector(selectIds).length >= 3 ? useSelector(selectIds).slice(0, 3) : useSelector(selectIds)
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
            <h3>{error?.data?.message}</h3>
        )
    }
    return (
        <>
            <div className="lg:max-w-[1280px] w-full mx-auto p-10 flex items-center flex-col ">
                <h4 className="font-bold relative text-3xl text-center before:absolute before:w-20 before:left-[50%] before:-translate-x-[50%] before:bg-[#312964] before:-bottom-5 before:h-1 ">Recent Courses</h4>
                <div className="grid lg:grid-cols-3 gap-4 mt-10 md:grid-cols-2 sm:grid-cols-1">
                    {allCoursesIds.length ?
                        allCoursesIds.map(id => {
                            return (<CourseCard key={id} courseid={id} />)

                        }) : <h3>No course for today</h3>
                    }

                </div>
                <button onClick={() => navigate('/course')} className="px-6 bg-[#312964] text-white font-bold text-xl py-2 mt-4 rounded-full">
                    Explore more
                </button>
            </div>

        </>
    )
}

export default PublicPageCourseGrid
