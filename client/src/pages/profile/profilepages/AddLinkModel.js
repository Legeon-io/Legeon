import axios from "axios";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import * as Yup from "yup"
import Input from "../../../components/helper/Input";

const AddLinkModel = ({ setAddLink, backendData }) => {
  const allSocials = [
    {
      id: "linkedin",
      icon: <FiLinkedin />,
      color: "bg-blue-700",
      input: "text-blue-700 border-blue-700",
      label: "LinkedIn",
    },
    {
      id: "twitter",
      icon: <FiTwitter />,
      color: "bg-blue-400 text-blue-400 border-blue-400",
      input: "text-blue-400 border-blue-400",
      label: "Twitter",
    },
    {
      id: "youtube",
      icon: <FiYoutube />,
      color: "bg-red-700",
      input: "text-red-700 border-red-700",
      label: "Youtube",
    },
    {
      id: "instagram",
      icon: <FiInstagram />,
      color: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      input: "text-indigo-500 border-indigo-500",
      label: "Instagram",
    },
    {
      id: "facebook",
      icon: <FiFacebook />,
      color: "bg-blue-600",
      input: "text-blue-700 border-blue-700",
      label: "Facebook",
    },
  ];
  const validationSchema = Yup.object({
    href: Yup.string()
      .required("Please enter a URL.")
      .url("Please enter a valid URL."),
  });

  const [selectSocial, setSelectSocial] = useState(allSocials[0]);

  const handleSocialClick = (data) => {
    const selectedItem = backendData.link.find((item) => item.id === data.id);

    if (!selectedItem) {
      setSelectSocial(data);
    }
  };
  console.log(selectSocial);

  return (
    <>
      <Formik
        initialValues={{
          href: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const linkItem = {
            href: values.href,
            id: selectSocial.id,
          };
          backendData.link.push(linkItem);
          axios
            .put("http://localhost:8080/api/profiles/putprofile", backendData, {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            })
            .then((res) => {
              toast.success("Profile Updated Successfully");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Username Taken");
            });
          setAddLink(false);
        }}
      >
        {() => (
          <Form>
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-white bg-opacity-80 transition-opacity select-none">
              <div className="relative w-[25rem] h-[20rem] mx-2 flex flex-col justify-between bg-white border-2 border-black rounded-2xl">
                <div className="absolute -top-10 right-0">
                  <RxCross1 size={30} onClick={() => setAddLink(false)} />
                </div>
                <div className="sm:text-2xl bg-black text-white text-center py-2 font-bold rounded-tr-xl rounded-tl-xl">
                  Social Network
                </div>
                <div className="space-y-2 p-2 scroll">
                  {allSocials.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSocialClick(item)}
                      className={`flex items-center gap-2 w-full ${
                        item.id === selectSocial.id
                          ? "bg-gray-200 rounded p-1"
                          : ""
                      }`}
                    >
                      <div
                        className={`${item.color} border-2 text-white sm:text-3xl text-2xl rounded-full p-2`}
                      >
                        {item.icon}
                      </div>
                      <div className="sm:text-2xl text-lg">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-2 px-4">
                  <Input
                    name="href"
                    type="text"
                    className="w-full p-1 border-2 focus:outline-none"
                    placeholder={`Add ${selectSocial.label} URL here...`}
                  />
                  <button
                    type="submit"
                    className="w-32 p-2 bg-blue-700 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddLinkModel;
