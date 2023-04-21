import React, { useState } from "react";

import * as AiIcons from 'react-icons/ai';

import { LoginForm } from '../index.js';
import '../../components/layout/navbar/Navbar.css';

const Login = ({ handleLogin }) => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      <div>
        {showPopup ?
          <LoginForm /> : null
        }
      </div>
    </>
  );
};

export default Login;
