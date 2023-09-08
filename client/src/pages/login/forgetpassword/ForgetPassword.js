import React, { useState } from "react";
import { Check, X } from "lucide-react";

import logo from "../../../assets/logo.png";
import "../LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { forgetSchema } from "../../../schema";
import { useDispatch } from "react-redux";
import { userValidEmail } from "../../../redux/actions/UserAction";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetSchema,
    onSubmit: (values) => {
      dispatch(userValidEmail(values, navigate));
    },
  });

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
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2 relative">
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
                      *{formik.errors.email}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={formik.handleForgetPassword}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2  text-white rounded"
                >
                  Recover Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
