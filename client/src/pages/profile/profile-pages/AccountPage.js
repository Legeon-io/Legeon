import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import * as yup from "yup";
import InternalNav from "../../../components/layout/profileInternalNav/internalNav";
import "../../index.css";
import "./AccountPage.css";
import Sidebar from "../../../components/layout/sider/Sidebar.js";

export const AccountPage = (props) => {
  const initialValues = {
    email: "harisrevatcha@gmail.com",
    mobile: "123456789",
    password: "helloworld",
    notification: false,
  };
  const handleEdit = (fieldName) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  const [isEditing, setIsEditing] = useState({
    email: false,
    mobile: false,
    password: false,
  });
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    mobile: yup
      .string()
      .matches(/^[0-9]*$/, "Mobile number must contain only digits")
      .min(10, "Mobile number must be at least 10 digits")
      .required("Mobile number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    notification: yup.boolean().oneOf([true], "You must accept notifications"),
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
            <Form className="w-full   md:w-8/12 md:mx-auto mt-0 space-y-6 p-5 md:p-20">
              <h1 className="text-3xl md:text-5xl font-bold ">Account</h1>

              <div className="flex items-center space-x-2">
                <label className="md:w-1/3 md:text-2xl">Email</label>
                {isEditing.email ? (
                  <div className="md:w-2/3">
                    <Field
                      type="text"
                      name="email"
                      className="border border-blue-400 px-2 py-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                ) : (
                  <div className="w-2/3 md:text-xl">{initialValues.email}</div>
                )}
                <button
                  type="button"
                  onClick={() => handleEdit("email")}
                  className="ml-2 px-4 py-2 "
                >
                  {isEditing.email ? (
                    <AiOutlineSave size={20} />
                  ) : (
                    <AiOutlineEdit size={20} />
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <label className="md:w-1/3 md:text-2xl">Mobile</label>
                {isEditing.mobile ? (
                  <div className="w-2/3">
                    <Field
                      type="text"
                      name="mobile"
                      className="border border-gray-300 px-2 py-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                ) : (
                  <div className=" w-2/3 md:text-lg">
                    {initialValues.mobile}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleEdit("mobile")}
                  className="ml-2 px-4 py-2 "
                >
                  {isEditing.mobile ? (
                    <AiOutlineSave size={20} />
                  ) : (
                    <AiOutlineEdit size={20} />
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <label className=" md:w-1/3  md:text-2xl">Password</label>
                {isEditing.password ? (
                  <div className="w-2/3">
                    <Field
                      type="password"
                      name="password"
                      className="border border-gray-300 px-2 py-2 w-full rounded"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                ) : (
                  <div className="w-2/3 md:text-lg">
                    {initialValues.password
                      .split("")
                      .map((char) => "*")
                      .join("")}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleEdit("password")}
                  className="ml-2 px-4 py-2 "
                >
                  {isEditing.password ? (
                    <AiOutlineSave size={20} />
                  ) : (
                    <AiOutlineEdit size={20} />
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <label className="w-1/3 md:text-2xl">Notification</label>
                {isEditing.notification ? (
                  <div className="w-2/3 flex gap-4">
                    <Field
                      type="checkbox"
                      name="notification"
                      className="border border-gray-300 px-2 py-1 rounded"
                    />
                    <div> allow notifications in whatsapp and email</div>
                    <ErrorMessage
                      name="notification"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                ) : (
                  <div className="w-2/3 text-lg">
                    {initialValues.notification ? "Yes" : "No"}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleEdit("notification")}
                  className="ml-2 px-4 py-2 "
                >
                  {isEditing.notification ? (
                    <AiOutlineSave size={20} />
                  ) : (
                    <AiOutlineEdit size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="border border-black p-2 rounded-md  hover:bg-gray-200"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
