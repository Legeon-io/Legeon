/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
//Components
import { Toggle } from "../../common/Toggle.js";
import { useDispatch, useSelector } from "react-redux";
import LOGO from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import Cookie from "js-cookie";
// import profileLogo from "../../../assets/logo.png";
import {
  openLogin,
  openRegister,
} from "../../../redux/landingpage/landingPageSlice.js";
import DropdownMenu from "./DropdownMenu.js";
import { getUserDetails } from "../../../redux/profile/profileSlice.js";

export const Navbar = ({ handleClickMenu }) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [currentUrl, setcurrentUrl] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const data = useSelector((state) => state.profile.userData);

  // for login profile visibility
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      dispatch(getUserDetails(token));

      if (window.location.pathname === "/") {
        setcurrentUrl(true);
      }

      setShow(false);
    }
  }, []);

  const handleLogout = () => {
    Cookie.remove("token");
    window.location.href = "/";
  };

  function handleChanges(e) {
    setChecked(e.target.checked);
  }

  function handleClick() {
    setChecked(!checked);
  }

  return (
    <>
      <div className="relative h-[4rem] z-40">
        <nav className="fixed top-0 h-[4rem] w-full flex justify-between items-center  shadow-md hover:shadow-lg duration-300 p-2 bg-white">
          <div className=" flex gap-2 justify-center items-center sm:p-5">
            <img src={LOGO} alt="" className="h-10" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 font-semibold text-2xl ">
              LEGEON
            </h1>
          </div>
          <div />
          <div className=" flex gap-5">
            <div className="mt-0.5 mr-1 flex justify-center items-center">
              <Toggle
                ischecked={checked}
                handleChange={handleChanges}
                onClick={handleClick}
              />
            </div>
            <button
              onClick={() => dispatch(openLogin())}
              className=" hidden md:block bg-gradient-to-r m-1 p-2 text-white rounded-3xl to-pink-500  from-indigo-500  via-purple-500 hover:opacity-80  duration-300 w-[6rem]"
            >
              Login
            </button>
            <div
              onClick={handleClickMenu}
              className="flex items-center text-indigo-500 sm:hidden"
            >
              <AiOutlineMenu />
            </div>
            <div
              className="relative sm:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img
                src=""
                alt=""
                className="h-10 w-10 border-2 border-indigo-500 rounded-full active:scale-90 transition-all duration-100"
              />
              {menuOpen && (
                <div className="absolute top-14 -left-32 w-[10rem] h-[9rem] bg-white border-2 border-indigo-500 rounded p-2">
                  <nav className="flex flex-col gap-2">
                    <Link>
                      <div className="bg-gradient-to-r  block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                        Profile
                      </div>
                    </Link>
                    <Link>
                      <div className="bg-gradient-to-r  block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                        Login
                      </div>
                    </Link>
                    <Link>
                      <div className="bg-gradient-to-r  block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                        Login
                      </div>
                    </Link>
                    <Link className="flex gap-2 text-indigo-500">
                      <div className="bg-gradient-to-r  block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text">
                        Logout
                      </div>
                      <AiOutlineLogout />
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
