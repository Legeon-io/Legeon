import React from "react";
import { X } from "lucide-react";

import "../LoginForm.css";
import { Form, Formik } from "formik";
import logo from "../../../assets/logo.png";
import { signinSchema } from "../../../schema";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  openForgetPassword,
  openLogin,
  openRegister,
} from "../../../redux/landingpage/landingPageSlice";
import { userSignInAction } from "../../../redux/auth/authSlice";
import { getGoogleUserDetails } from "../../../redux/profile/profileSlice";
import Input from "../../../components/helper/Input";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={signinSchema}
                onSubmit={(values) => {
                  dispatch(userSignInAction(values, navigate));
                }}
              >
                {() => (
                  <Form className="flex flex-col gap-5">
                    <Input id="email" type="text" name="email" label="Email" />
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => dispatch(openForgetPassword())}
                      className="text-[12px] text-violet-500 flex justify-end"
                    >
                      Forget Password ?
                    </button>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl hover:opacity-80  duration-300"
                      >
                        Login
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        window.open(
                          "http://localhost:8080/auth/google",
                          "_self"
                        );
                      }}
                      type="button"
                      className="block bg-white shadow-md px-4 py-2 rounded hover:bg-gray-200 duration-300 w-fit m-auto"
                    >
                      <div className="flex justify-center gap-5 items-center">
                        <img
                          alt="Not Found"
                          src="icons/googleIcon.svg"
                          width={30}
                        />
                        <h6 className="text-black font-semibold">
                          Sign in with Google
                        </h6>
                      </div>
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

export default SignIn;
