import React from "react";
import { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout({ onLogoutSuccess }) {
  return (
    <GoogleLogout
      clientId= { GOOGLE_CLIENT_ID }
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
    />
  );
}

export default Logout;
