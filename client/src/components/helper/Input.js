import React from "react";
import "./helper.css";
import { ErrorMessage, Field } from "formik";
const Input = ({ id, type, disabled, name, label, as }) => {
  return (
    <div className="relative">
      <Field
        id={id}
        as={as}
        disabled={disabled}
        type={type}
        name={name}
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

export default Input;
