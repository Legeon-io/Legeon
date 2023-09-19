import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Profile.css";
import "../index.css";
import Sidebar from "../../components/layout/sider/Sidebar";
import InternalNav from "../../components/layout/profileInternalNav/internalNav";
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
  const handleEdit = (fieldName) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };
  const [isEditing, setIsEditing] = useState({
    email: false,
    mobile: false,
    password: false,
  });
  const validationSchema = Yup.object().shape({
    link: Yup.string().required("Link is required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    displayname: Yup.string().required(" Username is required"),
    intro: Yup.string().required("Legion intro is required"),
    bio: Yup.string(),
  });
  const handleSubmit = (values) => {
    console.log(initialValues);
  };

  return (
    <div className="grid grid-cols-7 h-screen">
      <Sidebar />
      <div className="col-span-6 grid grid-rows-6 ">
        <InternalNav />
        <div className="flex flex-col row-span-5 items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white text-black w-full md:w-6/12 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
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
                    className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 font-semibold hover:text-violet-600 duration-300 mt-2 md:mt-0"
                  >
                    Change profile
                  </a>
                </div>
                <div className="mb-4 flex flex-col">
                  <label
                    htmlFor="link"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Your Legeon Link
                  </label>
                  <div className="flex border border-black rounded focus-within:border-blue-600 focus-within: ">
                    <div className="bg-gray-200 px-4 flex items-center rounded-l">
                      <h1 className="text-gray-600">legeon.io/</h1>
                    </div>
                    <Field
                      name="link"
                      placeholder="Link"
                      className="w-full px-3 py-2 rounded focus:outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="link"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="mb-4 flex flex-col  md:flex-row md:gap-5">
                  <div className=" md:flex-1">
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
                  <div className=" md:flex-1">
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
                    Username
                  </label>
                  <Field
                    name="displayname"
                    placeholder="Username"
                    className="border border-black px-3 py-2 rounded w-full text-gray-600"
                  />
                  <ErrorMessage
                    name="displayname"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="intro"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Introduction
                  </label>
                  <Field
                    name="intro"
                    placeholder="Introduce yourself"
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
                  className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 hover:opacity-80 duration-300 text-white font-semibold py-2 px-4 rounded-md w-full"
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
