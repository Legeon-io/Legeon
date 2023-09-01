/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
//Components
import { Toggle } from "../../common/Toggle.js";
export const Navbar = (props) => {
  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className=" flex gap-5">
          <a
            className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300 mt-2 text-lg"
            href="#"
          >
            Services
          </a>
          <a
            className="bg-gradient-to-r hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300  mt-2 text-lg"
            href=""
          >
            Calender
          </a>
          <a
            className="bg-gradient-to-r hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold  hover:text-violet-600  duration-300  mt-2 text-lg"
            href="http://localhost:3000/dashboard"
          >
            Payments
          </a>
          <div className="mt-0.5 mr-1">
            <Toggle
              ischecked={checked}
              handleChange={handleChanges}
              onClick={handleClick}
            />
          </div>
          <button className=" hidden md:block bg-gradient-to-r m-1 p-2 text-white rounded-md to-pink-500  from-indigo-500  via-purple-500 hover:opacity-80  duration-300">
            Login
          </button>
          <button className="  hidden md:block bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 m-1 p-2 text-white rounded-md hover:opacity-80  duration-300">
            Register
          </button>
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
        <a
          className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold "
          href="http://localhost:3000/dashboard"
        >
          Register
        </a>
      </nav>
    </>
  );
};

export default Navbar;
