import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddCreateUserForm from './addEditUserForm'
import { selectUserbyId } from '../userApiSlice'
import { Oval } from 'react-loader-spinner'

const AddEditUser = () => {
    const { id } = useParams()
    let update = false
    if (id) update = true
    const user = useSelector(state => selectUserbyId(state, id))

    return update ? user ? <AddCreateUserForm user={user} update={update} /> :
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
        </div> : < AddCreateUserForm user={user} update={update} />

}

export default AddEditUser