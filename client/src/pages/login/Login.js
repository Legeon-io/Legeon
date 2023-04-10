import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import * as AiIcons from 'react-icons/ai';

import '../../components/layout/navbar/Navbar.css'

const Login = () => {
  const [showPopup, setShowPopup] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
  };

  const handleSignInClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  console.log(process.env.GOOGLE_CLIENT_ID);

  return (
    <>
      <button className="signIn" onClick={handleSignInClick}>
        Sign in
      </button>
      {showPopup && (
        <div className="popupWrapper">
          <div className="popupContent">
            <button className="closePopup" onClick={handleClosePopup}>
              <AiIcons.AiFillCloseCircle />
            </button>
            <GoogleLogin
              clientId="process.env.GOOGLE_CLIENT_ID"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              scope="https://www.googleapis.com/auth/gmail.readonly"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
