import React, { useState } from "react";
import { X } from "lucide-react";

import "../LoginForm.css";
import axios from "axios";
import { useFormik } from "formik";
import logo from "../../../assets/logo.png";
import { signinSchema } from "../../../schema";
import { useDispatch } from "react-redux";
import { userSignInAction } from "../../../redux/actions/UserAction";
import { Link } from "react-router-dom";

const SignIn = ({ setToggleToRegister }) => {
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
                      <Link
                        to="/forgetPassword"
                        className="text-[12px] text-violet-500"
                      >
                        Forget Password ?
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      onClick={formik.handleSignIn}
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl"
                    >
                      Login
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      // axios
                      //   .get("http://localhost:8080/auth/google")
                      //   .then((res) => {
                      //     console.log(res.data);
                      //   })
                      //   .catch((err) => {
                      //     console.log(err);
                      //   });
                      window.location.href =
                        "http://localhost:8080/auth/google";
                    }}
                    type="button"
                  >
                    <a className="bg-gray-300 p-2 rounded hover:bg-gray-400 duration-300">
                      <b className="text-2xl mr-4">G</b>{" "}
                      <span className="text-white">Sign in with Google</span>
                    </a>
                  </button>
                  <div className="signin_dont_css">
                    <span className="">Don't have any account ?</span>
                    <Link
                      to="/signup"
                      className="text-violet-500 cursor-pointer"
                    >
                      Register Now
                    </Link>
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
