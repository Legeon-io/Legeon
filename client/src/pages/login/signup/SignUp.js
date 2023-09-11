import React from "react";
import { X } from "lucide-react";

import "../LoginForm.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import logo from "../../../assets/logo.png";
import { signupSchema } from "../../../schema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openRegister } from "../../../redux/landingpage/landingPageSlice";
import { userSignUpAction } from "../../../redux/auth/authSlice";
import Input from "../../../components/helper/Input";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={signupSchema}
                onSubmit={(values) => {
                  // console.log(values);
                  dispatch(userSignUpAction(values, navigate));
                }}
              >
                {() => (
                  <Form className="flex flex-col gap-5">
                    <Input
                      id="firstname"
                      type="text"
                      name="firstname"
                      label="First Name"
                    />
                    <div className="relative">
                      <Field
                        id="lastname"
                        type="text"
                        name="lastname"
                        className="inputfield_css peer"
                        required="required"
                        autoComplete="off"
                      />
                      <label htmlFor="lastname" className="labelfeild_css">
                        Last Name (optional)
                      </label>
                      <div className="text-red-700 text-[12px]">
                        <ErrorMessage name="lastname" />
                      </div>
                    </div>
                    <Input id="email" type="text" name="email" label="Email" />
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

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 w-[10rem] text-white rounded-3xl hover:opacity-80  duration-300"
                      >
                        Register
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

export default SignUp;
