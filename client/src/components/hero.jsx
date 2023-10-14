import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetSingleLayoutQuery } from "../features/layout/layoutApiSlice";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleLayoutQuery("hero", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const layout = data?.layout[0]?.hero;
  console.log(layout);

  return (
    <section className="sm:h-[88vh] h-[120vh] relative z-[0] mb-16 sm:mb-0">
      <div className=" top-36 right-14 rounded-full w-[300px] h-[300px] blur-3xl z-[-20] bg-red-800/30 absolute hidden sm:block" />
      <div className=" top-52 right-64 rounded-full w-[300px] h-[300px] blur-3xl z-[-20] bg-blue-800/30 absolute hidden sm:block" />

      <div className="max-w-[1200px] mx-auto w-full h-full   items-center justify-center sm:flex-row flex-col text-slate-700 px-8 gap-4 bg-transparent flex">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0}}
          className="flex-[1]  space-y-3 flex flex-col items-center text-center sm:text-left sm:items-start justify-stretch order-2 sm:order-1 "
        >
          <h1 className="text-[30px] sm:text-[40px] font-poppins">
            {layout?.title}
          </h1>
          <h4>{layout?.subTitle}</h4>
          <button
            onClick={() => navigate("/register")}
            className="rounded-full focus:outline-none focus:scale-110 hover:scale-110 active:scale-[1.05]  focus:ring-slate-600 bg-[#427cce] py-2 px-7 text-lg mt-2 text-slate-200"
          >
            Register now
          </button>
        </motion.div>
        <div className="flex-1 sm:p-0 relative order-1 sm:order-2">
          {layout ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration:0.3
              }}
              className="flex-[1]  space-y-3 flex flex-col items-center text-center sm:text-left sm:items-start justify-stretch order-2 sm:order-1 "
            >
              <img
                src={layout?.picture}
                alt="hero-img"
                className="h-full w-full object-contain"
              />
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
