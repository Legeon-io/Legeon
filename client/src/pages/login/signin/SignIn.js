import React, { useState } from "react";
import { X } from "lucide-react";

import "../LoginForm.css";
import axios from "axios";
import { useFormik } from "formik";
import logo from "../../../assets/logo.png";
import { signinSchema } from "../../../schema";
import { useDispatch } from "react-redux";

import { Link, Route, Routes } from "react-router-dom";

import SignUp from "../signup/SignUp";
import ForgetPassword from "../forgetpassword/ForgetPassword";
import OTPPassword from "../forgetpassword/OTPPasword";
import {
  openForgetPassword,
  openLogin,
  openRegister,
} from "../../../redux/landingpage/landingPageSlice";
import { userSignInAction } from "../../../redux/auth/authSlice";

const SignIn = ({ onClose }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signinSchema,
    onSubmit: (values) => {
      dispatch(userSignInAction(values));
    },
  });

  return (
    <>
      <div className="relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="signin_header_css ">
            <div className="signin_main_css">
              <button onClick={() => dispatch(openLogin())}>
                <X
                  className="absolute right-2 top-2 active:text-3xl"
                  size={30}
                />
              </button>
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

              <form action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-5">
                  <div className="relative">
                    <input
                      id="email"
                      type="text"
                      className="inputfield_css peer"
                      required="required"
                      autoComplete="off"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="email" className="labelfeild_css">
                      Email
                    </label>
                    {formik.errors.email && formik.touched.email && (
                      <span className="text-[12px] text-red-700">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className="inputfield_css peer"
                      required="required"
                      autoComplete="off"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="password" className="labelfeild_css">
                      Password
                    </label>
                    <div className="flex justify-between">
                      {formik.errors.password && formik.touched.password ? (
                        <span className="text-[12px] text-red-700">
                          {formik.errors.password}
                        </span>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        onClick={() => dispatch(openForgetPassword())}
                        className="text-[12px] text-violet-500"
                      >
                        Forget Password ?
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={formik.handleSignIn}
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl hover:opacity-80  duration-300"
                    >
                      Login
                    </button>
                  </div>
                  <button
                    className="w-fit m-auto"
                    onClick={() => {
                      window.open("http://localhost:8080/auth/google", "_self");
                    }}
                    type="button"
                  >
                    <a className="block bg-white shadow-md px-4 py-2 rounded hover:bg-gray-200 duration-300 w-fit m-auto">
                      <div className="flex justify-center gap-5 items-center">
                        <img src="icons/googleIcon.svg" width={30} />
                        <h6 className="text-black font-semibold">
                          Sign in with Google
                        </h6>
                      </div>
                    </a>
                  </button>
                  <div className="signin_dont_css">
                    <span className="">Don't have any account ?</span>
                    <button
                      onClick={() => dispatch(openRegister())}
                      className="text-violet-500 cursor-pointer "
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
