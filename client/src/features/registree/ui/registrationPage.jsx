import React from 'react'
import { selectAllCourses, selectCoursebyId } from '../../courses/courseApiSillce'
import RegistrationPageForm from './registrationPageForm'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'


const RegistrationPage = () => {
    const { id } = useParams()
    let selectedCoureExists = false
    if (id) selectedCoureExists = true
    const course = useSelector(state => selectCoursebyId(state, id))
    const courses = useSelector(selectAllCourses)
    return selectedCoureExists ? course && courses ? <RegistrationPageForm selectedCourse={course} courses={courses} /> :
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
        : courses ? <RegistrationPageForm selectedCourse={course} courses={courses} /> :
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

export default RegistrationPage