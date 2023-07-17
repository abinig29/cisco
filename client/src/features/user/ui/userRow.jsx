import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserbyId, useDeleteUserMutation } from '../userApiSlice.js'
import { useNavigate } from 'react-router-dom'
import { imgUrl } from '../../../utils/utils.js'
import Modal from '../../../components/modal.jsx'
import { useDeleteCourseMutation } from '../../courses/courseApiSillce.js'

const UserRow = ({ userId }) => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [deleteUser, { isError, error, isSuccess, isLoading }] = useDeleteUserMutation()


    const user = useSelector(state => selectUserbyId(state, userId))

    const onDelete = async () => {
        try {
            await deleteUser(userId)
            setOpenModal(false)
        } catch (error) {

        }
    }

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
                    {openModal && <Modal isOpen={openModal} onClose={() => setOpenModal(false)}  >
                        <button onClick={() => setOpenModal(false)} type="button" class="absolute top-2 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                            <button onClick={() => { onDelete() }} type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            <button onClick={() => setOpenModal(false)} type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>

                    </Modal>
                    }

                </div>
            </td>
        </tr>
    )
}

export default UserRow