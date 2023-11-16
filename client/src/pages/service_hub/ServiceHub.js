import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FiFacebook,
  FiHeart,
  FiInstagram,
  FiStar,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

import USER_LOGO from "../../assets/user.jpg";
import "./landing.css";
import { Zoom } from "react-reveal";
import { pppAction } from "../../redux/service_hub/ServiceHubAction";

const getSocialsItem = (id) => {
  switch (id) {
    case "linkedin":
      return {
        icon: <FaLinkedin />,
        color: "bg-blue-700",
        input: "text-blue-700 border-blue-700",
        label: "LinkedIn",
      };
    case "twitter":
      return {
        icon: <FiTwitter />,
        color: "bg-blue-400 text-blue-400 border-blue-400",
        input: "text-blue-400 border-blue-400",
        label: "Twitter",
      };
    case "youtube":
      return {
        icon: <FiYoutube />,
        color: "bg-red-700",
        input: "text-red-700 border-red-700",
        label: "Youtube",
      };
    case "instagram":
      return {
        icon: <FiInstagram />,
        color: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        input: "text-indigo-500 border-indigo-500",
        label: "Instagram",
      };
    case "facebook":
      return {
        icon: <FiFacebook />,
        color: "bg-blue-500",
        input: "text-blue-700 border-blue-700",
        label: "Facebook",
      };
    default:
      return null;
  }
};

