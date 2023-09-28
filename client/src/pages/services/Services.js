import React from "react";
import "./Services.css";
import "../index.css";
import { useState } from "react";
import sample from "../../assets/img-empty-state-video.svg";
import PlaceHolderServices from "./PlaceHolderServices";
import CreateService from "./createService/CreateService";
import CreateMessageService from "./createService/CreateMessageService";
import ServiceFull from "./ServiceFull";
export const Services = ({ sidebarVisible }) => {
  const [pageState, setPageState] = useState(0);
  const [service, createService] = useState(false);
  const [serviceEmpty, setServiceEmpty] = useState(true);

  function buttonSubmit(number) {
    setPageState(number);
  }

  let content;
  if (pageState === 0 && service === false && serviceEmpty === true) {
    content = (
      <PlaceHolderServices
        img={sample}
        title={"Create a 1:1 service "}
        discription={
          "Use legeon's simple and easy way to create a 1:1 communication with your mentor"
        }
      />
    );
  } else if (pageState === 1 && service === false && serviceEmpty === true) {
    content = (
      <PlaceHolderServices
        img={sample}
        title={"Create a dm service"}
        discription={
          "Create personal dm's using legeon's dm service and interact with your people"
        }
      />
    );
  } else if (pageState === 0 && service === true) {
    content = <CreateService />;
  } else if (pageState === 0 && service === false && serviceEmpty === false) {
    content = <ServiceFull />;
  } else {
    content = <CreateMessageService />;
  }

  return (
    <div className="grid grid-cols-7 h-screen">
      <div className="col-span-6 grid grid-rows-6">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl mt-5 mx-5 md:ml-10">Services</h1>
          <div className="flex flex-row items-center gap-x-4 md:justify-between mx-5 md:mx-10 mt-3">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row gap-4 md:gap1-10 mt-3">
                <button
                  className={`border-2 border-black md:px-10 p-2 text-center rounded-3xl ${
                    pageState === 0
                      ? "bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white border-none"
                      : ""
                  } `}
                  onClick={() => {
                    buttonSubmit(0);
                  }}
                >
                  1:1 services
                </button>
                <button
                  className={`border-2 border-black md:px-10 p-2 text-center rounded-3xl ${
                    pageState === 1
                      ? "bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-white border-none"
                      : ""
                  } `}
                  to="/profile/editProfile"
                  onClick={() => {
                    buttonSubmit(1);
                  }}
                >
                  Messages
                </button>
              </div>
              <button
                className=" px-1 py-2   border-black border-2 rounded-md"
                onClick={() => {
                  createService(!service);
                }}
              >
                create Services
              </button>
            </div>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Services;
