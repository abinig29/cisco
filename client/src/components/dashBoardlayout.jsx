import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBarNavigation from './sideBarNavigation'
import DashbordHeader from './dashbordHeader'

const DashBoardlayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false)

    const onClik = () => {
        setOpenSidebar(pre => !pre)
    }
    return (
        <div className='flex '>
            {<SideBarNavigation open={openSidebar} onClick={onClik} setOpenSidebar={setOpenSidebar} />}
            <div className=' flex-1 min-h-screen bg-gray-800'>
                <div className='flex'>
                    <div className=' hidden sm:block w-[250px]' />
                    <div className='flex-1'>
                        <DashbordHeader onClick={onClik} />
                        {<Outlet />}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashBoardlayout