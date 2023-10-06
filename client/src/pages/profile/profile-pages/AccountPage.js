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

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/profiles/updateaccount`,
        { values },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      );
      if (response) toast.success("Account Update Successful");
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
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
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/profiles/getaccount`,
          {
            headers: {
              Authorization: `Bearer ${Cookie.get("token")}`,
            },
          }
        );
        if (response) {
          setaccData(response.data);
          props.setFieldValue("mobile", response.data[0].data.mobile);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="bg-gray-50 text-black rounded-lg drop-shadow-xl">
      <Form className="flex flex-col gap-10 p-10">
        <div className="flex items-center text-4xl">
          <h1>Account</h1>
          <button type="button" onClick={handleEdit} className="ml-2 px-4 py-2">
            {isEditing ? <AiOutlineSave /> : <BiSolidEdit />}
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex md:flex-row flex-col justify-between">
            <label>Email:</label>
            <div className="xs:text-base text-sm">{accData[0]?.email}</div>
          </div>

          <div className="flex md:flex-row flex-col justify-between">
            <label>Mobile:</label>
            {isEditing ? (
              <div className="md:w-[60%] w-full">
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
              <div>{accData[0]?.data.mobile || "Not Added"}</div>
            )}
          </div>

          {!profile.isGoogle && (
            <div className="flex md:flex-row flex-col justify-between">
              <label>Password:</label>
              {isEditing ? (
                <div className="md:w-[60%] w-full">
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
                <div>{accData[0]?.data.password || "******"}</div>
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
        </div>
      </Form>
    </div>
  );
};

export default AccountPage;
