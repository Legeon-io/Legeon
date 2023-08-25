import React, { useState } from "react";
import { X } from "lucide-react";

/** CSS styling */
import "../LoginForm.css";

/** Imgs */
import logo from "../../../assets/logo.png";

/** SignIn Component------------------------------------------------------------------------------ */
const SignIn = ({ setIsSignUp }) => {
  /** Handle Functions */
  const [logindetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = () => {
    console.log(logindetails);
  };

  return (
    <>
      <div className=" relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="signin_header_css ">
            <div className="signin_main_css">
              <X className="absolute right-2 top-2 active:text-3xl" size={30} />
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
                    id="username"
                    type="text"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                    value={logindetails.username}
                    onChange={(e) =>
                      setLoginDetails({
                        ...logindetails,
                        username: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="username" className="labelfeild_css">
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                    value={logindetails.password}
                    onChange={(e) =>
                      setLoginDetails({
                        ...logindetails,
                        password: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="password" className="labelfeild_css">
                    Password
                  </label>
                  <span className="text-[12px] flex justify-end text-violet-500">
                    Forget Password ?
                  </span>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleSignIn}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl"
                  >
                    Login
                  </button>
                </div>
                <div className="signin_dont_css">
                  <span className="">Don't have any account ?</span>
                  <span
                    onClick={() => setIsSignUp(true)}
                    className="text-violet-500 cursor-pointer"
                  >
                    {" "}
                    Register Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
