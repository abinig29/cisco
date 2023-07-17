import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectCoursebyId } from '../courseApiSillce'
import Header from '../../../components/header'
import { imgUrl } from '../../../utils/utils'
import { parseISO } from 'date-fns'
import { Oval } from 'react-loader-spinner'


const CourseDetailPage = () => {

    const { id } = useParams()
    const course = useSelector(state => selectCoursebyId(state, id))
    return course ? <CourseDetail course={course} /> :
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
}

export default CourseDetailPage


const CourseDetail = ({ course }) => {
    const navigate = useNavigate()
    return (
        <div className='bg-slate-100 min-h-screen'>
            <Header />
            <div className='lg:max-w-[1280px] w-full mx-auto p-10 '>
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='flex-[3] flex gap-4'>
                        <div className='flex-1'>
                            <img className='w-full' src={`${imgUrl}${course.picture}`} alt="" />
                        </div>
                        <div className='flex-1'>
                            <h2 className='font-bold font-poppins text-2xl'>{course.courseName}</h2>
                            <h5 className='font-poppins mt-2'>{course.shortDescription}</h5>
                            <h5 className='bg-[#00000070] px-4 py-2 w-[150px] text-white font-poppins text-lg mt-2 rounded text-center'>{`${course.price} birr `}</h5>
                        </div>
                    </div>
                    <div className='flex-1 p-4 shadow rounded flex flex-col items-center justify-center bg-white'>

                        <h3 className='font-bold font-poppins'>Course ends in <br />{parseISO(course.endDate).toDateString()}</h3>
                        <button onClick={() => navigate(`/${course.id}/register`)} className="rounded-full focus:outline-none focus:ring-2 focus:ring-slate-600 bg-[#312964] py-3 px-7 text- text-white text-lg mt-2">
                            Enroll now
                        </button>
                    </div>
                </div>
                <div className='bg-white p-8 mt-10 flex flex-col md:flex-row'>
                    <div className='flex-1'>
                        <h3 className='font-bold font-poppins mb-2'>About the course</h3>
                        <h4 className='font-poppins'>
                            {course.description}
                        </h4>
                        <h3 className='font-bold font-poppins my-2'>What you will learn</h3>
                        <div className='flex flex-col'>
                            {
                                course.topics.map(topic => {
                                    return (
                                        <div className='inline-flex gap-2 items-center'>
                                            <div className='bg-black  w-2 h-2 rounded-full' />
                                            <h3 className='pl-4 font-poppins'>{topic}</h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex-1'>
                    </div>
                </div>




            </div>

        </div>
    )
}


