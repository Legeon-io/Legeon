import React from "react";
import {RxCross1} from "react-icons/rx"


import "../LoginForm.css";
import { Form, Formik } from "formik";
import { recoverSchema } from "../../../schema";
import { useDispatch } from "react-redux";
import { closeForgetPassword } from "../../../redux/landingpage/landingPageSlice";
import { userUpdatePassword } from "../../../redux/auth/authSlice";
import Input from "../../../components/helper/Input";

const RecoverPassword = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="relative z-50">
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
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={recoverSchema}
                onSubmit={(values) => {
                  // console.log(values);
                  dispatch(userUpdatePassword(values));
                }}
              >
                {() => (
                  <Form className="flex flex-col gap-5">
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      label="Password"
                    />
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2  text-white rounded hover:opacity-80  duration-300"
                    >
                      Confirm
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

export default RecoverPassword;
