import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineEdit } from "react-icons/ai";
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
      <div className="col-span-6 grid grid-rows-6">
        <InternalNav />
        <div className="flex flex-col md:flex-row md:justify-center row-span-5 gap-y-5 mt-10 md:mt-0 md:gap-x-10 items-center">
          <div className="flex flex-col items-center md:p-10 ">
            <img
              src={logo}
              alt="user image"
              className="h-20 w-20 md:h-44 md:w-44 rounded-full"
            />
            <div className="ml-4  text-center md:ml-0">
              <h2 className="text-lg md:text-2xl font-semibold">Jhon Doe</h2>
              <p className="text-sm text-gray-600 md:text-lg">
                Software Engineer
              </p>
            </div>
          </div>
          <div className="bg-white text-black w-full md:w-6/12 p-6 lg:text-lg rounded-lg shadow-md">
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
                First Name
              </h2>
              <p className="md:w-3/4 px-3 py-2 text-gray-600">John</p>
            </div>
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
                Last Name
              </h2>
              <p className="md:w-3/4 px-3 py-2 text-gray-600">Doe</p>
            </div>
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
                Username
              </h2>
              <p className="md:w-3/4 px-3 py-2 text-gray-600">johndoe123</p>
            </div>
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
                Introduction
              </h2>
              <p className="md:w-3/4 px-3 py-2 text-gray-600">
                I'm a software developer passionate about coding.
              </p>
            </div>
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
                Bio
              </h2>
              <p className="md:w-3/4 px-3 py-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
