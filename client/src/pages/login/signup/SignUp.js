import React, { useState } from "react";
import { X } from "lucide-react";

/** CSS styling */
import "../LoginForm.css";

/** Imgs */
import logo from "../../../assets/logo.png";


/** SignIn Component------------------------------------------------------------------------------ */
const SignUp = ({ setIsSignUp }) => {
  return (
    <>
      <div className=" relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="signin_header_css">
            <div className="signup_main_css">
              <X
                onClick={() => setIsSignUp(false)}
                className="absolute right-2 top-2 active:text-3xl"
                size={30}
              />
              <div className="flex flex-col justify-around items-center w-full">
                <img src={logo} alt="" className="h-20 w-20 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-center">
                    Welcome to Legeon
                  </span>
                  <span className="text-sm text-gray-500 text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint, aperiam.
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative">
                  <input
                    id="firstname"
                    type="text"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="firstname"
                    className="labelfeild_css  peer-focus:text-xs peer-focus:border-l-2 peer-focus:border-r-2 peer-focus:bg-white peer-focus:text-purple-800 peer-focus:border-purple-800 peer-focus:px-2 peer-focus:-top-2"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="lastname"
                    type="text"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="lastname"
                    className="labelfeild_css  peer-focus:text-xs peer-focus:border-l-2 peer-focus:border-r-2 peer-focus:bg-white peer-focus:text-purple-800 peer-focus:border-purple-800 peer-focus:px-2 peer-focus:-top-2"
                  >
                    Last Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="email"
                    className="labelfeild_css  peer-focus:text-xs peer-focus:border-l-2 peer-focus:border-r-2 peer-focus:bg-white peer-focus:text-purple-800 peer-focus:border-purple-800 peer-focus:px-2 peer-focus:-top-2"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="text"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="password"
                    className="labelfeild_css  peer-focus:text-xs peer-focus:border-l-2 peer-focus:border-r-2 peer-focus:bg-white peer-focus:text-purple-800 peer-focus:border-purple-800 peer-focus:px-2 peer-focus:-top-2"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="confirmpassword"
                    type="text"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="confirmpassword"
                    className="labelfeild_css  peer-focus:text-xs peer-focus:border-l-2 peer-focus:border-r-2 peer-focus:bg-white peer-focus:text-purple-800 peer-focus:border-purple-800 peer-focus:px-2 peer-focus:-top-2"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="flex justify-center">
                  <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
