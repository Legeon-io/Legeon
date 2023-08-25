import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { login, signup } from "../../apis/users/users.api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/** CSS file */
import "./LoginForm.css";
/** SignIn & SignUp Pages */
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";

const Login = ({ handleLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(isSignUp);
  return (
    <>
      {!isSignUp ? (
        <SignIn setIsSignUp={setIsSignUp} />
      ) : (
        <SignUp setIsSignUp={setIsSignUp} />
      )}
    </>
  );
};

export default Login;
