import React, { useState } from 'react'
import { imgUrl } from '../../../utils/utils'
import { selectRegistreesbyId, useUpdateRegistreeMutation } from '../registreeApiSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Modal from '../../../components/modal'
import { selectCoursebyId } from '../../courses/courseApiSillce'
import { Oval } from 'react-loader-spinner'

const RegistreeviewPage = () => {
    const { id } = useParams()
    const registree = useSelector(state => selectRegistreesbyId(state, id))
    const course = useSelector(state => selectCoursebyId(state, registree?.course))
    return (
        registree && course ? <RegistreeView registree={registree} course={course} /> :
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
    )
}

export default RegistreeviewPage


const RegistreeView = ({ registree, course }) => {
    const [openModal, setOpenModal] = useState(false)
    const [confirmed, setConfirmed] = useState(registree.status)
    const [updateRegistree] = useUpdateRegistreeMutation()
    const handleChange = async () => {
        try {
            setConfirmed(pre => !pre)
            await updateRegistree({ user: { status: !confirmed }, id: registree.id })
        } catch (error) {
            setConfirmed(pre => !pre)
        }


    }
    return (
        <div className='mt-6 mx-6'>
            <div className='flex flex-col md:flex-row gap-4 items-center '>
                <div className='flex-1'>
                    <img className='w-full cursor-pointer' onClick={() => { setOpenModal(true) }} src={`${imgUrl}${registree.picture}`} alt="" />
                    <h5 className='text-sm text-gray-500'>click on the image to enlarge it</h5>
                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mt-4">
                        <input checked={confirmed} onChange={handleChange} id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="bordered-checkbox-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm payment</label>
                    </div>
                </div>
                <div className='flex flex-col flex-1 text-white  gap-2 py-10 shadow w-full'>
                    <div className=''>
                        <h3>Full name</h3>
                        <h3 className='bg-gray-700 p-4 rounded'>{registree.firstName + " " + registree.lastName}</h3>
                    </div>
                    <div className=''>
                        <h3>Email</h3>
                        <h3 className='bg-gray-700 p-4 rounded'>{registree.email}</h3>
                    </div>
                    <div className=''>
                        <h3>Phone number</h3>
                        <h3 className='bg-gray-700 p-4 rounded'>{registree.phoneNumber}</h3>
                    </div>
                    <div className=''>
                        <h3>Course</h3>
                        <h3 className='bg-gray-700 p-4 rounded'>{course.courseName}</h3>
                    </div>
                    <div className=''>
                        <h3>Status</h3>
                        <h3 className='bg-gray-700 p-4 rounded'>{registree.status ? <span>confirmed</span> : <span className='text-green-400'>pending</span>}</h3>
                    </div>

                </div>
            </div>

            {openModal && <Modal isOpen={openModal} onClose={() => setOpenModal(false)} bg={'bg-transparent'} >
                <button onClick={() => setOpenModal(false)} type="button" class="absolute top-2 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center ">
                    <img className='w-full h-[80vh] object-cover' src={`${imgUrl}${registree.picture}`} alt="" />
                </div>

            </Modal>
            }

        </div>
    )
}
