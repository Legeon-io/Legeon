import React, { useEffect, useState } from "react";
import USER_LOGO from "../../../assets/user.jpg";
import Cookie from "js-cookie";

// React Icons
import { BsPencilSquare } from "react-icons/bs";
import {
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const Edit_Profile = () => {
  const [backendData, setBackendData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    profession: "",
    intro: "",
    bio: "",
    linkedin: "",
    twitter: "",
    insta: "",
    youtube: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/profiles/getprofile", {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        const { firstname, lastname, username, data } = res.data[0];
        const userProfileData = data[0] || {};

        setBackendData({
          firstname: firstname,
          lastname: lastname,
          username: username,
          profession: userProfileData.profession || "",
          intro: userProfileData.introduction || "",
          bio: userProfileData.bio || "",
          linkedin: userProfileData.linkedin || "",
          twitter: userProfileData.twitter || "",
          insta: userProfileData.insta || "",
          youtube: userProfileData.youtube || "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch profile data");
      });
  }, []);

  console.log(backendData);

  const details = [
    {
    //   label: "First Name",
      content: backendData.firstname,
    },
    {
    //   label: "Last Name",
      content: backendData.lastname,
    },
    {
    //   label: "Username",
      content: backendData.username,
    },
    {
      label: "Introduction",
      content: backendData.intro,
    },
    {
      label: "Profession",
      content: backendData.profession,
    },
    {
      label: "Bio",
      content: backendData.bio,
    },
  ];

  const [wantEdit, setWantEdit] = useState(false);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen w-full">
      <div className="relative md:grid md:grid-cols-3 min-h-screen border-2 rounded-tl-[50rem] bg-white">
        <div className=" flex flex-col justify-center items-center gap-10 pt-20">
          <img
            src={USER_LOGO}
            alt=""
            className="shadow-lg shadow-black max-h-[20rem] max-w-[20rem] rounded bg-white"
          />
          <div className="flex flex-col gap-4 text-xl">
            <div className="relative flex ps-6">
              <div className="absolute top-0 left-0 shadow-md shadow-black border-2 bg-blue-800 rounded-full p-2 text-white">
                <FiLinkedin size={30} />
              </div>
              <input
                type="text"
                className="border-2 my-1 p-1 ps-8 rounded-xl focus:outline-none border-blue-800 text-blue-800"
                value="http://localhost:3000"
              />
            </div>
            <div className="relative flex ps-6">
              <div className="absolute top-0 left-0 shadow-md shadow-black border-2 bg-blue-400 rounded-full p-2 text-white">
                <FiTwitter size={30} />
              </div>
              <input
                type="text"
                className="border-2 my-1 p-1 ps-8 rounded-xl focus:outline-none border-blue-400 text-blue-400"
                value="http://localhost:3000"
              />
            </div>
            <div className="relative flex ps-6">
              <div className="absolute top-0 left-0 shadow-md shadow-black border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-2 text-white">
                <FiInstagram size={30} />
              </div>
              <input
                type="text"
                className="border-2 my-1 p-1 ps-8 rounded-xl focus:outline-none border-pink-500 text-pink-500"
                value="http://localhost:3000"
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-2  sm:p-10 p-5">
          {/* <div className="flex justify-between items-center text-7xl font-bold p-10">
            <div />
            <div className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text">
              Profile
            </div>
            {wantEdit ? (
              <RxCross1 
                className="text-xl"
                onClick={() => setWantEdit(false)}
              />
            ) : (
              <BsPencilSquare
                className="text-xl"
                onClick={() => setWantEdit(true)}
              />
            )}
          </div> */}
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-2 text-lg">
              {details.map((item, i) => {
                return (
                  <>
                    {item.content && (
                      <div key={i} className="">
                        <div className="font-bold">{item.label}</div>
                        <div className="col-span-3">
                          {!wantEdit ? (
                            <div>{item.content}</div>
                          ) : (
                            <div>
                              <input
                                type="text"
                                name=""
                                className="w-full focus:outline-none border-2 border-black px-4 rounded-lg p-1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_Profile;
