import React from "react";
import "./helper.css";
import { ErrorMessage, Field } from "formik";
const ProfileInput = ({ id, type, value, name, label }) => {
  return (
    <div className="relative">
      <Field
        id={id}
        type={type}
        name={name}
        value={value}
        className="inputfield_css peer"
        required="required"
        autoComplete="off"
      />
      <label htmlFor={id} className="labelfeild_css">
        {label}
      </label>
      <div className="text-red-700 text-[12px]">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default ProfileInput;
