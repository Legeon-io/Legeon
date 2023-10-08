import { AiOutlineCalendar, AiOutlinePlusCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

import React, { useEffect, useState } from "react";
import TimezoneSelect from "react-timezone-select";
import Cookies from "js-cookie";

const CalendarAvailability = () => {
  const [data, setData] = useState([]);
  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/calender/calender-token`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (response) {
          console.log(response.data);
          setData([...data, response.data]);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const [formData, setFormData] = useState({
    selectedTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    bookingPeriod: "",
  });

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleRemoveCalender = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/calender/calender-token`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col sm:gap-10 gap-5">
      <div className=" text-2xl p-2">Calendar Configuration</div>
      <div className="flex flex-col gap-5 sm:px-10 px-2">
        <div className="flex lg:flex-row flex-col justify-between lg:gap-10 gap-2">
          <div className="flex gap-0 items-center ">
            <FiMapPin />
            <span>TimeZone</span>
          </div>
          <TimezoneSelect
            value={formData.selectedTimezone}
            onChange={(value) => handleFormChange("selectedTimezone", value)}
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-2 justify-between w-full">
          <div className="flex gap-0 items-center">
            <AiOutlineCalendar />
            <span>Booking Period</span>
          </div>
          <div className="">
            <select
              className="border-2 border-gray-500 p-2 focus:outline-none lg:w-[27rem] w-full rounded "
              value={formData.bookingPeriod}
              onChange={(e) =>
                handleFormChange("bookingPeriod", e.target.value)
              }
            >
              <option value="">Select Option</option>
              <option value="oneweek">1 Week</option>
              <option value="twoweek">2 Weeks</option>
              <option value="threeweek">3 Weeks</option>
              <option value="fourweek">4 Weeks</option>
              <option value="twomonth">2 Months</option>
              <option value="threemoth">3 Months</option>
              <option value="fourmonth">4 Months</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className=" text-2xl p-2">Calendar</div>
        {!data[0] ? (
          <div className="sm:px-10 px-3">
            <button
              onClick={() => {
                window.open(
                  `${process.env.REACT_APP_API_URL}/api/calender`,
                  "_self"
                );
              }}
              className="w-[15rem] p-2 flex gap-2 border-2 rounded-3xl items-center justify-center bg-gray-200"
            >
              <AiOutlinePlusCircle />
              <span>Connect Calendar Account</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-between w-1/2">
            <div className="flex gap-2 items-center">
              <img src="icons/googleCalendarIcon.svg" width={50} />
              <div>
                <h1 className="font-bold">Google Calendar</h1>
                <h1>{data[0].scope}</h1>
              </div>
            </div>

            <div className="relative flex flex-col items-center">
              <button
                onClick={() => {
                  setShowOption(!showOption);
                }}
                className="bg-gray-200 px-1 py-3 rounded-full hover:bg-gray-300  duration-300"
              >
                <BsThreeDotsVertical />
              </button>
              <button
                onClick={() => handleRemoveCalender()}
                className={`${
                  showOption ? "opacity-100 visible" : "opacity-0 invisible"
                } absolute bg-white hover:bg-gray-100 duration-300 translate-y-12 translate-x-8  shadow-lg px-2 py-2 rounded-lg`}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarAvailability;
