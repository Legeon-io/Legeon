import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";
import profileLogo from "../../../assets/logo.png";

function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropbtn rounded-full w-16">
        <img src={profileLogo} alt="profile" />
      </button>
      <div
        id="myDropdown"
        className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}
      >
        <a href="#home" onClick={closeDropdown}>
          Home
        </a>
        <a href="#about" onClick={closeDropdown}>
          About
        </a>
        <a href="#contact" onClick={closeDropdown}>
          Contact
        </a>
      </div>
    </div>
  );
}

export default DropdownMenu;
