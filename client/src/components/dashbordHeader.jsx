import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFirstName, selectPicture, selectRole } from '../features/auth/authSlice'
import { imgUrl } from '../utils/utils'
import { AiOutlineMenu } from 'react-icons/ai'

const DashbordHeader = ({ onClick }) => {
    const [open, setOpen] = useState(false)
    const role = useSelector(selectRole)
    const firstName = useSelector(selectFirstName)
    const picture = useSelector(selectPicture)
    const profileImg = picture ? <img class="w-[30px] h-[30px] rounded-full object-cover" src={`${imgUrl}${picture}`} alt="Rounded avatar"></img> :
        (<div class="relative w-[30px] h-[30px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg class="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>)
    return (
        <div className='flex justify-between py-4 px-10 bg-gray-700 border-l border-black text-white'>
            <h3 className='hidden sm:block font-bold font-poppins text-lg'>{role}</h3>
            <div onClick={onClick} className='inline sm:hidden cursor-pointer text-white font-bold text-lg rounded'>
                <AiOutlineMenu />
            </div>
            <div className='inline-flex gap-2 items-center relative' >{
                profileImg
            }
                <h3 className=' font-semibold capitalize font-poppins cursor-pointer' onClick={() => setOpen(pre => !pre)}>{firstName}</h3>
                {open && <div className='absolute bg-white top-[110%] right-0 left-0 px-6 py-[10px] rounded-md'>
                    <h4 className='font-poppins font-light cursor-pointer'>Logout</h4>
                </div>}
            </div>
        </div>
    )
}

export default DashbordHeader