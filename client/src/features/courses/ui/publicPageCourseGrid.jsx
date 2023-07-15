import React from 'react'
import { selectIds, useGetCoursesQuery, } from '../courseApiSillce'
import { useSelector } from 'react-redux'
import CourseCard from './courseCard'
const PublicPageCourseGrid = () => {
    const { data: courses, isLoading, isError, error, isSuccess } = useGetCoursesQuery("coursesList", {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const allCoursesIds = useSelector(selectIds)
    if (isLoading) {
        return (
            <h3>Loading</h3>
        )
    }
    if (isError) {
        return (
            <h3>{error?.data?.message}</h3>
        )
    }
    return (
        <>
            <div className="lg:max-w-[1280px] w-full mx-auto p-10 ">
                <h4 className="font-bold relative text-3xl text-center before:absolute before:w-20 before:left-[50%] before:-translate-x-[50%] before:bg-[#312964] before:-bottom-5 before:h-1 ">Courses</h4>
                <div className="grid lg:grid-cols-3 gap-4 mt-10 md:grid-cols-2 sm:grid-cols-1">
                    {allCoursesIds.length ?
                        allCoursesIds.map(id => {
                            return (<CourseCard key={id} courseid={id} />)

                        }) : <h3>No course for today</h3>
                    }

                </div>
            </div>

        </>
    )
}

export default PublicPageCourseGrid
