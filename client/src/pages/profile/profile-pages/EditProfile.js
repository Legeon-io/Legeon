import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { BiSolidEdit } from "react-icons/bi";

import logo from "../../../assets/logo.png";
export const EditProfile = (props) => {
  const initialValues = {
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
    <div className="flex flex-col row-span-5 items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className=" text-black w-full md:w-6/12 p-6 rounded-lg shadow-md ml-10 md:ml-0 md:mt-10 bg-gray-50">
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
              <a href="./">
                <BiSolidEdit size={40} />
              </a>
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
              className="border border-black p-2 rounded-md  hover:bg-gray-200 w-1/2 md:translate-x-36  translate-x-20"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
