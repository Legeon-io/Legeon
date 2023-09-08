import { Minus } from "lucide-react";
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
  }

  const [selectedSchedules, setSelectedSchedules] = useState({});

  console.log(selectedSchedules);

  const handleScheduleChange = (day, field, value) => {
    setSelectedSchedules((prevSchedules) => ({
      ...prevSchedules,
      [day]: {
        ...prevSchedules[day],
        [field]: value,
      },
    }));
  };

  const calculateHours = (fromTime, fromPeriod, toTime, toPeriod) => {
    if (fromTime && fromPeriod && toTime && toPeriod) {
      let fromHours = parseInt(fromTime.split(":")[0]);
      let toHours = parseInt(toTime.split(":")[0]);
      let fromMinutes = parseInt(fromTime.split(":")[1]);
      let toMinutes = parseInt(toTime.split(":")[1]);

      if (fromPeriod === "PM" && fromHours !== 12) {
        fromHours += 12;
      }
      if (toPeriod === "PM" && toHours !== 12) {
        toHours += 12;
      }

      let hoursDifference = toHours - fromHours;
      let minutesDifference = toMinutes - fromMinutes;

      if (minutesDifference < 0) {
        hoursDifference -= 1;
        minutesDifference += 60;
      }

      let totalHours = hoursDifference + minutesDifference / 60;

      if (totalHours < 0) {
        totalHours += 24;
      }

      return totalHours;
    }

    return 0;
  };

  return (
    <div className="grid grid-cols-2 p-5 h-full gap-5">
      {/* Left Side */}
      <div className="flex flex-col gap-5 border-2 py-5">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="flex justify-between items-center px-10">
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
            {selectedSchedules[day]?.checked && (
              <div className="flex gap-2 items-center">
                <div className="flex gap-1">
                  <select
                    className="border-2 border-gray-500 p-2 w-[5rem] focus:outline-none rounded"
                    onChange={(e) =>
                      handleScheduleChange(day, "fromTime", e.target.value)
                    }
                    value={selectedSchedules[day]?.fromTime || ""}
                  >
                    <option value="">From </option>
                    {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border-2 border-gray-500 p-2 focus:outline-none rounded"
                    onChange={(e) =>
                      handleScheduleChange(day, "fromPeriod", e.target.value)
                    }
                    value={selectedSchedules[day]?.fromPeriod || ""}
                  >
                    <option value="">Period</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
                <div>
                  <Minus />
                </div>
                <div className="flex gap-1">
                  <select
                    className="border-2 border-gray-500 p-2 w-[5rem] focus:outline-none rounded"
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
            )}
          </div>
        ))}
      </div>
      {/* Right Side */}
      <div className="border-2">
        <div className="grid grid-cols-4 text-center font-bold text-lg bg-black text-white">
          <div className="">Day</div>
          <div className="">From</div>
          <div className="">To</div>
          <div className="">Hours</div>
        </div>
        {daysOfWeek.map(
          (day, index) =>
            selectedSchedules[day]?.checked && (
              <div key={index} className="grid grid-cols-4 text-center">
                <div className="">{day}</div>
                <div className="">
                  {selectedSchedules[day]?.fromTime || "-"}
                  {selectedSchedules[day]?.fromPeriod || "-"}
                </div>
                <div className="">
                  {selectedSchedules[day]?.toTime || "-"}
                  {selectedSchedules[day]?.toPeriod || "-"}
                </div>
                <div className="">
                  {calculateHours(
                    selectedSchedules[day]?.fromTime,
                    selectedSchedules[day]?.fromPeriod,
                    selectedSchedules[day]?.toTime,
                    selectedSchedules[day]?.toPeriod
                  )}
                  hrs
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Schedule;