function ServiceHub() {
  const param = useParams();
  const username = param.username;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pppAction({ username }));
  }, [dispatch, username]);
  const publicProfileStore = useSelector((state) => state.publicProfileStore);
  const backendData = publicProfileStore.data;
  console.log(backendData);
  // const username =
  // To calculate the discount
  // const discount = (price, strikePrice) => {
  //   const sum = (price * 100) / strikePrice;
  //   return parseInt(sum);
  // };

  const [backedData, setBackendData] = useState({
    top: 1,
    service: 22,
    booking: "1K+",
    avg_rating: 5,
    like: false,
    follow: false,
    itemLikedServices: [],
  });

  const isGoogle = useSelector((state) => state.profile.userData.isGoogle);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/profiles/getUserDetails`,
          {
            username: window.location.pathname.split("/")[1],
          }
        );
      } catch (err) {
        navigate("/404");
      }
    })();
  });
  return (
    <>
      {backendData && backendData.profile && (
        <div className="relative sm:pt-32 pt-36 pb-20 select-none">
          <div className="fixed top-0 left-0 h-screen w-screen bg-black -z-10">
            <div className="absolute sm:top-[-25rem] sm:right-[-10rem] top-[-8rem] right-[-8rem] rounded-full md:h-[50rem] md:w-[50rem] sm:h-[30rem] sm:w-[30rem] h-[20rem] w-[20rem] bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 circle" />
            <div className="absolute sm:bottom-[-5rem] sm:left-[-15rem] bottom-[-5rem] left-[-10rem] rounded-full sm:h-[30rem] sm:w-[30rem] h-[20rem] w-[20rem] bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 circle" />
            <div className="absolute sm:bottom-[-5rem] bottom-[-10rem] sm:right-[-5rem] right-[-10rem] rounded-full h-[20rem] w-[20rem] bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 circle" />
          </div>
          <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
            <div className="relative w-[80%] flex flex-col gap-3 min-h-[35rem] lg:rounded-3xl rounded-[3rem] sm:p-0 p-5 text-white border-2 border-white inset-0 bg-gray-100 bg-opacity-20 transition-opacity">
              <img
                src={USER_LOGO}
                alt="Img Not Found"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-[12rem] w-[15rem] rounded-full border-white border-2"
              />
              <div className="flex md:flex-row flex-col gap-5 justify-around xl:pt-0 md:pt-[5rem] pt-[8rem] ">
                <div className="flex flex-col gap-2">
                  <Zoom>
                    <div className="flex items-center justify-center gap-5 sm:text-base text-sm sm:p-5 p-0">
                      <div>
                        <div className="text-2xl text-center">
                          {backedData.top}%
                        </div>
                        <p>Top</p>
                      </div>
                      <div>
                        <div className="text-2xl text-center">
                          {backendData.servicesCount}
                        </div>
                        <p>Services</p>
                      </div>
                      <div>
                        <div className="text-2xl text-center">
                          {backedData.booking}
                        </div>
                        <p>Bookings</p>
                      </div>
                      <div>
                        <span className="text-2xl flex gap-2 items-center justify-center">
                          {backedData.avg_rating}
                          <FiStar />
                        </span>
                        <p>Avg rating</p>
                      </div>
                    </div>
                  </Zoom>
                </div>
                <div className="flex justify-center items-center sm:gap-8 gap-2">
                  {backendData.profile.link.map((item, i) => {
                    const social = getSocialsItem(item.id);
                    return (
                      <Zoom>
                        <Link to={item.href}>
                        <div
                          className={`${social.color} text-white p-2 rounded-full sm:text-3xl text-xl cursor-pointer shadow-lg shadow-gray-700`}
                        >
                          {social.icon}
                        </div>
                        </Link>
                      </Zoom>
                    );
                  })}
                </div>
              </div>
              <div className=" w-full h-full sm:pt-[2rem] sm:p-5">
                <div className="flex flex-col gap-2 w-full h-full items-center text-xl">
                  <Zoom>
                    <div className="sm:text-6xl text-3xl flex gap-10">
                      <p>{backendData.firstname}</p>
                      <p>{backendData.lastname}</p>
                    </div>
                    <div>{backendData.username}</div>
                    <div className="sm:text-3xl text-xl">
                      {backendData.profile.profession}
                    </div>
                  </Zoom>
                  {backendData.profile.introduction && (
                    <Zoom>
                      <div className="w-[80%]">
                        <label htmlFor="" className="font-bold">
                          About Us
                        </label>
                        <p>{backendData.profile.introduction}</p>
                      </div>
                    </Zoom>
                  )}
                  {backendData.profile.bio && (
                    <div className="w-[80%]">
                      <Zoom>
                        <label htmlFor="" className="font-bold">
                          Bio
                        </label>
                        <p>{backendData.profile.bio}</p>
                      </Zoom>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 w-[80%]">
              {backendData.services.map((item, i) => (
                <Zoom>
                  <div
                    key={i}
                    className="relative w-full rounded-3xl flex flex-col  justify-between items-center overflow-hidden text-white border-2 border-white inset-0 bg-gray-100 bg-opacity-20 transition-opacity glow-border pt-[5rem]"
                  >
                    <img
                      src={item.img}
                      alt=""
                      className="absolute top-2 left-[40%] h-[5rem] w-[5rem] rounded-full border-2 border-black bg-white"
                    />
                    <div className="text-2xl p-2">{item.serviceTitle}</div>
                    <p className="px-2 xs:text-xl text-base text-center h-full">
                      {item.serviceDescription}
                    </p>
                    <div className="w-full p-2 px-5">
                      {item.duration && (
                        <div className="flex justify-start gap-2 ps-2">
                          <label htmlFor="" className="">
                            Duration:
                          </label>
                          <div className="font-bold">{item.duration} min</div>
                        </div>
                      )}
                      <div className="flex xs:flex-row flex-col justify-between w-full items-center">
                        <button className="text-center bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white p-2 rounded-3xl w-[8rem]">
                          Book
                        </button>
                        <div>
                          {item.slashPrice ? (
                            <div className="xs:flex justify-end hidden">
                              <div className="line-through text-lg">
                                ${item.slashPrice}
                              </div>
                            </div>
                          ) : (
                            <div />
                          )}
                          <div className="flex items-center gap-2">
                            <div className="">Price:</div>
                            <div className="flex gap-4 justify-between items-center text-2xl">
                              <div className="font-bold">${item.price}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Zoom>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceHub;
