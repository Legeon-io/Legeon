import React, { useEffect } from "react";
import "./Services.css";
import "../index.css";
import { useState } from "react";
import sample from "../../assets/img-empty-state-video.svg";
import PlaceHolderServices from "./PlaceHolderServices";
import CreateService from "./createService/CreateService";
import CreateMessageService from "./createService/CreateMessageService";
import { ServiceList } from "./ServiceList";
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

  const loading = false;
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
        <>
          <div
            role="status"
            className="flex justify-center items-center pt-[10rem]"
          >
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 mr-2 text-white animate-spin  fill-violet-600"
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
            <span className="text-xl">Loading...</span>
          </div>
        </>
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
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
