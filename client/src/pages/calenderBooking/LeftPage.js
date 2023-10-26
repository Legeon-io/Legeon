import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimezoneSelect from "react-timezone-select";
import "./styles.css";
import { availabilityData } from "./data";

const LeftPage = ({ pickDate, setPickDate, pickTime, setPickTime }) => {
  //-----------------------Time
  const genrateTimeSlot = () => {
    let newTimeSlot = [];
    for (let hour = 1; hour <= 12; hour++) {
      let formatHour = hour.toString().padStart(2, "0");
      newTimeSlot.push(`${formatHour}:00 AM`);
    }
    for (let hour = 1; hour <= 12; hour++) {
      let formatHour = hour.toString().padStart(2, "0");
      newTimeSlot.push(`${formatHour}:00 PM`);
    }
    return newTimeSlot;
  };
  const timeSlot = useMemo(() => genrateTimeSlot(), []);
  const handlePickTime = (time) => {
    setPickTime(time);
  };

  // ----------------------Date

  const availableDate = new Date();
  availableDate.setDate(availableDate.getDate() + 14); // Set it to 14 days from the current date

  const isDateAvailable = (date) => {
    const currentDate = new Date();
    const endDate = new Date(availableDate);

    const dayOfWeek = date.getDay();
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;

    return (
      date >= currentDate &&
      date <= endDate &&
      availabilityData[adjustedDay - 1].selected
    );
  };

  const tileClassName = ({ date }) => {
    const currentDate = new Date();
    if (date < currentDate || !isDateAvailable(date)) {
      return "unavailable";
    }
    return "available";
  };

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    return date < currentDate || !isDateAvailable(date);
  };

  return (
    <div className="flex justify-between gap-10 p-5">
      {/* Pick a Date */}
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-bold">
          Pick a Date
        </label>
        <div>
          <Calendar
            onChange={setPickDate}
            value={pickDate}
            minDate={new Date()}
            tileDisabled={({ date }) => !isDateAvailable(date)}
            tileClassName={(data) => {
              if (data.date.toDateString() === pickDate.toDateString()) {
                return "selected";
              }
              return tileClassName(data);
            }}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className=" p-2 h-2 w-2 bg-green-500" />
            Selected
          </div>
          <div className="flex items-center gap-2">
            <span className=" p-2 h-2 w-2 bg-blue-500" />
            Available
          </div>
          <div className="flex items-center gap-2">
            <span className=" p-2 h-2 w-2 bg-gray-200" />
            Not-Available
          </div>
        </div>
      </div>
      {/* Pick a Time */}
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-bold">
          Pick a Time
        </label>
        <div className="grid grid-cols-4 gap-2">
          {timeSlot.map((hr, i) => (
            <div
              className={`${
                pickTime === hr
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100"
              } border-2 border-black w-[6rem] flex justify-center items-center rounded-xl p-2 cursor-pointer`}
              key={i}
              onClick={() => handlePickTime(hr)}
            >
              {hr}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftPage;
