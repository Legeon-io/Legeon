import React from "react";
import "./LoginForm.css";

import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Logout({ handleLogout }) {
  return (
    <div>
      <button type="submit" onClick={handleLogout} className="logout">
          <IoLogOut className="logout-icon" />
          <Link to="/" className="logout-text">Logout</Link>
      </button>
    </div>
  );
}

export default Logout;
