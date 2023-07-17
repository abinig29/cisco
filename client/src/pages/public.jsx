import React from "react";
import Hero from "../components/hero";
import Header from "../components/header";
import PublicPageCourseGrid from "../features/courses/ui/publicPageCourseGrid";
import aboutImg from '../assets/about.jpg'
import { useNavigate } from "react-router-dom";
const Public = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <main className='bg-slate-100'>

        {/* HERO */}
        <Hero />
        <PublicPageCourseGrid />
        <section>
          <div className="lg:max-w-[1200px] mx-auto w-full">
            <div className="flex md:flex-row flex-col items-center">
              <div className="flex-1 p-10">
                <img className="w-full rounded" src={aboutImg} alt="" />
              </div>
              <div className="flex-1 flex flex-col gap-4 items-center  p-10">
                <h1 className="font-popin text-[25px]">
                  Welcome to our Course Registration Platform!
                </h1>
                <h5>
                  Unlock your potential with Cisco's cutting-edge courses.
                  Expand your skills with industry-leading networking, cybersecurity, and programming training.
                </h5>
                <button onClick={() => navigate('/register')} className="px-6 bg-[#312964] text-white font-bold text-xl py-4 rounded-full">
                  Get started
                </button>


              </div>

            </div>
          </div>
        </section>

      </main>
    </>


  );
};

export default Public;
