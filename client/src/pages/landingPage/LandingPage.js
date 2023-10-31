import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import "../index.css";
import image1 from "../../assets/job_interview_illustration_1.png";
import logo from "../../assets/logo1.png";
import background from "../../assets/rectangle.png";
import divImage from "../../assets/divoneimage.png";
import communication from "../../assets/peopleCommunicating.png";
import handshake from "../../assets/handshake.png";
import divthreeimage from "../../assets/divthreeimage.png";
import asking from "../../assets/asking.jpg";
import { FaBeer, FaClipboardCheck, FaHome } from "react-icons/fa";

import SignIn from "../login/signin/SignIn";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "../login/signup/SignUp";
import ForgetPassword from "../login/forgetpassword/ForgetPassword";
import OTPPassword from "../login/forgetpassword/OTPPasword";
import RecoverPassword from "../login/forgetpassword/RecoverPassword";
import { openLogin } from "../../redux/landingpage/landingPageSlice";
import { toast } from "react-toastify";
import Footer from "../../components/layout/footer/Footer";

import { cardsDataCol1, cardsDataCol2, stackData } from "./landingData";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Zoom from "react-reveal/Zoom";
import { BiBookBookmark, BiTime } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";

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
  const [showingDiv, setShowingDiv] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowingDiv(!showingDiv);
    }, 4000);
    return () => clearInterval(interval);
  });

  const [textShowing, setTextShowing] = useState(0);

  const text = [
    "Connecting Influencers and Users for Personalized 1-on-1 Services",
    "Your Gateway to Skill Enhancement and Career Growth",
    "Experience Tailored Guidance from Industry Influencers",
    "Where Experts and Enthusiasts Collaborate for Success",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setTextShowing((prevtext) =>
        prevtext === text.length - 1 ? 0 : prevtext + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div>
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
      
      <div className="flex flex-col gap-20 select-none">
        {/* First Component */}
        <div>
          {/* Top Part of First Component */}
          <div
            id="maindiv"
            className="sm:h-[45rem] h-[42rem] grid lg:grid-cols-2 grid-cols-1 sm:gap-10 gap-5 xs:p-10 p-2"
          >
            <div />
            <div className="flex justify-center items-center flex-col gap-10 bg-white inset-0 opacity-80 rounded-">
              <Zoom>
                <div className="flex justify-start text-5xl xl:text-9xl sm:text-7xl font-semibold ">
                  <h1 className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text">
                    LEGE
                  </h1>
                  <img
                    src={logo}
                    className="rounded-full xl:h-32 sm:h-16 h-10  shadow-sm shadow-black"
                    alt="Not Found"
                  />
                  <h1 className=" bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text">
                    N
                  </h1>
                </div>
                <div className="text-base xl:text-3xl sm:text-2xl font-semibold text- text-center">
                  {text[textShowing]}
                  Services
                </div>
              </Zoom>
            </div>
          </div>
        </div>

        {/* Second Component */}
        <div className="relative flex flex-col gap-5">
          <div className="flex sm:justify-center">
            <div className="border-l-8 sm:pl-20 pl-5 border-indigo-500">
              <Zoom left>
                <div className=" bg-gradient-to-r text-transparent from-pink-500 via-indigo-500 to-purple-500 bg-clip-text text-center sm:text-7xl text-5xl">
                  What we Offer !
                </div>
              </Zoom>
            </div>
          </div>
          <div className="flex flex-col sm:gap-20 lg:p-10 p-3">
            <div className="flex md:flex-row flex-col justify-around items-center lg:gap-20 sm:gap-2 gap-20 sm:p-0 xs:p-10 p-3">
              <div className="flex flex-col items-center lg:p-10 xs:p-5 p-3 gap-4 border-4 min-h-[20rem] md:w-[25rem] rounded-2xl hover:-translate-y-10 hover:scale-110 transition-all duration-500 hover:shadow-2xl border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white">
                <Zoom>
                  <FaHome className="text-6xl" />
                  <h1 className="sm:text-3xl text-2xl font-bold text-center">
                    Host and Earn
                  </h1>
                  <p className="text-center text-lg">
                    As an influencer or expert, easily host 1-on-1 sessions and
                    set your prices for services. Monetize your skills without
                    the hassle of managing bookings.
                  </p>
                </Zoom>
              </div>
              <div className="flex flex-col items-center lg:p-10 xs:p-5 p-3 gap-4 border-4 min-h-[20rem] md:w-[25rem] rounded-2xl hover:-translate-y-10 hover:scale-110 transition-all duration-500 hover:shadow-2xl text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white">
                <Zoom>
                  <BiTime className="text-6xl" />
                  <h1 className="sm:text-3xl text-2xl font-bold text-center">
                    Flexible Scheduling
                  </h1>
                  <p className="text-center text-lg">
                    Our platform offers flexible booking options, allowing you
                    to find and book services that align with your availability
                    and time zones.
                  </p>
                </Zoom>
              </div>{" "}
              <div className="flex flex-col items-center lg:p-10 xs:p-5 p-3 gap-4 border-4 min-h-[20rem] md:w-[25rem] rounded-2xl hover:-translate-y-10 hover:scale-110 transition-all duration-500 hover:shadow-2xl text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-white">
                <Zoom>
                  <FaClipboardCheck className="text-6xl" />
                  <h1 className="sm:text-3xl text-2xl font-bold text-center">
                    Book Expert Services
                  </h1>
                  <p className="text-center text-lg">
                    Browse through a diverse range of services offered by
                    influencers and experts. Book the ones that match your needs
                    and schedule.
                  </p>
                </Zoom>
              </div>
            </div>
            <div className="flex md:flex-row flex-col justify-center items-center lg:gap-20 sm:gap-2 gap-20 sm:p-0 xs:p-10 p-3">
              <div className="flex flex-col items-center lg:p-10 xs:p-5 p-3 gap-4 border-4 min-h-[20rem] md:w-[25rem] rounded-2xl hover:-translate-y-10 hover:scale-110 transition-all duration-500 hover:shadow-2xl text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white">
                <Zoom>
                  <BiBookBookmark className="text-6xl" />
                  <h1 className="sm:text-3xl text-2xl font-bold text-center">
                    Personalized Learning
                  </h1>
                  <p className="text-center text-lg">
                    Get individual attention and guidance from experienced
                    professionals to boost your career or personal growth.
                  </p>
                </Zoom>
              </div>{" "}
              <div className="flex flex-col items-center lg:p-10 xs:p-5 p-3 gap-4 border-4 min-h-[20rem] md:w-[25rem] rounded-2xl hover:-translate-y-10 hover:scale-110 transition-all duration-500 hover:shadow-2xl text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-white">
                <Zoom>
                  <BsShieldCheck className="text-6xl" />
                  <h1 className="sm:text-3xl text-2xl font-bold text-center">
                    Safe and Secure
                  </h1>
                  <p className="text-center text-lg">
                    Trust and safety are our top priorities. Our platform
                    ensures secure transactions and authentic service providers.
                  </p>
                </Zoom>
              </div>
            </div>
          </div>
        </div>

        {/* Third Component */}
        <div className="relative flex flex-col gap-5 bg-gray-200">
          <div className="p-16">
            <div className="absolute top-0 left-0 w-full flex flex-col sm:items-center">
              <div className="border-l-8 sm:pl-20 pl-10 border-indigo-500 m-10">
                <Zoom left>
                  <div className=" bg-gradient-to-r text-transparent from-pink-500 via-indigo-500 to-purple-500 bg-clip-text sm:text-7xl text-5xl">
                    How it works !
                  </div>
                </Zoom>
              </div>
            </div>
          </div>
          <div className="relative grid h-[40rem] w-full">
            <div className="absolute top-0 left-0 h-full sm:w-1/2">
              <div className="lg:flex hidden flex-col justify-center items-center h-full p-10">
                <div className="bg-gradient-to-r  block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text text-4xl">
                  Services that you can provide:
                </div>
                <ul className="p-10 text-xl w-full">
                  {showingDiv && (
                    <Zoom left cascade>
                      <div className="space-y-3">
                        <li className=" p-2 border-2 border-pink-500 text-pink-500 rounded-xl text-center">
                          "Mock Interviews"
                        </li>
                        <li className=" p-2 border-2 border-indigo-500 text-indigo-500 rounded-xl text-center">
                          "Resume Review"
                        </li>
                        <li className=" p-2 border-2 border-violet-500 text-violet-500 rounded-xl text-center">
                          "Career Guidance"
                        </li>
                        <li className=" p-2 border-2 border-pink-500 text-pink-500 rounded-xl text-center">
                          "Raise funding for your startup"
                        </li>
                      </div>
                    </Zoom>
                  )}
                  {!showingDiv && (
                    <Zoom right cascade>
                      <div className="space-y-3">
                        <li className=" p-2 border-2 border-indigo-500 text-indigo-500 rounded-xl text-center">
                          "Ask me anything"
                        </li>
                        <li className=" p-2 border-2 border-violet-500 text-violet-500 rounded-xl text-center">
                          "GATE Preparation Strategy"
                        </li>
                        <li className=" p-2 border-2 border-pink-500 text-pink-500 rounded-xl text-center">
                          "Placement Training"
                        </li>
                        <li className=" p-2 border-2 border-indigo-500 text-indigo-500 rounded-xl text-center">
                          "Personal Branding Coach"
                        </li>
                      </div>
                    </Zoom>
                  )}
                </ul>
              </div>
            </div>
            <div className="scroll">
              <VerticalTimeline className="" lineColor="rgb(229,231,235)">
                {stackData.map((item, i) => (
                  <VerticalTimelineElement
                    position="right"
                    key={i}
                    className="vertical-timeline-element--work"
                    contentStyle={{
                      borderRadius: "20px",
                      border: `${item.border} solid 3px`,
                    }}
                    contentArrowStyle={{
                      borderRight: `${item.border} solid 10px`,
                      width: "100%",
                    }}
                    iconStyle={{ background: item.border, color: "#fff" }}
                    icon={item.icon}
                  >
                    <div>
                      <h1 className="text-2xl font-bold">{item.label}</h1>
                      <p>{item.content}</p>
                    </div>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </div>
          </div>
          <div className="">
            <div className="lg:hidden flex flex-col gap-10 justify-center items-center h-full p-5">
              <div className="bg-gradient-to-r  block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text sm:text-4xl text-2xl">
                Services that you can provide:
              </div>
              <ul className="flex flex-col sm:text-xl gap-2 w-full">
                {showingDiv && (
                  <Zoom left cascade>
                    <div className="space-y-3">
                      <li className=" p-2 border-2 border-pink-500 text-pink-500 rounded-xl text-center">
                        "Mock Interviews"
                      </li>
                      <li className=" p-2 border-2 border-indigo-500 text-indigo-500 rounded-xl text-center">
                        "Resume Review"
                      </li>
                      <li className=" p-2 border-2 border-violet-500 text-violet-500 rounded-xl text-center">
                        "Career Guidance"
                      </li>
                      <li className=" p-2 border-2 border-pink-500 text-pink-500 rounded-xl text-center">
                        "Raise funding for your startup"
                      </li>
                    </div>
                  </Zoom>
                )}
                {!showingDiv && (
                  <Zoom right cascade>
                    <div className="space-y-3">
                      <li className=" p-2 border-2 border-indigo-500 text-indigo-500 rounded-xl text-center">
                        "Ask me anything"
                      </li>
                      <li className=" p-2 border-2 border-violet-500 text-violet-500 rounded-xl text-center">
                        "GATE Preparation Strategy"
                      </li>
                      <li className=" p-2 border-2 border-pink-500 text-pink-500 rounded-xl text-center">
                        "Placement Training"
                      </li>
                      <li className=" p-2 border-2 border-indigo-500 text-indigo-500 rounded-xl text-center">
                        "Personal Branding Coach"
                      </li>
                    </div>
                  </Zoom>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/*Fourth Compontent */}
        <div>
          <div className="relative sm:flex hidden flex-col sm:gap-0 gap-20">
            <div className="sm:p-10 ">
              <div className="absolute top-0 left-0 w-full flex flex-col sm:items-center">
                <div className="border-l-8 sm:pl-20 pl-20 border-indigo-500">
                  <Zoom left>
                    <div className=" bg-gradient-to-r text-transparent from-pink-500 via-indigo-500 to-purple-500 bg-clip-text sm:text-7xl text-5xl">
                      Why us?
                    </div>
                  </Zoom>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 sm:p-10 p-5">
              <div className="grid grid-cols-3 gap-5">
                <div />
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-pink-500">
                    Empowering Your Journey
                  </h1>
                  <p>
                    Legeon is not just a platform; it's your gateway to personal
                    and professional development.
                  </p>
                </div>
                <div />
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-indigo-500">
                    Quality and Variety
                  </h1>
                  <p>
                    Access a broad spectrum of services, all provided by
                    reputable influencers and experts.
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={asking}
                    alt=""
                    className="h-[20rem] w-[20rem] object-contain "
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-violet-500">
                    Flexible and Secure
                  </h1>
                  <p>
                    Our platform is designed to adapt to your schedule while
                    ensuring the utmost security.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-violet-500">
                    Community-Driven
                  </h1>
                  <p>
                    Join a thriving community of learners and mentors, all
                    driven by a shared passion for growth.
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-pink-500">
                    Your Achievement, Our Commitment
                  </h1>
                  <p>
                    We are committed to your success, every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative sm:hidden flex flex-col sm:gap-5 gap-20">
            <div className="sm:p-10 ">
              <div className="absolute top-0 left-0 w-full flex flex-col sm:items-center">
                <div className="border-l-8 sm:pl-20 pl-20 border-indigo-500">
                  <Zoom left>
                    <div className=" bg-gradient-to-r text-transparent from-pink-500 via-indigo-500 to-purple-500 bg-clip-text sm:text-7xl text-5xl">
                      Why us?
                    </div>
                  </Zoom>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 sm:p-10 p-5">
              <div className="flex  flex-col justify-around gap-5">
                <img
                  src={asking}
                  alt=""
                  className="h-[20rem] w-[20rem] object-contain "
                />
                <div className="">
                  <h1 className="text-2xl font-bold text-pink-500">
                    Empowering Your Journey
                  </h1>
                  <p>
                    Legeon is not just a platform; it's your gateway to personal
                    and professional development.
                  </p>
                </div>
                <div className="">
                  <h1 className="text-2xl font-bold text-indigo-500">
                    Quality and Variety
                  </h1>
                  <p>
                    Access a broad spectrum of services, all provided by
                    reputable influencers and experts.
                  </p>
                </div>
                <div className="">
                  <h1 className="text-2xl font-bold text-violet-500">
                    Flexible and Secure
                  </h1>
                  <p>
                    Our platform is designed to adapt to your schedule while
                    ensuring the utmost security.
                  </p>
                </div>
              </div>
              <div className="flex sm:flex-row flex-col justify-around gap-5">
                <div className="">
                  <h1 className="text-2xl font-bold text-violet-500">
                    Community-Driven
                  </h1>
                  <p>
                    Join a thriving community of learners and mentors, all
                    driven by a shared passion for growth.
                  </p>
                </div>
                <div className="">
                  <h1 className="text-2xl font-bold text-pink-500">
                    Your Achievement, Our Commitment
                  </h1>
                  <p>
                    We are committed to your success, every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Fifty Compontent */}
      <Footer />
    </>
  );
};

export default LandingPage;
