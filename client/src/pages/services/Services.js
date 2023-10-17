import React, { useEffect } from "react";
import "./Services.css";
import "../index.css";
import { useState } from "react";
import sample from "../../assets/img-empty-state-video.svg";
import PlaceHolderServices from "./PlaceHolderServices";
import CreateService from "./createService/CreateService";
import CreateMessageService from "./createService/CreateMessageService";
import { ServiceList } from "./ServiceList";
import ServiceCards from "../../components/common/ServiceCards";
import Cookies from "js-cookie";
import axios from "axios";
export const Services = ({ sidebarVisible }) => {
  const [data, setData] = useState([]);
  //To get all routes
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/services/onetoonecall`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (response) setData(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const [pageState, setPageState] = useState(0);
  const [service, createService] = useState(false);
  const [serviceEmpty, setServiceEmpty] = useState(false);

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
    content = <ServiceList list={data} />;
  } else {
    content = <CreateMessageService />;
  }

  return (
    <>
      {loading ? (
        <div class="md:grid xl:grid-cols-3 md:grid-cols-2 items-center gap-10 w-full p-10">
          <div className="h-[20rem] w-full bg-gray-400 rounded-3xl animate-pulse" />
          <div className="hidden md:block h-[20rem] w-full bg-gray-400 rounded-3xl animate-pulse" />
          <div className="hidden xl:block h-[20rem] w-full bg-gray-400 rounded-3xl animate-pulse" />
          <span class="flex w-full items-center justify-center col-span-3 text-5xl text-gray-400 animate-pulse">
            Loading
            <p className="animate-bounce">.</p>
            <p className="animate-bounce">.</p>
            <p className="animate-bounce">.</p>
          </span>
        </div>
      ) : (
        <div>
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
                        buttonSubmit(2);
                      }}
                    >
                      create Services
                    </button>
                  </div>
                </div>
              </div>
              {pageState === 0 ? (
                <PlaceHolderServices
                  img={sample}
                  title={"Create a 1:1 service "}
                  discription={
                    "Use legeon's simple and easy way to create a 1:1 communication with your mentor"
                  }
                />
              ) : pageState === 1 ? (
                <PlaceHolderServices
                  img={sample}
                  title={"Create a dm service"}
                  discription={
                    "Create personal dm's using legeon's dm service and interact with your people"
                  }
                />
              ) : (
                <CreateService />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
