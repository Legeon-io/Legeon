import React, { useState } from "react";
import "./Dashboard.css";
import "../index.css";
import image1 from "../../assets/job_interview_illustration_1.png";
import logo from "../../assets/logo1.png";
import background from "../../assets/rectangle.png";
import divImage from "../../assets/divoneimage.png";
import communication from "../../assets/peopleCommunicating.png";
import handshake from "../../assets/handshake.png";
import divthreeimage from "../../assets/divthreeimage.png";
import "./Dashboard.css";
import SignIn from "../login/signin/SignIn";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "../login/signup/SignUp";
import ForgetPassword from "../login/forgetpassword/ForgetPassword";
const Dashboard = ({ sidebarVisible }) => {
  const dispatch = useDispatch();

  const openLogin = useSelector((state) => state.dashboard.showLogin);
  const openRegister = useSelector((state) => state.dashboard.showRegister);
  const openForgetPassword = useSelector((state) => state.dashboard.showFP);

  return (
    <>
      <div id="maindiv" className="w-full">
        {openLogin && (
          <div className="popup-container">
            <SignIn />
          </div>
        )}
        {openRegister && (
          <div className="popup-container">
            <SignUp />
          </div>
        )}
        {openForgetPassword && (
          <div className="popup-container">
            <ForgetPassword />
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-10 lg:m-16 m-8 mt-10 mb-0">
          <img
            alt="workers working together"
            src={image1}
            className="w-full lg:w-1/2"
          />
          <div className="flex justify-center items-center flex-col gap-10 ">
            <div className=" hidden lg:flex justify-start ">
              <h1 className=" text-2xl  lg:text-9xl bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold ">
                LEGE
              </h1>
              <img
                src={logo}
                className="rounded-full sm:h-10 lg:h-32 shadow-sm shadow-black"
                alt="logo of legeon"
              />
              <h1 className=" text-2xl lg:text-9xl bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold">
                N
              </h1>
            </div>
            <div className="text-xl lg:text-3xl font-semibold text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <button className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white py-4 px-10 shadow-md rounded-2xl hover:opacity-80 duration-300">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/** second div */}
      <div className="bg-custom-blue h-full w-full p-10 lg:pt-0 lg:-translate-y-20 translate-y-0 ">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col gap-10 mt-4">
            <div>
              <h1 className="text-6xl text-white border-l-[0.5rem] pl-4 border-l-white">
                Revenue Stream
              </h1>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              <p className="text-xl lg:text-2xl text-justify text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
              <img
                src={divImage}
                className="shadow-xl rounded-2xl"
                alt="girl working with calendar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* third div*/}
      <div className="flex flex-col lg:flex-row m-10 mt-20 lg:m-20 gap-20 lg:gap-0 justify-between">
        <div className="bg-gray-200 flex flex-col w-full lg:w-1/4 rounded-xl p-10">
          <img src={communication} alt="people communicating with each other" />
          <h1 className="text-4xl">Lorem ipsum</h1>
          <p className="text-start">
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua lorem ipsum dolor sit amet,
            consectetur
          </p>
          <div className="flex w-full flex-row-reverse">
            <button className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 p-2 text-white rounded-2xl">
              Know more
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center ml-10 mt-10 lg:mt-0">
          <div className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold text-4xl lg:text-8xl">
            Make robust <br /> connections
          </div>
        </div>
      </div>

      {/**fourth div */}
      <div className="flex flex-col m-10 gap-20 mt-20 lg:m-20 lg:gap-0 justify-between lg:flex-row-reverse">
        <div className="bg-gray-200 flex flex-col w-full lg:w-1/4 rounded-xl p-10">
          <img src={handshake} alt="people communicating with each other" />
          <h1 className="text-2xl">Lorem ipsum</h1>
          <p className="lg:text-start  ">
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua lorem ipsum dolor sit amet,
            consectetur
          </p>
          <div className="flex w-full flex-row-reverse">
            <button className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 p-2 text-white rounded-2xl">
              Know more
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center ml-10 mt-10 lg:mt-0">
          <div className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold text-4xl lg:text-8xl">
            Be the mentor <br /> and the mentee <br /> at the same time
          </div>
        </div>
      </div>

      {/*fifth div */}
      <div className="bg-custom-orange h-full w-full p-10">
        <div className="flex flex-col lg:flex-row-reverse gap-10">
          <img
            src={divthreeimage}
            className="shadow-xl rounded-2xl w-full lg:w-1/2"
            alt="girl working with calendar"
          />

          <div className="flex flex-col gap-10">
            <div>
              <h1 className="text-6xl borderl text-white border-l-[0.5rem] pl-4 border-l-white">
                Your Network Is The Network You Build
              </h1>
            </div>
            <p className="text-lg  lg:text-2xl text-white text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </p>
            <button className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 p-3 rounded-xl w-40 text-white shadow-md hover:opacity-80 duration-300">
              Join now
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-200 h-56 flex justify-center items-center">
        FOOTER
      </footer>
    </>
  );
};

export default Dashboard;
