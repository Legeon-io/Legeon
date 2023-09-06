import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Profile.css";
import "../index.css";
import { AccountPage, ProfilePage } from "./profile-pages";
import { getUser, updateUser } from "../../apis/users/users.api";
import Popup from "../../components/common/Popup";
import { updateUserProfile } from "../../apis/users/userprofiles";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
export const Profile = (props) => {
  const initialValues = {
    link: "",
    firstname: "",
    lastname: "",
    displayname: "",
    intro: "",
    bio: "",
  };
  const validationSchema = Yup.object().shape({
    link: Yup.string().required("Link is required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    displayname: Yup.string().required("Display name is required"),
    intro: Yup.string().required("Legion intro is required"),
    bio: Yup.string(),
  });
  const handleSubmit = (values) => {
    console.log(initialValues);
  };

  return (
    <div className="grid grid-cols-7 h-screen">
      <div className="col-span-1 bg-gray-100 text-lg flex flex-col gap-10  ">
        <ul className="flex flex-col items-center space-y-4 p-4 gap-3 mt-5">
          <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
            <a
              className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
              href="/"
            >
              Dashboard
            </a>
          </li>
          <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
            <a
              className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
              href="/"
            >
              DirectMessage
            </a>
          </li>
          <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
            <a
              className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
              href="/"
            >
              Bookings
            </a>
          </li>
        </ul>
        <div className="  flex flex-col">
          <ul className="flex flex-col items-center space-y-4 p-4 gap-3">
            <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
              <a
                className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
                href="/"
              >
                Availability
              </a>
            </li>
            <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
              <a
                className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
                href="/"
              >
                Services
              </a>
            </li>
            <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
              <a
                className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
                href="/"
              >
                Payments
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-6 grid grid-rows-6 ">
        <div className=" flex flex-col  row-span-1 w-full gap-x-5  ">
          <h1 className="text-3xl mx-10">Profile</h1>
          <div className="flex justify-between mx-10 ">
            <div className="flex gap-10 mt-3">
              <button className="border border-black p-2 rounded-md">
                Profile
              </button>
              <button className="border border-black p-2 rounded-md">
                Settings
              </button>
              <button className="border border-black p-2 rounded-md">
                Account
              </button>
            </div>
            <button className="border border-black p-2 rounded-md">save</button>
          </div>
        </div>
        <div className="flex flex-col row-span-5 items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className=" text-black w-6/12 p-6 rounded-lg shadow-md">
                <div className="flex justify-between w-full items-center mb-4">
                  <div className="flex items-center">
                    <img
                      src={logo}
                      alt="user image"
                      className="h-20 w-20 rounded-full"
                    />
                    <div className="ml-4">
                      <h1 className="text-lg font-semibold">Profile photo</h1>
                      <p className="text-sm text-gray-600">Required</p>
                    </div>
                  </div>
                  <a
                    href="./"
                    className=" text-transparent bg-clip-text  bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 font-semibold hover:text-violet-600  duration-300"
                  >
                    Change profile
                  </a>
                </div>
                <div className="mb-4  flex flex-col">
                  <label
                    htmlFor="link"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Your Legion Link
                  </label>
                  <div className="flex  border border-black rounded  focus-within:border-blue-600  focus-within: ">
                    <div className="bg-gray-200  px-4 flex items-center  rounded-l">
                      <h1 className="text-gray-600">legeon.io</h1>
                    </div>
                    <Field
                      name="link"
                      placeholder="Link"
                      className=" w-full  px-3 py-2 rounded focus:outline-none  "
                    />
                  </div>
                  <ErrorMessage
                    name="link"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="mb-4 flex">
                  <div className="mr-2 flex-1">
                    <label
                      htmlFor="firstname"
                      className="text-sm font-semibold text-gray-600"
                    >
                      First Name
                    </label>
                    <Field
                      name="firstname"
                      placeholder="First Name"
                      className="border border-black px-3 py-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="ml-2 flex-1">
                    <label
                      htmlFor="lastname"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Last Name
                    </label>
                    <Field
                      name="lastname"
                      placeholder="Last Name"
                      className="border border-black px-3 py-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="displayname"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Display Name
                  </label>
                  <Field
                    name="displayname"
                    placeholder="Display Name"
                    className="border border-black px-3 py-2 rounded w-full text-gray-600"
                  />
                  <ErrorMessage
                    name="displayname"
                    component="div"
                    className="text-red-600 text-sm "
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="intro"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Legion Intro
                  </label>
                  <Field
                    name="intro"
                    placeholder="Legion Intro"
                    className="border border-black px-3 py-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="intro"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="bio"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Bio
                  </label>
                  <Field
                    as="textarea"
                    name="bio"
                    placeholder="Elaborate yourself"
                    className="border border-black px-3 py-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r to-pink-500  from-indigo-500  via-purple-500 hover:opacity-80  duration-300 text-white font-semibold py-2 px-4 rounded-full"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
