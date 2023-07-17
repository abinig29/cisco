import React from 'react'
import Header from '../../../components/header'
import { useSelector } from 'react-redux'
import CourseCard from './courseCard'
import { selectIds } from '../courseApiSillce'

const CoursePublicListPage = () => {
    const allCoursesIds = useSelector(selectIds)

    return (
        <div className='bg-slate-100'>
            <Header />
            <div className="lg:max-w-[1280px] w-full mx-auto p-10 ">
                <h4 className="font-bold relative text-3xl  before:absolute before:w-20 before:left-[40px] before:-translate-x-[50%] before:bg-[#312964] before:-bottom-5 before:h-1 "> Courses</h4>
                <div className="grid lg:grid-cols-3 gap-4 mt-10 md:grid-cols-2 sm:grid-cols-1">
                    {allCoursesIds.length ?
                        allCoursesIds.map(id => {
                            return (<CourseCard key={id} courseid={id} />)

                        }) : <h3>No course for today</h3>
                    }

                </div>
            </div>


        </div>
    )
}

export default CoursePublicListPage
