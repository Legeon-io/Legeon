import { Minus, Plus, PlusCircle } from "lucide-react";
import React, { useState } from "react";

const Schedule = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeOptions = [];
  for (let hour = 1; hour <= 12; hour++) {
    const hourString = hour.toString().padStart(2, "0");
    timeOptions.push(`${hourString}:00`);
    timeOptions.push(`${hourString}:30`);
    timeOptions.push(`${hourString}:00`);
    timeOptions.push(`${hourString}:30`);
  }

  const [selectedSchedules, setSelectedSchedules] = useState({});
  const [error, setError] = useState(false);

  const handleScheduleChange = (day, field, value) => {
    setSelectedSchedules((prevSchedules) => ({
      ...prevSchedules,
      [day]: {
        ...prevSchedules[day],
        [field]: value,
      },
    }));
  };

  const addTimeSlot = (day, fromTime, fromPeriod, toTime, toPeriod) => {
    if(day && fromPeriod && fromTime && toTime && toPeriod){
      setSelectedSchedules((prevSchedules) => ({
        ...prevSchedules,
        [day]: {
          ...prevSchedules[day],
          timeSlots: [
            ...(prevSchedules[day]?.timeSlots || []),
            {
              fromTime,
              fromPeriod,
              toTime,
              toPeriod,
            },
          ],
        },
      }));
    }
    console.log(selectedSchedules);
  };

  return (
    <div className="grid 2xl:grid-cols-5 grid-cols-1 p-5 h-full gap-5 text-lg">
      {/* Left Side */}
      <div className="flex flex-col gap-5 border-2 py-5 col-span-4">
        <div className="flex justify-end px-8">
          <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-2 w-[8rem] rounded-3xl">
            Save
          </button>
        </div>
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="flex xs:flex-row flex-col justify-between xs:items-center lg:px-10 px-5 xs:pl-5"
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                className=""
                onChange={(e) =>
                  handleScheduleChange(day, "checked", e.target.checked)
                }
                checked={selectedSchedules[day]?.checked || false}
              />
              <label htmlFor="">{day}</label>
            </div>
            <div className="flex items-center">
              {selectedSchedules[day]?.checked ? (
                <>
                  <div className="p-2 focus:outline-none rounded flex lg:flex-row flex-col items-center gap-2">
                    <div className="flex gap-1">
                      <select
                        placeholder="from"
                        className="border-2 border-gray-500 p-2 w-[6rem] focus:outline-none rounded"
                        onChange={(e) =>
                          handleScheduleChange(day, "fromTime", e.target.value)
                        }
                        value={selectedSchedules[day]?.fromTime || ""}
                      >
                        <option value="">From</option>
                        {timeOptions.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-1">
                      <select
                        className="border-2 border-gray-500 p-2 w-[6rem] focus:outline-none rounded"
                        onChange={(e) =>
                          handleScheduleChange(
                            day,
                            "fromPeriod",
                            e.target.value
                          )
                        }
                        value={selectedSchedules[day]?.fromPeriod || ""}
                      >
                        <option value="">Period</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <div className="lg:flex hidden">
                      <Minus />
                    </div>
                    <div className="flex gap-1">
                      <select
                        className="border-2 border-gray-500 p-2 w-[6rem] focus:outline-none rounded"
                        onChange={(e) =>
                          handleScheduleChange(day, "toTime", e.target.value)
                        }
                        value={selectedSchedules[day]?.toTime || ""}
                      >
                        <option value="">Till</option>
                        {timeOptions.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-1">
                      <select
                        className="border-2 border-gray-500 p-2 focus:outline-none rounded"
                        onChange={(e) =>
                          handleScheduleChange(day, "toPeriod", e.target.value)
                        }
                        value={selectedSchedules[day]?.toPeriod || ""}
                      >
                        <option value="">Period</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      addTimeSlot(
                        day,
                        selectedSchedules[day]?.fromTime || "",
                        selectedSchedules[day]?.fromPeriod || "",
                        selectedSchedules[day]?.toTime || "",
                        selectedSchedules[day]?.toPeriod || ""
                      )
                    }
                  >
                    <PlusCircle size={30} />
                  </button>
                </>
              ) : (
                <div className="text-gray-400">Unavailable</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Right Side */}
      <div className="border-2">
        <div className="text-center font-bold text-2xl">Available Slot</div>
        {daysOfWeek &&
          daysOfWeek.map(
            (day, index) =>
              selectedSchedules[day]?.checked && (
                <div
                  key={index}
                  className="flex flex-col text-center xs:text-base text-[10px]"
                >
                  <div className="flex flex-col items-center justify-center">
                    {day},
                    {selectedSchedules[day]?.timeSlots &&
                      selectedSchedules[day]?.timeSlots.map(
                        (slot, slotIndex) => (
                          <div className="flex" key={slotIndex}>
                            {slot.fromTime} {slot.fromPeriod} - {slot.toTime}{" "}
                            {slot.toPeriod}
                            {","}
                          </div>
                        )
                      )}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Schedule;
