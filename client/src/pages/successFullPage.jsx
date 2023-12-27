import React, { useEffect } from 'react'
import congra from '../assets/congra.png'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessFullPage = () => {
    const navigate = useNavigate()
  {  const location = useLocation();
    const { course, isRegisterd } = location.state || {};}
    useEffect(() => {
        if (!isRegisterd) {
            navigate('/')
        }

    }, [isRegisterd])

    return (<>
        {
            isRegisterd && <div className='flex justify-center  min-h-screen items-center'>
                <div className='flex flex-col w-[500px] items-center bg-slate-300 p-10 rounded shadow-sm'>
                    <h3 className='font-poppins font-bold text-[20px]'>All done</h3>
                    <img className=' h-[150px] object-cover' src={congra} alt="" />
                    <h3 className='font-poppins text-gray-800'>Congratulations! {course} registration is complete. Our team will be reaching out to you soon via
                        email to provide further details and confirm your enrollment. </h3>
                    <button className="py-2.5 px-5  text-sm font-medium  rounded-lg cursor-pointer mt-4 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center" onClick={() => navigate('/', { replace: true })}>Back to home page</button>


                </div>

            </div>

        }

    </>

    )
}

export default SuccessFullPage
