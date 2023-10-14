import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import logo from "../assets/logo.png";

const Header = () => {
  const [open, setOpen] = useState(true);

  return (
    <section className=" bg-[#427cce]">
      <div className="lg:max-w-[1280px] w-full mx-auto ">
        <nav className="flex items-center justify-between py-4 px-6">
          <img src={logo} alt="" className="w-[200px] object-contain " />
          <ul className="  gap-4 text-[18px] text-gray-500 md:flex hidden">
            <NavLink className={"underline_decor text-white"} to="/">
              Home
            </NavLink>
            <NavLink className={"underline_decor text-white"} to="/about">
              About
            </NavLink>
            <NavLink className={"underline_decor text-white"} to="/course">
              Courses
            </NavLink>
            <NavLink className={"underline_decor text-white"} to="/register">
              Register
            </NavLink>
            <NavLink className={"underline_decor text-white"} to="/news">
              News
            </NavLink>
          </ul>
          <NavLink
            className={
              "underline_decor text-white  md:block hidden text-[18px] "
            }
            to="/login"
          >
            Are you staff member?
          </NavLink>

          <div
            className="block md:hidden cursor-pointer"
            onClick={() => {
              setOpen((pre) => !pre);
            }}
          >
            <HiMenu size={"25px"} />
          </div>
          <div
            className={`md:hidden fixed  top-0 left-0 w-[300px]  h-[100vh] bg-[#427cce] z-20  ${
              open ? `-translate-x-[100%]` : `-translate-x-[0%]`
            } transition-all duration-500 ease-in-out`}
          >
            <div className=" ">
              <div className="flex justify-between items-center px-10 py-2">
                <img src={logo} alt="" className="w-[80px] p-0" />
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen((pre) => !pre);
                  }}
                >
                  <GrClose size={"25px"} fontWeight={"600"} />
                </span>
              </div>
              <ul className="flex flex-col justify-between  text-[18px] text-gray-500 mt-6">
                <NavLink
                  className={
                    "hover:pl-8 transition-all duration-300 text-white  font-poppins p-5 hover:bg-[#2970af26] "
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={
                    "hover:pl-8 transition-all duration-300 text-white  font-poppins p-5 hover:bg-[#2970af26]"
                  }
                  to="/about"
                >
                  About
                </NavLink>
                <NavLink
                  className={
                    "hover:pl-8 transition-all duration-300 text-white  font-poppins p-5 hover:bg-[#2970af26]"
                  }
                  to="/course"
                >
                  Courses
                </NavLink>
                <NavLink
                  className={
                    "hover:pl-8 transition-all duration-300 text-white font-poppins p-5 hover:bg-[#2970af26]"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
                <NavLink
                  className={
                    "hover:pl-8 transition-all duration-300 text-white font-poppins p-5 hover:bg-[#2970af26]"
                  }
                  to="/news"
                >
                  News
                </NavLink>
                <NavLink
                  className={
                    "hover:pl-8 transition-all duration-300 text-white  font-poppins p-5 hover:bg-[#2970af26]"
                  }
                  to="/login"
                >
                  Are you staff member?
                </NavLink>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
