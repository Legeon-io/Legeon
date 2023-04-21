import React, { useState } from "react";
import "./LoginForm.css";
import logo from '../../assets/logo.png'

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      // perform sign up logic here
    } else {
      // perform sign in logic here
    }
  };

  const handleResetPassword = () => {
    setIsSignUp(true);
    setPassword("");
    setConfirmPassword("");
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
    <div className="popupWrapper">
      <div className="popupContent">
    <span><img src={logo} alt='Logo' className='loginLogo' /></span>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputWrapper">
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

export default LoginForm;
