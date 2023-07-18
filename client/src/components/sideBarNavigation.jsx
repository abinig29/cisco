import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ciscoLogo from '../assets/cisco-logo.png'
import { BsBookHalf, BsBook, BsPen, BsPenFill } from 'react-icons/bs'
import { BiSolidUser } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { CiUser } from 'react-icons/ci'
import { selectId, selectRole } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { AiOutlineClose } from 'react-icons/ai'


const SideBarNavigation = ({ open, onClick }) => {
    const [sendLogout, { isError, error, isSuccess, isLoading }] = useSendLogoutMutation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const role = useSelector(selectRole)
    const isAdmin = role === "Admin"
    const handleLogout = async () => {
        try {
            navigate('/login')
            await sendLogout()
            console.log("samri")
        } catch (error) {

        }
    }

    return (

        <aside class={`fixed top-0 left-0 z-40 w-[200px] h-screen transition-transform  sm:translate-x-0 ${open ? `-translate-x-[100%]` : `-translate-x-[0%]`
            } `} >
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-900">
                <ul class="space-y-2 font-medium">
                    <div className='px-[15px] mb-20 flex gap-20'>
                        <img className='w-[60px] ' src={ciscoLogo} alt="" />
                        <div onClick={onClick} className='inline sm:hidden cursor-pointer text-white font-bold text-lg rounded'>
                            <AiOutlineClose />
                        </div>
                    </div>
                    {isAdmin && <li>
                        <div onClick={() => navigate('/dash/registrees')} class={`flex ${pathname === '/dash/registrees' ? 'bg-gray-500' : null} cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            <span><BsPen className='text-[20px] text-white' /></span>
                            <span class="ml-3">Registree</span>
                        </div>
                    </li>}
                    <li>
                        <div onClick={() => navigate('/dash/courses')} class={`flex ${pathname === '/dash/courses' ? 'bg-gray-500' : null} cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            <span><BsBook className='text-[20px]' /></span>
                            <span class="flex-1 ml-3 whitespace-nowrap">Courses</span>
                        </div>
                    </li>
                    {isAdmin && <li>
                        <div onClick={() => navigate('/dash/users')} class={`flex ${pathname === '/dash/users' ? 'bg-gray-500' : null} cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                            <CiUser className='text-[20px]' />
                            <span class="flex-1 ml-3 whitespace-nowrap">User</span>
                        </div>
                    </li>}
                    <li>
                        <div onClick={handleLogout} class="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FiLogOut className='text-[20px]' />
                            <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideBarNavigation
