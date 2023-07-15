import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddCreateUserForm from './addEditUserForm'
import { selectUserbyId } from '../userApiSlice'

const AddEditUser = () => {
    const { id } = useParams()
    let update = false
    if (id) update = true
    const user = useSelector(state => selectUserbyId(state, id))
    console.log(user)
    return update ? user ? <AddCreateUserForm user={user} update={update} /> : <p>Loading...</p> : < AddCreateUserForm user={user} update={update} />

}

export default AddEditUser