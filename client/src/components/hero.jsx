import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <section className="bg h-[89vh]">
            <div className="lg:max-width-[1200px] mx-auto w-full h-full  flex items-center justify-center flex-col ">
                <h1 className="text-[50px] text-white  font-bold font-poppins">
                    Your IT needs a breakthrough.
                </h1>
                <button onClick={() => navigate('/register')} className="rounded-full focus:outline-none focus:ring-2 focus:ring-slate-600 bg-[#427cce] py-3 px-7 text- text-white text-lg mt-2">
                    Register now
                </button>
            </div>
        </section>
    )
}

export default Hero
