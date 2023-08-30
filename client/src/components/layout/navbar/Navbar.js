/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
//Components
import { Toggle } from "../../common/Toggle.js";
export const Navbar = (props) => {
  const showSidebar = () => props.setSidebar(!props.sidebarVisible);

  const [checked, setChecked] = useState(false);

  function handleChanges(e) {
    setChecked(e.target.checked);
  }

  function handleClick() {
    setChecked(!checked);
  }

  return (
    <>
      <nav className="flex justify-between items-center  p-2">
        <div className=" flex m-3 ">
          <h1 className="text-transparent bg-clip-text  bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 font-semibold text-lg ">
            LEGEON
          </h1>
        </div>
        <div className=" flex gap-5">
          <div className="mt-0.5 mr-1">
            <Toggle
              ischecked={checked}
              handleChange={handleChanges}
              onClick={handleClick}
            />
          </div>
          <button className=" bg-gradient-to-r m-1 p-2 text-white rounded-md to-pink-500 from-indigo-500  via-purple-500 hover:opacity-80  duration-300">
            Login
          </button>
          <button className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 m-1 p-2 text-white rounded-md hover:opacity-80  duration-300">
            Register
          </button>
        </div>
      </nav>
      <nav className="     ">
        <div className="flex justify-end gap-5 mr-5 p-5">
          <a
            className="bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300"
            href="#"
          >
            Services
          </a>
          <a
            className="bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300"
            href=""
          >
            Calender
          </a>
          <a
            className="bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold  hover:text-violet-600  duration-300"
            href="http://localhost:3000/dashboard"
          >
            Payments
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
