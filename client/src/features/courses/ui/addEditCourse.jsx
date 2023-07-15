import React from 'react'
import { useSelector } from 'react-redux'
import { selectCoursebyId } from '../courseApiSillce'
import { useParams } from 'react-router-dom'
import AddCreateCourseForm from './addEditCourseform'

const AddEditCourse = () => {
    const { id } = useParams()
    let update = false
    if (id) update = true
    const course = useSelector(state => selectCoursebyId(state, id))
    return update ? course ? <AddCreateCourseForm course={course} update={update} /> : <p>Loading...</p> : < AddCreateCourseForm course={course} update={update} />

}

export default AddEditCourse