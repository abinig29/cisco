import React from 'react'
import DashbordHeader from '../../../components/dashbordHeader'

const RegistreeList = () => {
    return (
        <div>
            <DashbordHeader />
            <div className='px-10 py-6 flex justify-between '>
                <h1 className='font-bold font-poppins text-4xl'>Registrees</h1>
                {/* <button className='px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg'>Add New Registree</button> */}

            </div>
        </div>
    )
}

export default RegistreeList