import React from "react";
import {RxCross1} from "react-icons/rx"

import "../LoginForm.css";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { forgetSchema } from "../../../schema";
import { useDispatch } from "react-redux";
import { userValidEmail } from "../../../redux/auth/authSlice";

import { closeForgetPassword } from "../../../redux/landingpage/landingPageSlice";
import Input from "../../../components/helper/Input";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <>
      <div className="duration-300  relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="signin_header_css ">
            <div className="relative flex flex-col justify-around w-[30rem] h-[24rem] bg-white p-10 rounded-2xl transition-all duration-100;">
              <button onClick={() => dispatch(closeForgetPassword())}>
                <RxCross1
                  className="absolute right-2 top-2 active:text-3xl"
                  size={30}
                />
              </button>
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
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={forgetSchema}
                onSubmit={(values) => {
                  // console.log(values)
                  dispatch(userValidEmail(values, navigate));
                }}
              >
                {() => (
                  <Form className="flex flex-col gap-10">
                    <Input id="email" type="text" name="email" label="Email" />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2  text-white rounded hover:opacity-80  duration-300"
                    >
                      Recover Now
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
