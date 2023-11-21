import React from "react";

import "../LoginForm.css";
import { Form, Formik } from "formik";
import logo from "../../../assets/logo.png";
import { signinSchema } from "../../../schema";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
import {
  openForgetPassword,
  openLogin,
  openRegister,
} from "../../../redux/landingpage/landingPageSlice";
import { getGoogleUserDetails } from "../../../redux/profile/profileSlice";
import Input from "../../../components/helper/Input";
import { userSignInAction } from "../../../redux/auth/authAction";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.authStore.loading);

  return (
    <>
      <div className="relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity">
          <div className="signin_header_css ">
            {loading ? (
              <div className="relative flex flex-col justify-around w-[30rem] h-[40rem] bg-white p-10 rounded-2xl transition-all duration-100">
                <div
                  role="status"
                  className="flex w-full h-full justify-center items-center"
                >
                  <svg
                    aria-hidden="true"
                    className="inline w-20 h-20 mr-2 text-white animate-spin  fill-violet-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="text-xl">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col justify-around w-[30rem] h-[40rem] bg-white p-10 rounded-2xl transition-all duration-100">
                <button onClick={() => dispatch(openLogin())}>
                  <RxCross1
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
                  {({ values }) => (
                    <Form className="flex flex-col gap-5">
                      <Input
                        inputValue={values}
                        id="email"
                        type="text"
                        name="email"
                        label="Email"
                      />
                      <Input
                        inputValue={values}
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
                            `${process.env.REACT_APP_API_URL}/auth/google`,
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
