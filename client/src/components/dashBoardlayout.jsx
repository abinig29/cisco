import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarNavigation from './sideBarNavigation'
import DashbordHeader from './dashbordHeader'

const DashBoardlayout = () => {
    return (
        <div className='grid grid-cols-7'>
            <div className="col-span-1 py-4 bg-gray-700">
                <div className='fixed h-screen '>
                    {<SideBarNavigation />}
                </div>
            </div>
            <div className='col-span-6 min-h-screen bg-gray-800'>
                {/* <DashbordHeader /> */}
                {<Outlet />}
            </div>
        </div>
    )
}

export default DashBoardlayout