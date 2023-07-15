import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserbyId } from '../userApiSlice.js'
import { useNavigate } from 'react-router-dom'
import { imgUrl } from '../../../utils.js'
import Modal from '../../../components/modal.jsx'

const UserRow = ({ userId }) => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)


    const user = useSelector(state => selectUserbyId(state, userId))

    const profileImg = user.picture ? <img class="w-10 h-10 rounded-full object-cover" src={`${imgUrl}${user.picture}`} alt="Rounded avatar"></img> :
        (<div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg class="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>)

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {profileImg}
            </th>
            <td class="px-6 py-4">
                {user.firstName + " " + user.lastName}
            </td>
            <td class="px-6 py-4">
                {user.email}
            </td>
            <td class="px-6 py-4">
                {user.role}
            </td>
            <td className="px-6 py-4">
                <div className='inline-flex gap-2'>
                    <button onClick={() => navigate(`/dash/users/${user.id}`)} className='bg-[#432830] text-white px-4 rounded py-2'>Edit</button>
                    <button onClick={() => { setOpenModal(true) }} className='bg-[#432830] text-white px-4 rounded py-2'>Delete</button>
                    {openModal && <Modal isOpen={openModal} onClose={() => setOpenModal(false)} onOpen={() => setOpenModal(true)} />}

                </div>
            </td>
        </tr>
    )
}

export default UserRow