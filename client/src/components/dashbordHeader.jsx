import React, { useState } from 'react'

const DashbordHeader = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='flex justify-between py-4 px-10 bg-slate-100'>
            <h3 className='font-bold font-poppins text-lg'>Admin</h3>
            <div className='inline-flex gap-2 items-center relative' >
                <img className='rounded-full w-[30px] h-[30px] object-cover' src="https://media.istockphoto.com/id/1307694376/photo/portrait-of-young-indian-man-with-folded-hands.webp?b=1&s=170667a&w=0&k=20&c=AshnZBKAGaRnF5SjNO5CAIYoSsMjAOyrFkzF6qNonT8=" alt="" />
                <h3 className=' font-semibold font-poppins cursor-pointer' onClick={() => setOpen(pre => !pre)}>Abel Nigus</h3>
                {open && <div className='absolute bg-white top-[110%] right-0 left-0 px-6 py-[10px] rounded-md'>
                    <h4 className='font-poppins font-light cursor-pointer'>Logout</h4>
                </div>}
            </div>
        </div>
    )
}

export default DashbordHeader