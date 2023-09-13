import React, { useEffect } from "react";
import "./LandingPage.css";
import "../index.css";
import image1 from "../../assets/job_interview_illustration_1.png";
import logo from "../../assets/logo1.png";
import background from "../../assets/rectangle.png";
import divImage from "../../assets/divoneimage.png";
import communication from "../../assets/peopleCommunicating.png";
import handshake from "../../assets/handshake.png";
import divthreeimage from "../../assets/divthreeimage.png";
import { FaBeer } from "react-icons/fa";

import SignIn from "../login/signin/SignIn";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "../login/signup/SignUp";
import ForgetPassword from "../login/forgetpassword/ForgetPassword";
import OTPPassword from "../login/forgetpassword/OTPPasword";
import RecoverPassword from "../login/forgetpassword/RecoverPassword";
import { openLogin } from "../../redux/landingpage/landingPageSlice";
import { toast } from "react-toastify";

const LandingPage = ({ sidebarVisible }) => {
  useEffect(() => {
    const val = new URLSearchParams(window.location.search);
    if (val.get("accountRegistered") == "true") {
      toast.error("Account Already Registered!");
      setTimeout(() => {
        window.location = "/";
      }, 3000);
    }
  }, []);

  const dispatch = useDispatch();

  const showLogin = useSelector((state) => state.landingpage.showLogin);

  const showRegister = useSelector((state) => state.landingpage.showRegister);
  const showForgetPassword = useSelector((state) => state.landingpage.showFP);
  const fpPhase = useSelector((state) => state.landingpage.phase);

  return (
    <>
      {/* First div section */}
      <div id="maindiv" className="w-full ">
        {/* Popup containers for login, register, and forget password */}
        {showLogin && (
          <div className="popup-container">
            <SignIn />
          </div>
        )}
        {showRegister && (
          <div className="popup-container">
            <SignUp />
          </div>
        )}
        {showForgetPassword && (
          <div className="popup-container">
            {/* Different phases of forget password */}
            {fpPhase === 0 && <ForgetPassword />}
            {fpPhase === 1 && <OTPPassword />}
            {fpPhase === 2 && <RecoverPassword />}
          </div>
        )}
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:m-16 m-8 mt-10 mb-0">
          {/* Left Image */}
          <img
            alt="workers working together"
            src={image1}
            className="w-full lg:w-1/2"
          />
          <div className="flex justify-center items-center flex-col gap-10 ">
            <div className=" hidden lg:flex justify-start ">
              {/* Logo with gradient text */}
              <h1 className=" text-2xl  lg:text-9xl bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold ">
                LEGE
              </h1>
              <img
                src={logo}
                className="rounded-full sm:h-10 lg:h-32 shadow-sm shadow-black"
                alt="logo of legeon"
              />
              {/* Letter 'N' with gradient text */}
              <h1 className=" text-2xl lg:text-9xl bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text font-semibold">
                N
              </h1>
            </div>
            {/* Main Title */}
            <div className="text-xl lg:text-3xl font-semibold text-white">
              Connecting Influencers and Seekers for Personalized 1-on-1
              Services
            </div>
            {/* More Info Button */}
            <button className=" z-10 md:z-10">
              <a
                className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white py-4 px-10 shadow-md rounded-2xl hover:opacity-80 duration-300 "
                onClick={(e) => {
                  e.preventDefault();
                  let smooth_scroll = document.getElementById("smooth-scroll");
                  smooth_scroll && smooth_scroll.scrollIntoView();
                }}
              >
                More Info
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Second div section */}
      <div className="bg-custom-blue h-full w-full p-10 lg:pt-0 lg:-translate-y-16 -translate-y-5 -z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Content */}
          <div className="flex flex-col gap-10 mt-4">
            <div>
              {/* Title */}
              <h1 className="text-6xl text-white border-l-[0.5rem] pl-4 border-l-white">
                Revenue Stream
              </h1>
            </div>
            {/* Text and Image Content */}
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Text Content */}
              <p className="text-xl lg:text-2xl text-justify text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
              {/* Image */}
              <img
                src={divImage}
                className="shadow-xl rounded-2xl"
                alt="girl working with calendar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Third div section */}
      <div
        id="smooth-scroll"
        className="flex flex-col lg:flex-row m-10 mt-20 lg:m-20 gap-10 lg:gap-20 items-center justify-between h-full"
      >
        {/* First Card */}
        <div className="bg-purple-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-6 hover:-translate-y-10 duration-300 items-center">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>
          {/* Description */}
          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-indigo-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-6 hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>
          {/* Description */}
          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>

        {/* Third Card */}
        <div className="bg-pink-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0 p-7">
          {/* Icon and Title */}
          <div className="flex items-center gap-4 text-white">
            <FaBeer className="h-5" />
            <div className="text-3xl font-bold text-white text text-center px-2 border-l-4 border-white">
              <h1>Book Expert services</h1>
            </div>
          </div>
          {/* Description */}
          <div className="text-left text-2xl h-1/2 text-white">
            Browse through a diverse range of services offered by influencers
            and experts. Book the ones that match your needs and schedule.
          </div>
        </div>
      </div>

      {/* Fourth div section */}
      <div className="flex flex-col m-10 gap-10 mt-20 lg:m-20 lg:gap-20 justify-between lg:flex-row">
        {/* First Card */}
        <div className="bg-pink-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-5 hover:-translate-y-10 duration-300 items-center">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>
          {/* Description */}
          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-indigo-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-5 hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>
          {/* Description */}
          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>

        {/* Third Card */}
        <div className="bg-violet-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-5 hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0">
          {/* Icon and Title */}
          <div className="flex items-center gap-4 text-white">
            <FaBeer className="h-5" />
            <div className="text-3xl font-bold text-white text text-center px-2 border-l-4 border-white">
              <h1>Book Expert services</h1>
            </div>
          </div>
          {/* Description */}
          <div className="text-left text-2xl h-1/2 text-white">
            Browse through a diverse range of services offered by influencers
            and experts. Book the ones that match your needs and schedule.
          </div>
        </div>
      </div>

      <div className="h-screen w-full flex justify-center items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-9 px-2">
          {/* Stack 1 */}
          <div className="col-span-4 w-full h-full">
            <div className="w-full h-full bg-gray-200 rounded-md p-2  md:pl-4">
              <h1 className="text-gray-800 text-xl font-medium py-2">Title</h1>
              <p className="text-gray-600 sm:text-sm text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                corporis consequuntur voluptate nulla iusto quam ut quasi, eaque
                quas omnis vero totam ullam, reprehenderit ratione pariatur
                accusamus suscipit odit nostrum?
              </p>
            </div>
          </div>
          <div className="relative col-span-1 w-full h-full flex justify-center items-center">
            <div className="h-full w-1 bg-gray-300"></div>
            <div className="absolute w-6 h-6 rounded-full bg-gray-400 z-10 text-gray-800 text-center">
              1
            </div>
          </div>
          <div className="col-span-4 w-full h-full"></div>

          {/* Stack 2 */}
          <div className="col-span-4 w-full h-full"></div>
          <div className="relative col-span-1 w-full h-full flex justify-center items-center">
            <div className="h-full w-1 bg-gray-300"></div>
            <div className="absolute w-6 h-6 rounded-full bg-gray-400 z-10 text-gray-800 text-center">
              2
            </div>
          </div>
          <div className="col-span-4 w-full h-full">
            <div className="w-full h-full bg-gray-200 rounded-md p-2 md:pl-4">
              <h1 className="text-gray-800 text-xl font-medium py-2">Title</h1>
              <p className="text-gray-600 sm:text-sm text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                corporis consequuntur voluptate nulla iusto quam ut quasi, eaque
                quas omnis vero totam ullam, reprehenderit ratione pariatur
                accusamus suscipit odit nostrum?
              </p>
            </div>
          </div>

          {/* Stack 3 */}
          <div className="col-span-4 w-full h-full">
            <div className="w-full h-full bg-gray-200 rounded-md p-2 md:pl-4">
              <h1 className="text-gray-800 text-xl font-medium py-2">Title</h1>
              <p className="text-gray-600 sm:text-sm text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                corporis consequuntur voluptate nulla iusto quam ut quasi, eaque
                quas omnis vero totam ullam, reprehenderit ratione pariatur
                accusamus suscipit odit nostrum?
              </p>
            </div>
          </div>
          <div className="relative col-span-1 w-full h-full flex justify-center items-center">
            <div className="h-full w-1 bg-gray-300"></div>
            <div className="absolute w-6 h-6 rounded-full bg-gray-400 z-10 text-gray-800 text-center">
              3
            </div>
          </div>
          <div className="col-span-4 w-full h-full"></div>
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
            <button
              onClick={() => dispatch(openLogin())}
              className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 p-3 rounded-xl w-40 text-white shadow-md hover:opacity-80 duration-300"
            >
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

export default LandingPage;
