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
import Footer from "../../components/layout/footer/Footer";
import Carousel from "./Carousel";

import { cardsData, stackData } from "./landingData";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

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
      {/* Popup containers for login, register, and forget password */}
      <div>
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
      </div>

      {/*  Landing page code -------------------------- */}
      <div className="flex flex-col gap-10">
        <div>
          <div
            id="maindiv"
            className="w-full h-[45rem] grid grid-cols-2 gap-10 p-10"
          >
            <div className="bg-white rounded-2xl overflow-hidden">
              <Carousel />
            </div>
            <div className="flex justify-center items-center flex-col gap-10 ">
              <div className="hidden lg:flex justify-start text-2xl lg:text-9xl font-semibold ">
                <h1 className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text">
                  LEGE
                </h1>
                <img
                  src={logo}
                  className="rounded-full sm:h-10 lg:h-32 shadow-sm shadow-black"
                  alt="Not Found"
                />
                <h1 className=" bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text">
                  N
                </h1>
              </div>
              <div className="text-xl lg:text-3xl font-semibold text-white text-center">
                Connecting Influencers and Seekers for Personalized 1-on-1
                Services
              </div>
              <button className=" z-10 md:z-10">
                <a
                  className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white py-4 px-10 shadow-md rounded-2xl hover:opacity-80 duration-300 "
                  onClick={(e) => {
                    e.preventDefault();
                    let smooth_scroll =
                      document.getElementById("smooth-scroll");
                    smooth_scroll && smooth_scroll.scrollIntoView();
                  }}
                >
                  More Info
                </a>
              </button>
            </div>
          </div>
          <div className="bg-custom-blue h-full w-full p-10">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex flex-col gap-10 mt-4">
                <div>
                  <h1 className="text-6xl text-white border-l-[0.5rem] pl-4 border-l-white">
                    Revenue Stream
                  </h1>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-10">
                  <p className="text-xl lg:text-2xl text-justify text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua
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
        </div>

        {/* Third div section */}
        <div className="grid grid-cols-3 gap-20 p-10 ">
          {cardsData.map((item, i) => {
            return (
              <>
                <div
                  className={`flex flex-col p-5 gap-2 ${item.color} text-white rounded-2xl hover:-translate-y-10 hover:scale-110 transition-all duration-500`}
                >
                  <div className="flex justify-center items-center text-3xl gap-2">
                    <div className="">{item.icon}</div>
                    <div className="">{item.label}</div>
                  </div>
                  <div className="">{item.content}</div>
                </div>
              </>
            );
          })}
        </div>

        {/* <div className="grid grid-cols-2 gap-20 p-10">
          {stackData.map((item, i) => (
            <>
              {i % 2 == 0 ? (
                <>
                  <div className="flex flex-col">
                    <div className="">{item.label}</div>
                    <div className="">{item.content}</div>
                  </div>
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div className="flex flex-col">
                    <div className="">{item.label}</div>
                    <div className="">{item.content}</div>
                  </div>
                </>
              )}
            </>
          ))}
        </div> */}

        <VerticalTimeline>
          {stackData.map((item, i) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2010 - 2011"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<FaBeer />}
            >
              <div>
                <h1>{item.label}</h1>
                <p>{item.content}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

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
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
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
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
