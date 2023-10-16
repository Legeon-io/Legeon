import React, { useEffect, useState } from "react";
import USER_LOGO from "../../assets/user.jpg";
import Cookie from "js-cookie";
import "./Profile.css";

// React Icons
import { BsPencilSquare, BsQuestionCircle } from "react-icons/bs";
import {
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import Input from "../../components/helper/Input";
import { Form, Formik } from "formik";
import AboutMe from "./profilepages/AboutMe";
import Account from "./profilepages/Account";
import AddLinkModel from "./profilepages/AddLinkModel";
import Cookies from "js-cookie";

const Profile = () => {
  const [backendData, setBackendData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    profession: "",
    intro: "",
    bio: "",
    language: "",
    link: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/profiles/getprofile", {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data[0]);
        const { firstname, lastname, username, data, link } = res.data[0];
        const userProfileData = data[0] || {};
        setBackendData({
          firstname: firstname,
          lastname: lastname,
          username: username,
          profession: userProfileData.profession || "",
          intro: userProfileData.introduction || "",
          bio: userProfileData.bio || "",
          link: userProfileData.link || [],
          language: userProfileData.language || "English",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch profile data");
      });
  }, []);

  const [toggleButton, setToggleButton] = useState(true);
  const [wantEditHeading, setWantEditHeading] = useState(false);
  const [addLink, setAddLink] = useState(false);
  console.log(backendData);

  const getSocialsItem = (id) => {
    switch (id) {
      case "linkedin":
        return {
          icon: <FiLinkedin />,
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
          color: "bg-blue-600",
          input: "text-blue-700 border-blue-700",
          label: "Facebook",
        };
      default:
        return null;
    }
  };

  return (
    <>
      {addLink && (
        <AddLinkModel setAddLink={setAddLink} backendData={backendData} />
      )}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-full overflow-hidden">
        <div className="relative xl:grid xl:grid-cols-3 min-h-screen border-2 rounded-tl-[50rem] bg-white sm:p-10 p-2">
          <div className=" flex flex-col gap-10">
            <img
              src={USER_LOGO}
              alt=""
              className="shadow-lg shadow-black max-h-[15rem] max-w-[15rem] rounded bg-white mx-auto"
            />
            <div className="flex flex-col sm:items-center gap-4 text-xl">
              {backendData.link.length > 0 &&
                backendData.link.map((item, i) => {
                  const social = getSocialsItem(item.id);
                  return (
                    <div key={i} className="relative flex ps-6">
                      <RxCross2
                        onClick={() => {
                          const updatedLinks = [...backendData.link];
                          updatedLinks.splice(i, 1);
                          const result = {
                            ...backendData,
                            link: updatedLinks,
                          };
                          setBackendData(result);
                          axios
                            .put(
                              "http://localhost:8080/api/profiles/putprofile",
                              result,
                              {
                                headers: {
                                  Authorization: `Bearer ${Cookies.get(
                                    "token"
                                  )}`,
                                },
                              }
                            )
                            .then((res) => {
                              toast.success("Profile Updated Successfully");
                            })
                            .catch((err) => {
                              console.log(err);
                              toast.error("Username Taken");
                            });
                        }}
                        className="absolute top-3 -right-6 bg-gray-200 rounded-full cursor-pointer"
                      />
                      <div
                        className={`${social.color} absolute top-0 left-0 shadow-md shadow-black border-2 rounded-full p-2 text-white text-3xl`}
                      >
                        {social.icon}
                      </div>
                      <div
                        className={`${social.input} border-2 my-1 p-1 ps-8 rounded-xl focus:outline-none sm:w-[15rem] w-[12rem] overflow-hidden`}
                      >
                        {item.href}
                      </div>
                    </div>
                  );
                })}
              <div
                onClick={() => setAddLink(true)}
                className="flex gap-2 justify-center items-center cursor-pointer"
              >
                <AiOutlinePlus />
                Add Link
              </div>
            </div>
          </div>
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-5">
              {!wantEditHeading ? (
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 sm:text-5xl text-3xl">
                      {backendData.firstname} {backendData.lastname}
                    </div>
                    <div className="flex gap-2 items-center sm:text-xl">
                      {backendData.username}
                      <div className="relative group ">
                        <BsQuestionCircle className="cursor-pointer"/>
                        <div className="absolute top-5 right-0 rounded-2xl hidden group-hover:block p-2 border-2 border-gray-300 w-[10rem] h-[5rem] bg-gray-100 text-sm">
                          This is username which is going to be host
                        </div>
                      </div>
                    </div>
                  </div>
                  <HiOutlinePencil
                    className=" cursor-pointer"
                    size={30}
                    onClick={() => setWantEditHeading(true)}
                  />
                </div>
              ) : (
                <>
                  <Formik
                    initialValues={{
                      firstname: backendData.firstname,
                      lastname: backendData.lastname,
                      username: backendData.username,
                    }}
                    onSubmit={(values) => {
                      values = { ...backendData, ...values };
                      axios
                        .put(
                          "http://localhost:8080/api/profiles/putprofile",
                          values,
                          {
                            headers: {
                              Authorization: `Bearer ${Cookie.get("token")}`,
                            },
                          }
                        )
                        .then((res) => {
                          toast.success("Profile Updated Successfully");
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error("Username Taken");
                        });
                      setWantEditHeading(false);
                    }}
                  >
                    {() => (
                      <Form className="grid grid-cols-2">
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-5">
                            <Input
                              id="firstname"
                              type="text"
                              name="firstname"
                              label="First Name"
                            />
                            <Input
                              id="lastname"
                              type="text"
                              name="lastname"
                              label="Last Name"
                            />
                          </div>
                          <Input
                            id="username"
                            type="text"
                            name="username"
                            label="Username"
                          />
                        </div>
                        <div className="flex justify-between">
                          <div />
                          <div className="flex flex-col gap-5 items-center">
                            <RxCross1
                              size={30}
                              onClick={() => setWantEditHeading(false)}
                              className=" cursor-pointer"
                            />
                            <button
                              type="submit"
                              className="border-2 border-violet-500 w-[10rem] p-2 rounded-3xl flex items-center justify-center"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
              <div className="flex justify-between items-center text-xl sm:w-[20rem] cursor-pointer">
                <div
                  className={`${
                    toggleButton && "border-b-4"
                  } border-b-violet-700 w-[10rem] text-center p-1`}
                  onClick={() => setToggleButton(true)}
                >
                  About Me
                </div>
                <div
                  className={`${
                    !toggleButton && "border-b-4"
                  } border-b-violet-700 w-[10rem] text-center p-1`}
                  onClick={() => setToggleButton(false)}
                >
                  Account
                </div>
              </div>
            </div>
            {toggleButton ? <AboutMe backendData={backendData} /> : <Account />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
