import React, { useState } from "react";
import "./LoginForm.css";
import logo from '../../assets/logo.png'
import { login, signup } from "../../apis/users/users.api";

import { FaEye, FaEyeSlash } from "react-icons/fa";


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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const displayLogs = (message) => {
    console.log(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignUp) {
      const { response, data } = await signup(username, firstname, lastname, email, password, confirmPassword);
      if (response.status === 200) {
        // user signed up successfully
        handleLogin(data.user.username);
        displayLogs(data.message);

      } else if (response.status === 401 || response.status === 409) {
        // sign up failed, display error message
        displayLogs(data.errorMessage);
        setErrorMessage(data.errorMessage);
      }
      else {
        displayLogs(data.error);
        setErrorMessage(data.error);
      }
    } else {
      const { response, data } = await login(email, password);

      if (response.status === 200) {
        // user signed in successfully
        handleLogin(data.user.username);
      } else if (response.status === 401 || response.status === 402) {
        // sign in failed, display error message
        displayLogs(data.error);
        setErrorMessage(data.error);
      }
    }
  };

  // const handleResetPassword = () => {
  //   setIsSignUp(true);
  //   setPassword("");
  //   setConfirmPassword("");
  // };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
  };

  return (
    <>
      <div className="popupWrapper">
        <div className="popupContent">
          {isSignUp && <> <h5 className="headline">Just takes 20 seconds to join Legeon. Engage with us!</h5> <br /> </>}
          <span><img src={logo} alt='Logo' className='loginLogo' /></span>
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          {errorMessage && ( // Show alert message if error message is not empty
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="inputWrapper">
              {isSignUp && (<input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleUserNameChange}
                required
              />
              )}

              {
                isSignUp && <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={firstname}
                  onChange={handleFirstNameChange}
                  required
                />
              }

              {
                isSignUp && <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={lastname}
                  onChange={handleLastNameChange}
                />
              }
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="inputWrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {!isSignUp &&
              <div className="inputWrapper">
                <span
                  className={errorMessage !== "" ? "passwordVisibilityIcon-moveDown" : `passwordVisibilityIcon ${passwordVisible ? "visible" : "hidden"}`}
                  onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            }

            {isSignUp &&
              <div className="inputWrapper">
                <span
                  className={errorMessage !== "" ? "signupPasswordVisibilityIcon-moveDown" : `signupPasswordVisibilityIcon ${passwordVisible ? "visible" : "hidden"}`}
                  onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            }


            {isSignUp && (
              <div className="inputWrapper">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
            )}

            {isSignUp && (
              <div className="inputWrapper">
                <span
                  className={errorMessage !== "" ? "confirmPasswordVisibilityIcon-moveDown" : `confirmPasswordVisibilityIcon ${confirmPasswordVisible ? "visible" : "hidden"}`}
                  onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            )}


            {isSignUp ? (
              <>
                <div className="signup-container">
                  <button type="submit" className="button signUp">
                    Sign Up
                  </button>
                </div>
                <div className="alreadyHaveAccountWrapper">
                  <span>Already have an account?</span>
                  <button type="submit" onClick={toggleSignUp} className="button signIn">
                    Sign In
                  </button>
                </div>
              </>

            ) : (
              <>
                <button type="submit" className="button signIn">
                  Sign In
                </button>
                <div className="signup-container">
                  <button type="submit" onClick={toggleSignUp} className="button signUp">
                    Sign Up
                  </button>
                </div>
              </>
            )}
            {/* {!isSignUp && (
            <div className="forgotPasswordWrapper">
              <button
                type="button"
                onClick={handleResetPassword}
                className="forgotPasswordButton"
              >
                Forgot password?
              </button>
            </div>
          )} */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
