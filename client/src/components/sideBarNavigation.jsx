import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiLogOut } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { selectRole } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import { AiOutlineClose } from "react-icons/ai";
import { BiSolidRightArrow } from "react-icons/bi";
import { MdArrowUpward } from "react-icons/md";
import { HiArrowSmRight } from "react-icons/hi";
import { SiCoursera } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import { BsBook, BsPen } from "react-icons/bs";

import { useGetCatagoriesQuery } from "../features/catagory/catagoryApiSlice";

const SideBarNavigation = ({ open, onClick, setOpenSidebar }) => {
  console.log(open);
  const [sendLogout, { isError, error, isSuccess, isLoading }] =
    useSendLogoutMutation();
  const { data, isLoading: catagoryLoading } = useGetCatagoriesQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const catagories = data?.catagories;
  const [catOpen, setCatOpen] = useState([]);
  const [mainCatagoryOpen, setMainCatagoryOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const isAdmin = role === "Admin";
  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      navigate("/login");
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    if (catagories) {
      setCatOpen(new Array(catagories.length).fill(false));
    }
  }, [catagories]);
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-[250px] h-screen transition-transform  sm:translate-x-0 ${
        open ? `-translate-x-[0%]` : `-translate-x-[100%]`
      } `}
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900">
        <ul className="space-y-2 font-medium relative">
          <div className="px-[15px] mb-20 flex gap-20">
            <img className="w-[200px] object-cover" src={logo} alt="" />
            <div
              onClick={onClick}
              className="inline sm:hidden cursor-pointer absolute top-0 right-0  text-white font-bold text-lg rounded"
            >
              <AiOutlineClose />
            </div>
          </div>
          {isAdmin && (
            <li>
              <div
                onClick={() => {
                  setMainCatagoryOpen((pre) => !pre);
                  navigate("/dash/registrees");
                  setOpenSidebar(false);
                }}
                className={`flex  ${
                  pathname === "/dash/registrees" ? "bg-gray-500" : null
                } cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <span>
                  <BsPen className="text-[20px] text-white" />
                </span>
                <span className="ml-3">Registree</span>
                <span className="ml-auto bg-gray-500 rounded-full p-1">
                  <MdArrowUpward
                    className={`text-[18px]  text-white transition  ${
                      !mainCatagoryOpen ? `rotate-0` : `rotate-180`
                    }`}
                  />
                </span>
              </div>
              {mainCatagoryOpen &&
                catagories?.map((catagory, index) => (
                  <>
                    <div
                      className="text-[14px] text-white pl-8 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-800 rounded "
                      onClick={() =>
                        setCatOpen((pre) => {
                          const post = [...pre];
                          post[index] = !post[index];
                          return post;
                        })
                      }
                    >
                      <BiSolidRightArrow
                        className={`transition ${
                          catOpen[index] ? `rotate-90` : `rotate-270`
                        }`}
                      />
                      {catagory.catagoryName}
                    </div>
                    {catOpen[index] && (
                      <div className=" ">
                        {catagory.courses.map((course) => {
                          const isActve =
                            pathname ===
                            `/dash/registrees/catagory/${course._id}`;
                          return (
                            <div
                              className={`text-[11px] text-white pl-0  cursor-pointer py-1 rounded hover:bg-gray-800 flex items-center ${
                                isActve ? `bg-gray-600` : ``
                              }`}
                              onClick={() =>
                                navigate(
                                  `/dash/registrees/catagory/${course._id}`
                                )
                              }
                            >
                              <HiArrowSmRight />
                              {course.courseName}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ))}
            </li>
          )}
          <li>
            <div
              onClick={() => {
                navigate("/dash/courses");
                setMainCatagoryOpen(false);
                setOpenSidebar(false);
              }}
              className={`flex ${
                pathname === "/dash/courses" ? "bg-gray-500" : null
              } cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
            >
              <span>
                <BsBook className="text-[20px]" />
              </span>
              <span className="flex-1 ml-3 whitespace-nowrap">Courses</span>
            </div>
          </li>
          {isAdmin && (
            <li>
              <div
                onClick={() => {
                  navigate("/dash/users");
                  setMainCatagoryOpen(false);
                  setOpenSidebar(false);
                }}
                className={`flex ${
                  pathname === "/dash/users" ? "bg-gray-500" : null
                } cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <CiUser className="text-[20px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">User</span>
              </div>
            </li>
          )}
          {isAdmin && (
            <li>
              <div
                onClick={() => {
                  navigate("/dash/catagory");
                  setMainCatagoryOpen(false);
                  setOpenSidebar(false);
                }}
                className={`flex ${
                  pathname === "/dash/catagory" ? "bg-gray-500" : null
                } cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <SiCoursera className="text-[20px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Course provider
                </span>
              </div>
            </li>
          )}
          {isAdmin && (
            <li>
              <div
                onClick={() => {
                  navigate("/dash/news");
                  setMainCatagoryOpen(false);
                  setOpenSidebar(false);
                }}
                className={`flex ${
                  pathname === "/dash/news" ? "bg-gray-500" : null
                } cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <FaRegNewspaper className="text-[20px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">News</span>
              </div>
            </li>
          )}
          <li>
            <div
              onClick={handleLogout}
              className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FiLogOut className="text-[20px]" />
              <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBarNavigation;
