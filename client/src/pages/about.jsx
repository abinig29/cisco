import React from "react";

import { BsBrowserChrome } from "react-icons/bs";
import { AiFillCreditCard, AiOutlineArrowRight } from "react-icons/ai";
import { FaCashRegister } from "react-icons/fa";
import FAQ from "../components/faq";
import { useNavigate } from "react-router-dom";
import { useGetSingleLayoutQuery } from "../features/layout/layoutApiSlice";
import AboutContent from "../components/aboutContent";

const About = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleLayoutQuery("aboutContent");
  const layout = data?.layout[0]?.aboutContent;

  const aboutCards = [
    {
      heading: "Browse",
      content: "Find out more about our courses and their costs carefully. ",
      icon: BsBrowserChrome,
    },
    {
      heading: "Pay",
      content:
        "Pay the given sum to the bank account number listed in the FAQ.",
      icon: AiFillCreditCard,
    },
    {
      heading: "Register",
      content:
        "Take a picture of the receipt, fill out the form and upload the receipt. ",
      icon: FaCashRegister,
    },
  ];
  return (
    <div className="bg-slate-100">
      <div className=" min-h-[88vh] w-full ">
        <div className="h-[85vh] flex p-10 justify-end ">
          <div className="md:w-[80%] w-[100%] h-full  about-bg relative ">
            <div className="w-[400px] h-[400px] hidden md:flex bg-slate-500/60  text-white top-1/2 -left-[200px] absolute -translate-y-1/2 font-poppins p-4  flex-col justify-center items-center">
              <h3 className=" text-[30px] ">Make your registration simple</h3>
              <h5>
                Read the isntruction below to register for any course you desire
              </h5>
            </div>
          </div>
        </div>
        <div className="bg-slate-400/50 ">
          {" "}
          <div className=" max-w-[1000px] px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-14 gap-4  mx-auto py-8 font-poppins">
            {aboutCards.map((v, index) => {
              return (
                <div className="flex items-center text-gray-700 ">
                  <div className="flex  flex-col gap-1  justify-center text-center items-center w-full  p-4 border-gray-800 md:border-b-0 border-b border-b-gray-300">
                    <v.icon className="text-[28px] " />
                    <h2 className="font-bold text-[16px]">{v.heading}</h2>
                    <h4>{v.content}</h4>
                  </div>
                  {index != aboutCards.length - 1 ? (
                    <AiOutlineArrowRight className="text-[30px]  hidden md:block" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <FAQ />
        <AboutContent />
      </div>
    </div>
  );
};

export default About;
