import React, { useState } from "react";
import { X } from "lucide-react";

import "../LoginForm.css";
import { useFormik } from "formik";
import logo from "../../../assets/logo.png";
import { signupSchema } from "../../../schema";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { openRegister } from "../../../redux/landingpage/landingPageSlice";
import { userSignUpAction } from "../../../redux/auth/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(userSignUpAction(values, navigate));
    },
  });

  return (
    <>
      <div className="relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="signin_header_css ">
            <div className="signup_main_css">
              <button onClick={() => dispatch(openRegister())}>
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
                      id="firstname"
                      type="text"
                      className="inputfield_css peer"
                      required="required"
                      autoComplete="off"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="firstname" className="labelfeild_css">
                      Firstname
                    </label>
                    {formik.errors.firstname && formik.touched.firstname && (
                      <span className="text-[12px] text-red-700">
                        {formik.errors.firstname}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="lastname"
                      type="text"
                      className="inputfield_css peer"
                      required="required"
                      autoComplete="off"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="lastname" className="labelfeild_css">
                      Lastname (optional)
                    </label>
                    {formik.errors.lastname && formik.touched.lastname && (
                      <span className="text-[12px] text-red-700">
                        {formik.errors.lastname}
                      </span>
                    )}
                  </div>
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
                    {formik.errors.password && formik.touched.password && (
                      <span className="text-[12px] text-red-700">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type="password"
                      className="inputfield_css peer"
                      required="required"
                      autoComplete="off"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="confirmPassword" className="labelfeild_css">
                      Confirm Password
                    </label>
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <span className="text-[12px] text-red-700">
                          {formik.errors.confirmPassword}
                        </span>
                      )}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={formik.handleSignUp}
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl hover:opacity-80  duration-300"
                    >
                      Register
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

export default SignUp;
