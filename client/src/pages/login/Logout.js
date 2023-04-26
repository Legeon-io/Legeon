import React from "react";
import "./LoginForm.css";

import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Logout({ handleLogout }) {
  return (
    <div>
      <Link to="/" className="logout-text">
        <button type="submit" onClick={handleLogout} className="logout">
          <IoLogOut className="logout-icon" />
          Logout
        </button>
      </Link>
    </div>
  );
}

export default Logout;
