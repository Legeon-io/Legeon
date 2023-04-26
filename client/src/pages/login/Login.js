import React, { useState } from "react";
import "./LoginForm.css";
import logo from '../../assets/logo.png'
import { login, signup } from "../../apis/users/users.api";

const Login = ({ setLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
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
      const { response, data } = await signup( username, email, password, confirmPassword );
      if (response.status === 200) {
        // user signed up successfully
        setLogin();
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
      const  {response , data } = await login(email, password);

      if (response.status === 200) {
        // user signed in successfully
        setLogin();
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
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="inputWrapper">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
            )}
            {isSignUp ? (
              <>
                <button type="submit" className="button signUp">
                  Sign Up
                </button>
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
                <button type="submit" onClick={toggleSignUp} className="button signUp">
                  Sign Up
                </button>
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
