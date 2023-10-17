import React, { useState } from "react";
import {
  FiFacebook,
  FiHeart,
  FiInstagram,
  FiStar,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { BiUserPlus, BiUserCheck } from "react-icons/bi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

// static data
import { servicesCard, socails } from "./data";

import USER_LOGO from "../../assets/user.jpg";
import "./landing.css";
import { Zoom } from "react-reveal";
const PublicPage = () => {
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

  console.log(backedData);

  const handleLikeService = (id) => {
    if (backedData.itemLikedServices.includes(id)) {
      const updateLikedService = backedData.itemLikedServices.filter(
        (item) => item !== id
      );
      setBackendData({ ...backedData, itemLikedServices: updateLikedService });
    } else {
      setBackendData({
        ...backedData,
        itemLikedServices: [...backedData.itemLikedServices, id],
      });
    }
  };

  return (
    <div className="relative sm:pt-52 pt-36 pb-20 select-none">
      <div className="fixed top-0 left-0 h-screen w-screen bg-black -z-10">
        <div className="absolute sm:top-[-25rem] sm:right-[-10rem] top-[-8rem] right-[-8rem] rounded-full md:h-[50rem] md:w-[50rem] sm:h-[30rem] sm:w-[30rem] h-[20rem] w-[20rem] bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 circle" />
        <div className="absolute sm:bottom-[-5rem] sm:left-[-15rem] bottom-[-5rem] left-[-10rem] rounded-full sm:h-[30rem] sm:w-[30rem] h-[20rem] w-[20rem] bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 circle" />
        <div className="absolute sm:bottom-[-5rem] bottom-[-10rem] sm:right-[-5rem] right-[-10rem] rounded-full h-[20rem] w-[20rem] bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 circle" />
      </div>
      <div className="flex flex-col gap-10 justify-center items-center min-h-screen w-full">
        <div className="relative w-[90%] flex flex-col gap-3 min-h-[35rem] lg:rounded-3xl rounded-[3rem] sm:p-0 p-5 text-white border-2 border-white inset-0 bg-gray-100 bg-opacity-20 transition-opacity">
          <img
            src={USER_LOGO}
            alt="Img Not Found"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[15rem] w-[15rem] rounded-full border-white border-2"
          />
          <div className="flex md:flex-row flex-col gap-5 justify-around xl:pt-0 md:pt-[5rem] pt-[8rem] ">
            <div className="flex flex-col gap-2">
              <Zoom>
                <div className="flex items-center justify-center gap-5 sm:text-base text-sm sm:p-5 p-0">
                  <div>
                    <span className="text-2xl">{backedData.top}%</span>
                    <p>Top</p>
                  </div>
                  <div>
                    <span className="text-2xl">{backedData.service}</span>
                    <p>Services</p>
                  </div>
                  <div>
                    <span className="text-2xl">{backedData.booking}</span>
                    <p>Bookings</p>
                  </div>
                  <div>
                    <span className="text-2xl flex gap-2 items-center">
                      {backedData.avg_rating}
                      <FiStar />
                    </span>
                    <p>Avg rating</p>
                  </div>
                </div>
              </Zoom>
              <div className="flex sm:flex-row flex-col items-center sm:gap-10 gap-2">
                <Zoom>
                  <button
                    onClick={() =>
                      setBackendData({
                        ...backedData,
                        like: !backedData.like,
                      })
                    }
                    className={`${
                      backedData.like ? "bg-red-700" : "text-white"
                    } flex gap-2 items-center justify-center w-[10rem] p-2 rounded-3xl like-glowing font-bold text-lg`}
                  >
                    {backedData.like ? (
                      <>
                        <FiHeart className="fill-white" size={30} />
                        <div>Liked</div>
                      </>
                    ) : (
                      <>
                        <FiHeart size={30} />
                        <div>Like</div>
                      </>
                    )}
                  </button>
                </Zoom>
                <Zoom>
                  <button
                    onClick={() =>
                      setBackendData({
                        ...backedData,
                        follow: !backedData.follow,
                      })
                    }
                    className={`${
                      backedData.follow ? "bg-[rgb(4,5,237)]" : "text-white"
                    } flex gap-2 items-center justify-center w-[10rem] p-2 rounded-3xl follow-glowing font-bold text-lg`}
                  >
                    {backedData.follow ? (
                      <>
                        <BiUserCheck size={30} />
                        <div>Following</div>
                      </>
                    ) : (
                      <>
                        <BiUserPlus size={30} />
                        <div>Follow</div>
                      </>
                    )}
                  </button>
                </Zoom>
              </div>
            </div>
            <div className="flex justify-center items-center sm:gap-8 gap-2">
              {socails.map((item, i) => {
                const social = getSocialsItem(item);
                return (
                  <Zoom>
                    <div
                      className={`${social.color} text-white p-2 rounded-full sm:text-3xl text-xl cursor-pointer shadow-lg shadow-gray-700`}
                    >
                      {social.icon}
                    </div>
                  </Zoom>
                );
              })}
            </div>
          </div>
          <div className=" w-full h-full sm:pt-[2rem] sm:p-5">
            <div className="flex flex-col gap-2 w-full h-full items-center text-xl">
              <Zoom>
                <div className="sm:text-6xl text-3xl">Shailendra Trivedi</div>
                <div>shailendratrivedi004@123</div>
                <div className="sm:text-3xl text-xl">MERN Stack Developer</div>
              </Zoom>
              <Zoom>
                <div className="w-[80%]">
                  <label htmlFor="" className="font-bold">
                    About Us
                  </label>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Saepe enim iure illum eligendi dolor, voluptatem itaque illo
                    repudiandae id vel.
                  </p>
                </div>
              </Zoom>
              <div className="w-[80%]">
                <Zoom>
                  <label htmlFor="" className="font-bold">
                    Bio
                  </label>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Exercitationem facere voluptas, illo, necessitatibus a
                    repudiandae delectus fugiat sapiente eligendi accusantium
                    mollitia cumque et consequuntur vitae rem sint ut enim eos?
                    Odio necessitatibus quae dolorem explicabo quaerat, porro
                    minima temporibus ipsum sed consectetur doloribus veniam
                    natus aspernatur dolorum facilis vel dolores!
                  </p>
                </Zoom>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 w-[80%]">
          {servicesCard.map((item, i) => (
            <Zoom>
              <div
                key={i}
                className="relative w-full rounded-3xl flex flex-col items-center overflow-hidden text-white border-2 border-white inset-0 bg-gray-100 bg-opacity-20 transition-opacity glow-border"
              >
                <div className="flex gap-2 h-[5rem] w-full justify-end xs:p-5 p-2">
                  {backedData.itemLikedServices.includes(item.id) ? (
                    <>
                      <AiFillLike
                        onClick={() => handleLikeService(item.id)}
                        className="text-blue-500"
                        size={30}
                      />
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleLikeService(item.id)}>
                        <AiOutlineLike className="text-blue-500" size={30} />
                      </button>
                    </>
                  )}
                </div>
                <img
                  src={item.img}
                  alt=""
                  className="absolute top-2 left-[40%] h-[5rem] w-[5rem] rounded-full border-2 border-black bg-white"
                />
                <div className="text-2xl p-2">{item.label}</div>
                <p className="px-2 xs:text-xl text-base text-center">
                  {item.content}
                </p>
                <div className="flex xs:flex-row flex-col justify-between w-full items-center p-2 px-5">
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
                        {item.slashPrice && (
                          <div className="xs:hidden flex line-through text-lg">
                            ${item.slashPrice}
                          </div>
                        )}
                        <div className="font-bold">${item.price}</div>
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
  );
};

export default PublicPage;
