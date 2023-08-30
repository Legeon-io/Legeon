import React from "react";
import "./Dashboard.css";
import "../index.css";
import image1 from "../../assets/job_interview_illustration_1.png";
import logo from "../../assets/logo1.png";
import background from "../../assets/rectangle.png";
import divImage from "../../assets/divoneimage.png";
import communication from "../../assets/peopleCommunicating.png";
import handshake from "../../assets/handshake.png";
import divthreeimage from "../../assets/divthreeimage.png";
import "./Dashboard.css";
const Dashboard = ({ sidebarVisible }) => {
  return (
    <>
      <div id="maindiv" className="w-full  ">
        <div className="flex gap-10 m-16 mb-0">
          <img
            alt="workers working together "
            src={image1}
            className="w-1/2"
          ></img>
          <div className="flex justify-center items-center flex-col gap-5">
            <div className=" flex justify-start">
              <h1 className="text-9xl  bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold  ">
                LEGE
              </h1>
              <img
                src={logo}
                className="rounded-full h-32 shadow-sm shadow-black "
                alt="logo of legeon"
              />
              <h1 className="text-9xl bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold">
                N
              </h1>
            </div>
            <div className="text-3xl font-semibold  ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </div>
            <button className="bg-gradient-to-r to-pink-500 from-indigo-500  via-purple-500 text-white py-4  px-10 shadow-md  rounded-2xl hover:opacity-80  duration-300">
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className="bg-custom-blue h-full w-full p-10   ">
        <div className=" flex">
          <div className=" flex flex-col gap-10">
            <div>
              <h1 className="text-6xl text-white border-l-[0.5rem] pl-4 border-l-white">
                Revenue Stream
              </h1>
            </div>
            <div className="flex justify-between gap-10">
              <p className="text-2xl text-justify text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
              <img
                src={divImage}
                className="shadow-xl rounded-2xl"
                alt="girl working with calender"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-20   justify-between ">
        <div className="bg-gray-200  flex flex-col  w-1/4  rounded-xl p-10  ">
          <img src={communication} alt="people communicating with each other" />
          <h1 className="text-4xl">Lorem ipsum</h1>
          <p className="text-start">
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua lorem ipsum dolor sit amet,
            consectetur
          </p>
          <div className="flex w-full flex-row-reverse   ">
            <button className="bg-gradient-to-r to-pink-500  from-indigo-500 via-purple-500  p-2 text-white rounded-2xl">
              Know more
            </button>
          </div>
        </div>

        <div className=" flex    justify-center  items-center ml-10  ">
          <div className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text   font-semibold  text-8xl ">
            Make robust
            <br /> connections
          </div>
        </div>
      </div>
      <div className="flex m-20   justify-between flex-row-reverse ">
        <div className="bg-gray-200  flex flex-col  w-1/4  rounded-xl p-10  ">
          <img src={handshake} alt="people communicating with each other" />
          <h1 className="text-4xl">Lorem ipsum</h1>
          <p className="text-start">
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua lorem ipsum dolor sit amet,
            consectetur
          </p>
          <div className="flex w-full flex-row-reverse   ">
            <button className="bg-gradient-to-r to-pink-500  from-indigo-500 via-purple-500  p-2 text-white rounded-2xl">
              Know more
            </button>
          </div>
        </div>

        <div className=" flex    justify-center  items-center ml-10  ">
          <div className="bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 text-transparent bg-clip-text   font-semibold  text-8xl ">
            Be the mentor <br /> and the mentee <br /> at the same time
          </div>
        </div>
      </div>
      <div className="bg-custom-orange h-full w-full p-10    ">
        <div className=" flex  gap-10">
          <img
            src={divthreeimage}
            className="shadow-xl rounded-2xl"
            alt="girl working with calender"
          />

          <div className=" flex flex-col gap-10">
            <div>
              <h1 className="text-6xl borderl text-white border-l-[0.5rem] pl-4 border-l-white">
                Your Network Is The Network You Build
              </h1>
            </div>
            <p className="text-2xl  text-white text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </p>
            <button className=" bg-gradient-to-r to-pink-500  from-indigo-500 via-purple-500  p-3 rounded-xl w-40 text-white shadow-md hover:opacity-80  duration-300">
              Join now
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-gray-200 h-56 flex justify-center items-center">
        FOOTER
      </footer>
    </>
  );
};

export default Dashboard;
