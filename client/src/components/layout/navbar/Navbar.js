/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
//Components
import { Toggle } from "../../common/Toggle.js";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import profileLogo from "../../../assets/logo.png";
import { openLogin } from "../../../redux/landingpage/landingPageSlice.js";
import { LogOut } from "lucide-react";

export const Navbar = (props) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const data = useSelector((state) => state.profile.userData);

  // for login profile visibility
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      setShow(false);
    }
  }, []);

  const handleLogout = () => {
    Cookie.remove("token");
    // navigate("/");
    window.location.href = "/";
  };

  function handleChanges(e) {
    setChecked(e.target.checked);
  }

  function openMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleClick() {
    setChecked(!checked);
  }

  return (
    <>
      <nav className="flex justify-between items-center   shadow-md hover:shadow-lg duration-300  p-2 ">
        <div className=" flex m-3 ">
          <h1 className="text-transparent bg-clip-text  bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 font-semibold text-lg ">
            LEGEON
          </h1>
        </div>
        <div className="flex gap-5">
          {show && (
            <div className="flex gap-5">
              <a
                className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300 mt-2 text-lg"
                href="#"
              >
                Services
              </a>
              <a
                className="bg-gradient-to-r hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300  mt-2 text-lg"
                href="#"
              >
                Calender
              </a>
              <a
                className="bg-gradient-to-r hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold  hover:text-violet-600  duration-300  mt-2 text-lg"
                href="#"
              >
                Payments
              </a>
            </div>
          )}
          <div className="mt-0.5 mr-1 flex justify-center items-center">
            <Toggle
              ischecked={checked}
              handleChange={handleChanges}
              onClick={handleClick}
            />
          </div>
          {show && (
            <button
              onClick={() => dispatch(openLogin())}
              className=" hidden md:block bg-gradient-to-r m-1 p-2 text-white rounded-md to-pink-500  from-indigo-500  via-purple-500 hover:opacity-80  duration-300 w-[6rem]"
            >
              Login
            </button>
          )}

          {!show && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
                className="rounded-full w-16 duration-300 hover:shadow-sm hover:shadow-black "
              >
                <img src={profileLogo} alt="profile" />
              </button>
              {showProfile && (
                <div className="absolute right-0 z-10" id="dropmenu">
                  <div className="bg-gray-200 rounded-bl-2xl">
                    <div className="p-5">
                      <div className="text-xl font-semibold whitespace-nowrap">
                        Hi, {`${data.firstname} ${data.lastname}`}
                      </div>
                      <div className="text-xs">{data.email}</div>
                    </div>
                    <hr className="border-[0.1rem] border-white" />
                    <button
                      onClick={handleLogout}
                      className="flex justify-center gap-2 w-full py-2 text-white bg-red-600 hover:bg-red-800 duration-300 rounded-bl-2xl"
                    >
                      <LogOut />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            className="  md:hidden block  bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 m-1 p-2 text-white rounded-md hover:opacity-80  duration-300"
            onClick={openMenu}
          >
            menu
          </button>
        </div>
      </nav>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden flex flex-col md:flex-row justify-end gap-5 mr-5 p-5`}
      >
        <a
          className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold "
          href="#"
        >
          Services
        </a>
        <a
          className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold "
          href="#"
        >
          Calendar
        </a>
        <a
          className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold "
          href="http://localhost:3000/dashboard"
        >
          Payments
        </a>
        <a
          className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold "
          href="http://localhost:3000/dashboard"
        >
          Login
        </a>
        {/* <a
          className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold "
          href="http://localhost:3000/dashboard"
        >
          Register
        </a> */}
      </nav>
    </>
  );
};

export default Navbar;
