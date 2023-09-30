import Cookie from "js-cookie";
import logo from "../../../assets/logo.png";
import axios from "axios";
import { useEffect, useState } from "react";
export const ProfileDetails = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profiles/getprofile`, {
        headers: {
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    //removed translate-x-10 md:translate-x-0 md:-translate-y-8
    <div className="flex flex-col md:flex-row md:justify-center row-span-5 gap-y-5 mt-10 md:mt-0 md:mb-20  md:gap-x-10 items-center  ">
      <div className="flex flex-col items-center md:p-10 ">
        <img
          src={logo}
          alt="user image"
          className="h-20 w-20 md:h-44 md:w-44 rounded-full"
        />
        <div className="ml-4  text-center md:ml-0">
          <h2 className="text-lg md:text-2xl font-semibold">
            {data[0]?.firstname} {data[0]?.lastname}
          </h2>
          {data[0]?.data[0]?.profession && (
            <p className="text-sm text-gray-600 md:text-lg">
              {data[0]?.data[0].profession}
            </p>
          )}
        </div>
      </div>
      <div className="bg-gray-50 text-black w-full md:w-6/12 p-6 lg:text-lg rounded-lg drop-shadow-xl">
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
            First Name
          </h2>
          <p className="md:w-3/4 px-3 py-2 text-gray-600">
            {data[0]?.firstname}
          </p>
        </div>
        {data[0]?.lastname && (
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
              Last Name
            </h2>
            <p className="md:w-3/4 px-3 py-2 text-gray-600">
              {data[0]?.lastname}
            </p>
          </div>
        )}
        <div className="mb-4 flex flex-col md:flex-row md:items-center">
          <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
            Username
          </h2>
          <p className="md:w-3/4 px-3 py-2 text-gray-600">
            {data[0]?.username}
          </p>
        </div>
        {data[0]?.data[0]?.introduction && (
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
              Introduction
            </h2>
            <p className="md:w-3/4 px-3 py-2 text-gray-600">
              {data[0]?.data[0].introduction}
            </p>
          </div>
        )}
        {data[0]?.data[0]?.bio && (
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <h2 className="text-sm font-semibold text-gray-600 md:w-1/4">
              Bio
            </h2>
            <p className="md:w-3/4 px-3 py-2 text-gray-600">
              {data[0]?.data[0].bio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
