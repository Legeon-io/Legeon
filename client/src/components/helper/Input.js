import React from "react";
import "./helper.css";
import { ErrorMessage, Field } from "formik";

const Input = (props) => {
  const { label, name, disabled, inputValue, type, ...others } = props;
  return (
    <div className="box2">
      <label
        htmlFor={name}
        className={`labelInput ${
          inputValue[name] && inputValue[name] !== "" && "labelAbove"
        }`}
      >
        {label}
      </label>
      <Field
        name={name}
        type={type}
        disabled={disabled}
        className="inputField"
        id="inputField"
        autoComplete="off"
        {...others}
      />
      <div className="text-red-700 text-[12px]">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Input;
