import React, { useEffect, useState } from "react";
import USER_LOGO from "../../assets/user.jpg";
import Cookie from "js-cookie";
import "./Profile.css";

// React Icons
import { BsPencilSquare, BsQuestionCircle, BsTicket } from "react-icons/bs";
import {
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiInstagram,
  FiFacebook,
  FiCopy,
} from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
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
import { useDispatch, useSelector } from "react-redux";
import { handleGetProfileAction } from "../../redux/profilePage/profilePageAction";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const Profile = () => {
  const loading = useSelector((state) => state.profilePageStore.loading);
  const dispatch = useDispatch();
  const dataStore = useSelector((state) => state.profilePageStore.data);
  const [copy, setCopy] = useState(false);
  const handleCopy = () => {
    setCopy(true);
    setInterval(() => {
      setCopy(false);
    }, 5000);
  };

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
    if (dataStore) {
      const { firstname, lastname, username, data } = dataStore;
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
    }
  }, [dataStore]);

  useEffect(() => {
    dispatch(handleGetProfileAction());
  }, []);

  const [toggleButton, setToggleButton] = useState(true);
  const [wantEditHeading, setWantEditHeading] = useState(false);
  const [addLink, setAddLink] = useState(false);

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
      {loading ? (
        <>
          <div
            role="status"
            className="flex justify-center items-center pt-[10rem]"
          >
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 mr-2 text-gray-200 animate-spin  fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="">Loading...</span>
          </div>
        </>
      ) : (
        <>
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
                              axios.put(
                                "http://localhost:8080/api/profiles/putprofile",
                                result,
                                {
                                  headers: {
                                    Authorization: `Bearer ${Cookies.get(
                                      "token"
                                    )}`,
                                  },
                                }
                              );
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
                          <Link to={`/serviceHub/${backendData.username}`}>
                            {backendData.username}
                          </Link>
                          <CopyToClipboard
                            text={`http://localhost:3000/serviceHub/${backendData.username}`}
                          >
                            {copy ? (
                              <TiTick size={20} className="cursor-pointer" />
                            ) : (
                              <FiCopy
                                className="cursor-pointer"
                                onClick={handleCopy}
                              />
                            )}
                          </CopyToClipboard>
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
                                  Authorization: `Bearer ${Cookie.get(
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
                          setWantEditHeading(false);
                        }}
                      >
                        {({values}) => (
                          <Form className="grid grid-cols-2">
                            <div className="flex flex-col gap-3">
                              <div className="flex gap-5">
                                <Input
                                inputValue={values}
                                  id="firstname"
                                  type="text"
                                  name="firstname"
                                  label="First Name"
                                />
                                <Input
                                inputValue={values}
                                  id="lastname"
                                  type="text"
                                  name="lastname"
                                  label="Last Name"
                                />
                              </div>
                              <Input
                              inputValue={values}
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
                {toggleButton ? (
                  <AboutMe backendData={backendData} />
                ) : (
                  <Account />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
