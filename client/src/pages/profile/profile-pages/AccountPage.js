import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import * as yup from "yup";
import { BiSolidEdit } from "react-icons/bi";
import "../../index.css";
import "./AccountPage.css";
import { IconContext } from "react-icons/lib";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
const inlineStyles = {
  color: "blue",
};

export const AccountPage = (props) => {
  const initialValues = {
    email: "",
    mobile: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(/^[0-9]*$/, "Mobile number must contain only digits")
      .min(10, "Mobile number must be at least 10 digits")
      .required("Mobile number is required"),
    password: yup.string().min(6, "Password must be at least 6 characters"),
    // .required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/profiles/updateaccount`,
        { values },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Account Update Successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div className="flex flex-col row-span-5 items-center translate-x-10 md:translate-x-0">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => <FormikForm setFieldValue={setFieldValue} />}
      </Formik>
    </div>
  );
};

const FormikForm = (props) => {
  const profile = useSelector((state) => state.profile.userData);

  const [isEditing, setIsEditing] = useState(false);
  const [accData, setaccData] = useState({});

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profiles/getaccount`, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setaccData(res.data);
        props.setFieldValue("mobile", res.data[0].data.mobile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Form className="w-full md:w-8/12 md:mx-auto mt-0 space-y-6 p-5 md:p-20 justify-center ">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl md:text-5xl font-bold">Account</h1>
        <button type="button" onClick={handleEdit} className="ml-2 px-4 py-2">
          {isEditing ? <AiOutlineSave size={40} /> : <BiSolidEdit size={40} />}
        </button>
      </div>

      <div className="flex items-center   space-x-2 ">
        <label className="md:w-1/3 md:text-2xl">Email</label>

        <div className="w-2/3 md:text-xl">{accData[0]?.email}</div>
      </div>

      <div className="flex items-center space-x-2">
        <label className="md:w-1/3 md:text-2xl">Mobile</label>
        {isEditing ? (
          <div className="md:w-2/3 w-full">
            <Field
              type="number"
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
          <div className="w-2/3 md:text-lg">{accData[0]?.data.mobile}</div>
        )}
      </div>

      {!profile.isGoogle && (
        <div className="flex items-center space-x-2">
          <label
            className={` md:w-1/3  md:text-2xl ${
              isEditing ? "text-xs font-bold" : "text-sm"
            }  md:font-thin`}
          >
            Password
          </label>
          {isEditing ? (
            <div className="md:w-2/3 w-full">
              <Field
                type="password"
                name="password"
                required
                className="border border-gray-300 px-2 py-2 w-full rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
          ) : (
            <div className="w-2/3 md:text-lg"></div>
          )}
        </div>
      )}

      {isEditing && (
        <button
          type="submit"
          className="border border-black p-2 rounded-md w-1/4 hover:bg-gray-200"
        >
          Submit
        </button>
      )}
    </Form>
  );
};

export default AccountPage;
