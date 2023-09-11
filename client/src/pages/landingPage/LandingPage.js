import React from "react";
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

const LandingPage = ({ sidebarVisible }) => {
  const dispatch = useDispatch();

  const showLogin = useSelector((state) => state.landingpage.showLogin);

  const showRegister = useSelector((state) => state.landingpage.showRegister);
  const showForgetPassword = useSelector((state) => state.landingpage.showFP);
  const fpPhase = useSelector((state) => state.landingpage.phase);

  return (
    <>
      <div id="maindiv" className="w-full ">
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
            {fpPhase === 0 && <ForgetPassword />}
            {fpPhase === 1 && <OTPPassword />}
            {fpPhase === 2 && <RecoverPassword />}
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
            <div className="text-xl lg:text-3xl font-semibold text-white">
              Connecting Influencers and Seekers for Personalized 1-on-1
              Services
            </div>
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

      {/** second div */}
      <div className="bg-custom-blue h-full w-full p-10 lg:pt-0 lg:-translate-y-16 -translate-y-5 -z-10">
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

      {/* third div */}
      <div
        id="smooth-scroll"
        className="flex flex-col lg:flex-row m-10 mt-20 lg:m-20 gap-10 lg:gap-20 items-center justify-between h-full"
      >
        <div className="bg-purple-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-6 hover:-translate-y-10 duration-300 items-center">
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>
          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>

        <div className="bg-indigo-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-6 hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0">
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>

          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>

        <div className="bg-pink-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0 p-7">
          <div className="flex items-center gap-4 text-white">
            <FaBeer className="h-5" />
            <div className="text-3xl font-bold text-white text text-center px-2 border-l-4 border-white">
              <h1>Book Expert services</h1>
            </div>
          </div>

          <div className="text-left text-2xl h-1/2 text-white">
            Browse through a diverse range of services offered by influencers
            and experts. Book the ones that match your needs and schedule.
          </div>
        </div>
      </div>

      {/**fourth div */}
      <div className="flex flex-col m-10 gap-10 mt-20 lg:m-20 lg:gap-20 justify-between lg:flex-row">
        <div className="bg-pink-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-5 hover:-translate-y-10 duration-300 items-center">
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>
          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>
        <div className="bg-indigo-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-5 hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0">
          <div className="flex items-center gap-3 text-white">
            <FaBeer className="h-5" />
            <div className="text-center text-4xl font-bold text-white  border-l-4 border-white px-2">
              Host and Earn
            </div>
          </div>
          <div className="text-left text-2xl h-1/2 text-white">
            As an influencer or expert, easily host 1-on-1 sessions and set your
            prices for services. Monetize your skills without the hassle of
            managing bookings.
          </div>
        </div>
        <div className="bg-violet-500 flex flex-col w-full lg:w-1/2 gap-10 rounded-lg shadow-lg p-5 hover:-translate-y-10 duration-300 items-center mt-10 lg:mt-0">
          <div className="flex items-center gap-4 text-white">
            <FaBeer className="h-5" />
            <div className="text-3xl font-bold text-white text text-center px-2 border-l-4 border-white">
              <h1>Book Expert services</h1>
            </div>
          </div>
          <div className="text-left text-2xl h-1/2 text-white">
            Browse through a diverse range of services offered by influencers
            and experts. Book the ones that match your needs and schedule.
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
