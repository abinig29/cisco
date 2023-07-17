import React from 'react'
import { useSelector } from 'react-redux'
import { selectCoursebyId } from '../courseApiSillce'
import { useParams } from 'react-router-dom'
import AddCreateCourseForm from './addEditCourseform'
import { selectAllUsers } from '../../user/userApiSlice'
import { ROLES } from '../../../utils/utils'
import { Oval } from 'react-loader-spinner'

const AddEditCourse = () => {
    const { id } = useParams()
    let update = false
    if (id) update = true
    const course = useSelector(state => selectCoursebyId(state, id))
    const users = useSelector(selectAllUsers)
    console.log(users)
    const lectures = users.filter(user => user.role === ROLES.lecture)

    return update ? course && lectures ? <AddCreateCourseForm course={course} lectures={lectures} update={update} /> : <div className='grid place-content-center  h-screen'>
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
    </div> : lectures ? < AddCreateCourseForm lectures={lectures} /> : <div className='grid place-content-center  h-screen'>
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

export default AddEditCourse