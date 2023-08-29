import React from "react";
import "./Dashboard.css";
import "../index.css";
import image1 from "../../assets/job_interview_illustration_1.png";
import logo from "../../assets/logo1.png";
const Dashboard = ({ sidebarVisible }) => {
  return (
    <div className="flex m-16 ">
      <img
        alt="workers working together "
        src={image1}
        className="h-1/2   "
      ></img>
      <div className=" w-full flex justify-center items-center  flex-col gap-5">
        <div className=" flex">
          <h1 className=" text-9xl  bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold  ">
            LEGE
          </h1>
          <img
            src={logo}
            className="rounded-full w-full h-32  shadow-2xl   "
            alt="logo of legeon"
          />
          <h1 className="text-9xl bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold">
            N
          </h1>
        </div>
        <div className="text-5xl text-start ml-10 mr-10  font-semibold  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </div>
        <button className="bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-white pt-4 pb-4 pl-10 pr-10 rounded-2xl ">
          More Info
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
