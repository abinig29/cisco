import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ciscoLogo from '../assets/cisco-logo.png'
import { BsBookHalf, BsBook, BsPen, BsPenFill } from 'react-icons/bs'
import { BiSolidUser } from 'react-icons/bi'
import { CiUser } from 'react-icons/ci'


const SideBarNavigation = () => {
    const dashBoardlist = [
        {
            name: 'Registree',
            selectedIcon: <BsPenFill className='text-[25px] text-gray-400' />,
            icon: <BsPen className='text-[25px]' />,
            link: '/dash/registrees'
        },
        {
            name: 'Courses',
            selectedIcon: <BsBookHalf className='text-[25px] text-gray-400' />,
            icon: <BsBook className='text-[25px]' />,
            link: '/dash/courses'
        },
        {
            name: 'User',
            selectedIcon: <BiSolidUser className='text-[25px] text-gray-400' />,
            icon: <CiUser className='text-[25px]' />,
            link: '/dash/users'
        },

    ]

    const { pathname } = useLocation()
    const selected = (link) => link === pathname
    const navigate = useNavigate()


    return (
        <div className='flex flex-col items-center md:items-start gap  w-full '>
            <div className='px-[15px]'>
                <img className='w-[60px] mb-16' src={ciscoLogo} alt="" />
            </div>
            {
                dashBoardlist.map(list => {
                    return (
                        <div key={list.link} className='inline-flex  items-center cursor-pointer' onClick={() => navigate(list.link)}>
                            {selected(list.link) ? <div className='h-[40px] w-[4px] bg-[#312964]'></div> : <div className='h-[40px] w-[4px]'></div>}
                            <span className='border border-gray-600 p-4 rounded md:border-none'>{selected(list.link) ? list.selectedIcon : list.selectedIcon}</span>
                            <h5 className=' font-poppins text-white font-[25px] hidden md:block'>{list.name}</h5>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SideBarNavigation
