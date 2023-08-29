import React, { useState } from "react";
import { Check, X } from "lucide-react";

import logo from "../../../assets/logo.png";
import "../LoginForm.css";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    if (email != "") {
      navigate("/recover")
    }
  };

  return (
    <>
      <div className="relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="signin_header_css ">
            <div className="relative flex flex-col justify-around w-[30rem] h-[24rem] bg-white p-10 rounded-2xl transition-all duration-100;">
              <div className="flex flex-col justify-around items-center w-full">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-center">
                    Forget Password
                  </span>
                  <span className="text-sm text-gray-500 text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint, aperiam.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 relative">
                  <input
                    id="email"
                    type="text"
                    className="inputfield_css peer"
                    required="required"
                    autoComplete="off"
                  />
                  <label htmlFor="email" className="labelfeild_css">
                    Email
                  </label>
                </div>
                <button
                  onClick={handleSendEmail}
                  className="bg-green-600 w-full h-full p-2 rounded px-4 text-white"
                >
                  Recover Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
