import React, { useState } from "react";
import ProfileDetails from "./profile-pages/ProfileDetails";
import EditProfile from "./profile-pages/EditProfile";
import "./Profile.css";
import "../index.css";
import Sidebar from "../../components/layout/sider/Sidebar";

import logo from "../../assets/logo.png";
import AccountPage from "./profile-pages/AccountPage";

import { Link } from "react-router-dom";
export const Profile = (props) => {
  const [pageState, setPageState] = useState(0);
  function buttonSubmit(number) {
    setPageState(number);
  }

  return (
    <div className="grid grid-cols-7 h-screen">
      <Sidebar />
      <div className="col-span-6 grid grid-rows-6">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl mt-5 mx-5 md:ml-10">Profile</h1>
          <div className="flex flex-row items-center gap-x-4 md:justify-between mx-5 md:mx-10 mt-3">
            <div className="flex flex-row gap-4 md:gap-10 mt-3">
              <button
                className={`border-2 border-black md:px-10 p-2 text-center rounded-3xl ${
                  pageState === 0
                    ? "bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white border-none"
                    : ""
                } `}
                onClick={() => {
                  buttonSubmit(0);
                }}
              >
                Profile
              </button>
              <button
                className={`border-2 border-black md:px-10 p-2 text-center rounded-3xl ${
                  pageState === 1
                    ? "bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white border-none"
                    : ""
                } `}
                to="/profile/editProfile"
                onClick={() => {
                  buttonSubmit(1);
                }}
              >
                Edit
              </button>
              <button
                className={`border-2 border-black md:px-10 p-2 text-center rounded-3xl ${
                  pageState === 2
                    ? "bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white border-none"
                    : ""
                } `}
                onClick={() => {
                  buttonSubmit(2);
                }}
              >
                Account
              </button>
            </div>
          </div>
        </div>
        {pageState === 0 ? (
          <ProfileDetails />
        ) : pageState === 1 ? (
          <EditProfile />
        ) : (
          <AccountPage />
        )}
      </div>
    </div>
  );
};

export default Profile;
