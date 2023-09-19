import React from "react";

// CSS
import "./Sidebar.css";
import { LuAlbum, LuLayoutDashboard } from "react-icons/lu";
import {
  AiOutlineBell,
  AiOutlineBook,
  AiOutlineCalendar,
  AiOutlineCreditCard,
  AiOutlineGift,
  AiOutlineMail,
  AiOutlineMessage,
} from "react-icons/ai";

export const Sidebar = ({ clickMenu }) => {
  return (
    <>
      <div className="fixed sm:flex hidden top-0 left-0 z-10 w-64 h-screen bg-gray-100 ">
        <div className="flex flex-col py-20 gap-10 text-xl p-5">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 ">
              <LuLayoutDashboard className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                DashBoard
              </div>
            </li>
            <li className="flex items-center gap-2">
              <AiOutlineMessage className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                Messages
              </div>
            </li>
            <li className="flex items-center gap-2">
              <LuAlbum className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                Bookings
              </div>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <AiOutlineCalendar className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                Availablity
              </div>
            </li>
            <li className="flex items-center gap-2">
              <AiOutlineBook className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                Services
              </div>
            </li>
            <li className="flex items-center gap-2">
              <AiOutlineCreditCard className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                Payments
              </div>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <AiOutlineBell className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                What's New
              </div>
            </li>
            <li className="flex items-center gap-2">
              <AiOutlineMail className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                Invite & Earn
              </div>
            </li>
            <li className="flex items-center gap-2">
              <AiOutlineGift className=" text-indigo-500" />
              <div className="bg-gradient-to-r  hidden sm:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                Rewards
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            clickMenu ? "w-52" : "w-0"
          } fixed flex top-0 left-0 z-30 h-screen bg-gray-100 transition-all duration-100`}
        >
          {clickMenu && (
            <div className="flex flex-col py-20 gap-10 p-5">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 ">
                  <LuLayoutDashboard className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    DashBoard
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineMessage className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    Direct Messages
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <LuAlbum className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    Bookings
                  </div>
                </li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <AiOutlineCalendar className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    Availablity
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineBook className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    Services
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineCreditCard className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    Payments
                  </div>
                </li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <AiOutlineBell className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    What's New
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineMail className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    Invite & Earn
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <AiOutlineGift className=" text-indigo-500" />
                  <div className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                    Rewards
                  </div>
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
