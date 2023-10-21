import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import Cookie from "js-cookie";
import LOGO from "../../../assets/logo.png";
import { openLogin } from "../../../redux/landingpage/landingPageSlice.js";
import { getUserDetails } from "../../../redux/profile/profileAction";

export const Navbar = ({ handleClickMenu }) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useSelector((state) => state.profile.userData);

  const [show, setShow] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      dispatch(getUserDetails(token));
      if (window.location.pathname === "/") {
        setShowDashboard(true);
        setShow(true);
      } else setShow(false);
    }
  }, []);

  const handleLogout = () => {
    Cookie.remove("token");
    window.location.href = "/";
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={sidebarRef} className="relative h-[4rem] z-40">
        <nav className="fixed top-0 h-[4rem] w-full flex justify-between items-center shadow-md hover:shadow-lg duration-300 p-2 bg-white">
          <div className="flex gap-2 justify-center items-center sm:p-5">
            <img src={LOGO} alt="" className="h-10" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 font-semibold text-2xl">
              LEGEON
            </h1>
          </div>
          <div />
          <div className="flex gap-5">
            {!showDashboard && show && (
              <button
                onClick={() => {
                  const token = Cookie.get("token");
                  if (token) window.location.href = "/dashboard";
                  else dispatch(openLogin());
                }}
                className="block bg-gradient-to-r m-1 p-2 text-white rounded-3xl to-pink-500  from-indigo-500  via-purple-500 hover:opacity-80  duration-300 w-[6rem]"
              >
                Login
              </button>
            )}
            {showDashboard && (
              <button
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
                className="block bg-gradient-to-r m-1 p-2 text-white rounded-3xl to-pink-500  from-indigo-500  via-purple-500 hover:opacity-80  duration-300 px-6"
              >
                Go to Dashboard
              </button>
            )}
            {!show && (
              <div
                onClick={handleClickMenu}
                className="flex items-center text-indigo-500 sm:hidden"
              >
                <AiOutlineMenu />
              </div>
            )}
            {!show && (
              <div
                className="relative hover:cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img
                  src=""
                  alt=""
                  className="h-10 w-10 border-2 border-indigo-500 rounded-full active:scale-90 transition-all duration-100"
                />

                <div
                  className={` ${
                    menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  } absolute  duration-300 top-14 -left-32 w-[10rem] h-[9rem] bg-white border-2 border-indigo-500 rounded p-2`}
                >
                  <nav className="flex flex-col gap-2">
                    <Link>
                      <div className="">Profile</div>
                    </Link>
                    <Link>
                      <div className="">Login</div>
                    </Link>
                    <Link>
                      <div className="">Login</div>
                    </Link>
                    <Link className="flex items-center gap-2 ">
                      <div onClick={handleLogout} className="">
                        Logout
                      </div>
                      <AiOutlineLogout />
                    </Link>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
