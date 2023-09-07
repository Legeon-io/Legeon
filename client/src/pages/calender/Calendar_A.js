import { Calendar, MapPin, Plus } from "lucide-react";
import React, { useState } from "react";
import TimezoneSelect from "react-timezone-select";

const Calendar_A = () => {
  const [formData, setFormData] = useState({
    selectedTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    bookingPeriod: "",
  });
  console.log(formData);

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="w-full flex flex-col sm:gap-10 gap-5">
      <div className=" text-2xl p-2">Calendar Configuration</div>
      <div className="flex flex-col gap-5 sm:px-10 px-2">
        <div className="flex lg:flex-row flex-col justify-between lg:gap-10 gap-2">
          <div className="flex gap-0 items-center ">
            <MapPin />
            <span>TimeZone</span>
          </div>
          <TimezoneSelect
            value={formData.selectedTimezone}
            onChange={(value) => handleFormChange("selectedTimezone", value)}
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-2 justify-between w-full">
          <div className="flex gap-0 items-center">
            <Calendar />
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
      <div className=" text-2xl p-2">Calendar</div>
      <div className="sm:px-10 px-3">
        <button className="w-[15rem] p-2 flex gap-2 border-2 rounded-3xl items-center justify-center bg-gray-200">
          <Plus />
          <span>Add Calendar Account</span>
        </button>
      </div>
    </div>
  );
};

export default Calendar_A;
