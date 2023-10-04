import React, { useState } from "react";
import Schedule from "./Schedule";
import Calendar from "./Calendar";
import "./calender.css";

const Availability = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div>
        <div className="min-h-screen lg:p-5 p-3">
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-purple-500">
              Availability
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => setToggle(false)}
                className={`${
                  !toggle
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    : "border-2 border-indigo-500 text-indigo-500"
                } w-[10rem] p-2 text-center rounded-3xl`}
              >
                Schedule
              </button>
              <button
                onClick={() => setToggle(true)}
                className={`${
                  toggle
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    : "border-2 border-indigo-500 text-indigo-500"
                } w-[10rem] p-2 text-center rounded-3xl`}
              >
                Calendar
              </button>
            </div>
            <hr className="border-2 border-gray-200 h-[1px] w-full" />
          </div>
          {toggle ? <Calendar /> : <Schedule />}
        </div>
      </div>
    </>
  );
};

export default Availability;
