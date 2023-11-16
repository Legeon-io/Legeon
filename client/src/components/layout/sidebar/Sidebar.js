import React, { useEffect, useRef, useState } from "react";

import "./Sidebar.css";
import { LuAlbum, LuLayoutDashboard } from "react-icons/lu";
import {
  AiOutlineBook,
  AiOutlineCalendar,
  AiOutlineCreditCard,
  AiOutlineMessage,
} from "react-icons/ai";
import { BsArrowUpRight } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import Zoom from "react-reveal/Zoom";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiHelpCircle } from "react-icons/bi";
import { MdOutlineFeedback } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

export const Sidebar = ({ clickMenu }) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const closeNestedLists = () => {
    setServicesOpen(false);
    setProfileOpen(false);
  };

  // Ref to the Sidebar container
  const sidebarRef = useRef(null);

  // Effect to add click event listener to the document
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeNestedLists();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleServices = () => {
    setProfileOpen(false);
    setServicesOpen(!servicesOpen);
  };

  const toggleProfile = () => {
    setServicesOpen(false);
    setProfileOpen(!profileOpen);
  };

  return (
    <>
      <div
        className="fixed sm:flex hidden top-0 left-0 z-10 h-screen bg-gray-100 select-none"
        ref={sidebarRef}
      >
        <div className="flex flex-col justify-between pt-20 gap-10 text-base p-5 w-64 cursor-pointer">
          <div className="flex flex-col gap-5">
            <Link to="/:username" className="flex justify-center">
              <button className=" flex gap-3 items-center  justify-center border-2 border-indigo-500 p-2 w-full rounded-2xl shadow-lg shadow-gray-300 text-lg">
                <BsArrowUpRight />
                My Service Hub
              </button>
            </Link>
            <ul className="flex flex-col">
              <ul className="flex flex-col">
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                >
                  <LuLayoutDashboard className=" " />
                  <div>Dashboard</div>
                </Link>
                {/* Chat */}
                <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
                  <AiOutlineMessage className=" " />
                  <div>Chat</div>
                </li>
                {/* Bookings */}
                <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
                  <LuAlbum className=" " />
                  <div>Bookings</div>
                </li>
              </ul>
              <ul className="flex flex-col">
                {/* Services */}
                <Link
                  to="/services"
                  className={`${
                    servicesOpen ? "bg-gray-400" : "hover:bg-gray-200"
                  } flex justify-between items-center p-2 rounded`}
                  onClick={toggleServices}
                >
                  <div className="flex items-center gap-2">
                    <AiOutlineBook className=" " />
                    <div className="bg-gradient-to-r ">Services</div>
                  </div>
                  <IoIosArrowUp
                    className={`${servicesOpen ? "rotate-180" : ""}`}
                  />
                </Link>
                {servicesOpen && (
                  <ul className="flex flex-col">
                    {/* 1:1 Call */}
                    <Zoom>
                      <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded ps-10">
                        <FiPhoneCall className=" " />
                        <div className="bg-gradient-to-r">1:1 Call</div>
                      </li>
                    </Zoom>
                    {/* Message */}
                    <Zoom>
                      <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded ps-10">
                        <AiOutlineBook className=" " />
                        <div className="bg-gradient-to-r ">Message</div>
                      </li>
                    </Zoom>
                  </ul>
                )}
                {/* Payments */}
                <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
                  <AiOutlineCreditCard className=" " />
                  <div>Payments</div>
                </li>
                {/* Availability */}
                <Link
                  to="/availability"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                >
                  <AiOutlineCalendar className=" " />
                  <div>Availability</div>
                </Link>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex justify-between items-center p-2 rounded hover:bg-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <CgProfile className=" " />
                    <div className="bg-gradient-to-r ">Profile</div>
                  </div>
                </Link>
              </ul>
            </ul>
          </div>
          <ul className="flex flex-col">
            {/* What's New */}
            <Link
              to="/support"
              className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
            >
              <BiHelpCircle className=" " />
              <div>Help !</div>
            </Link>
            {/* Invite & Earn */}
            <Link
              to="/feedback"
              className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
            >
              <MdOutlineFeedback className=" " />
              <div>Feedback</div>
            </Link>
          </ul>
        </div>
      </div>
      {/*  Sidenavbar for Mobile view */}
      <div className="sm:hidden">
        <div
          className={`${
            clickMenu ? "w-52" : "w-0"
          } fixed flex top-0 left-0 z-30 h-screen bg-gray-100 transition-all duration-100`}
        >
          {clickMenu && (
            <div className="flex flex-col justify-between pt-20 gap-10 text-sm p-5 w-64 cursor-pointer">
              <div className="flex flex-col gap-5">
                <Link to="/landing" className="flex justify-center">
                  <button className=" flex gap-3 items-center  justify-center border-2 border-indigo-500 p-2 w-full rounded-2xl shadow-lg shadow-gray-300 text-base">
                    <BsArrowUpRight />
                    My Service Hub
                  </button>
                </Link>
                <ul className="flex flex-col">
                  <ul className="flex flex-col">
                    {/* Dashboard */}
                    <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                      <LuLayoutDashboard className=" " />
                      <div>Dashboard</div>
                    </li>
                    {/* Chat */}
                    <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                      <AiOutlineMessage className=" " />
                      <div>Chat</div>
                    </li>
                    {/* Bookings */}
                    <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                      <LuAlbum className=" " />
                      <div>Bookings</div>
                    </li>
                  </ul>
                  <ul className="flex flex-col">
                    {/* Services */}
                    <Link
                      to="/services"
                      className={`${
                        servicesOpen ? "bg-gray-400" : "hover:bg-gray-200"
                      } flex justify-between items-center p-2 rounded`}
                      onClick={toggleServices}
                    >
                      <div className="flex items-center gap-2">
                        <AiOutlineBook className=" " />
                        <div className="bg-gradient-to-r ">Services</div>
                      </div>
                      <IoIosArrowUp
                        className={`${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </Link>
                    {servicesOpen && (
                      <ul className="flex flex-col">
                        {/* 1:1 Call */}
                        <Zoom>
                          <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded ps-10">
                            <AiOutlineCalendar className=" " />
                            <div className="bg-gradient-to-r">1:1 Call</div>
                          </li>
                        </Zoom>
                        {/* Message */}
                        <Zoom>
                          <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded ps-10">
                            <AiOutlineBook className=" " />
                            <div className="bg-gradient-to-r ">Message</div>
                          </li>
                        </Zoom>
                      </ul>
                    )}
                    {/* Payments */}
                    <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                      <AiOutlineCreditCard className=" " />
                      <div>Payments</div>
                    </li>
                    {/* Availability */}
                    <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                      <AiOutlineCalendar className=" " />
                      <div>Availability</div>
                    </li>
                    {/* Profile */}
                    <Link
                      to="/profile"
                      className={`${
                        profileOpen ? "bg-gray-400" : "hover:bg-gray-200"
                      } flex justify-between items-center p-2 rounded`}
                      onClick={toggleProfile}
                    >
                      <div className="flex items-center gap-2">
                        <AiOutlineBook className=" " />
                        <div className="bg-gradient-to-r ">Profile</div>
                      </div>
                    </Link>
                    <Zoom>
                      {profileOpen && (
                        <ul className="flex flex-col">
                          {/* Edit Profile */}
                          <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded ps-10">
                            <AiOutlineCalendar className=" " />
                            <div className="bg-gradient-to-r ">
                              Edit Profile
                            </div>
                          </li>
                          {/* Account */}
                          <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded ps-10">
                            <AiOutlineBook className=" " />
                            <div className="bg-gradient-to-r ">Account</div>
                          </li>
                        </ul>
                      )}
                    </Zoom>
                  </ul>
                </ul>
              </div>
              <ul className="flex flex-col">
                {/* What's New */}
                <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                  <LuAlbum className=" " />
                  <div>Help !</div>
                </li>
                {/* Invite & Earn */}
                <li className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                  <LuAlbum className=" " />
                  <div>Feedback</div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
