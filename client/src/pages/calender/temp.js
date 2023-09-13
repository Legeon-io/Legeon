import React, { useState } from "react";

const TempData = () => {
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
    timeOptions.push(`${hourString}:00 AM`);
    timeOptions.push(`${hourString}:30 AM`);
    timeOptions.push(`${hourString}:00 PM`);
    timeOptions.push(`${hourString}:30 PM`);
  }

  const [selectedSchedules, setSelectedSchedules] = useState({});

  const handleScheduleChange = (day, field, value) => {
    setSelectedSchedules((prevSchedules) => ({
      ...prevSchedules,
      [day]: {
        ...prevSchedules[day],
        [field]: value,
      },
    }));
  };

  const addTimeSlot = (day) => {
    setSelectedSchedules((prevSchedules) => ({
      ...prevSchedules,
      [day]: {
        ...prevSchedules[day],
        timeSlots: [...(prevSchedules[day]?.timeSlots || []), {}],
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {daysOfWeek.map((day) => (
        <div key={day} className="border p-4">
          <h2 className="text-lg font-semibold">{day}</h2>
          <input
            type="checkbox"
            onChange={(e) => handleScheduleChange(day, "checked", e.target.checked)}
            checked={selectedSchedules[day]?.checked || false}
          />
          <label>Available</label>
          {selectedSchedules[day]?.checked && (
            <div>
              {selectedSchedules[day]?.timeSlots?.map((slot, index) => (
                <div key={index} className="flex space-x-2">
                  <select
                    className="border p-2"
                    onChange={(e) => handleScheduleChange(day, `fromTime${index}`, e.target.value)}
                    value={selectedSchedules[day][`fromTime${index}`] || ""}
                  >
                    <option value="">From</option>
                    {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border p-2"
                    onChange={(e) => handleScheduleChange(day, `toTime${index}`, e.target.value)}
                    value={selectedSchedules[day][`toTime${index}`] || ""}
                  >
                    <option value="">To</option>
                    {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button onClick={() => addTimeSlot(day)}>Add Time Slot</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TempData;


// -------------------------------------------------------------------------------------------------------------------------------


// import { Minus, Plus, PlusCircle } from "lucide-react";
// import React, { useState } from "react";

// const Schedule = () => {
//   const daysOfWeek = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const timeOptions = [];
//   for (let hour = 1; hour <= 12; hour++) {
//     const hourString = hour.toString().padStart(2, "0");
//     timeOptions.push(`${hourString}:00`);
//     timeOptions.push(`${hourString}:30`);
//   }

//   const [selectedSchedules, setSelectedSchedules] = useState({});

//   console.log(selectedSchedules);

//   return (
//     <div className="grid 2xl:grid-cols-5 grid-cols-1 p-5 h-full gap-5 text-lg">
//       {/* Left Side */}
//       <div className="flex flex-col gap-5 border-2 py-5 col-span-4">
//         <div className="flex justify-end px-16">
//           <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-2 w-[8rem] rounded-3xl">
//             Save
//           </button>
//         </div>
//         {daysOfWeek.map((day, index) => (
//           <div
//             key={index}
//             className="flex xs:flex-row flex-col justify-between xs:items-center lg:px-10 px-5 xs:pl-5"
//           >
//             <div className="flex gap-2">
//               <input type="checkbox" className="" />
//               <label htmlFor="">{day}</label>
//             </div>
//             <div className="flex items-center">
//               <div className="p-2 focus:outline-none rounded flex lg:flex-row flex-col items-center gap-2">
//                 <div className="flex gap-1">
//                   <select className="border-2 border-gray-500 p-2 w-[6rem] focus:outline-none rounded">
//                     <option
//                       value=""
//                       className="w-[200px] bg-[#f2f2f2] border text-[#333] text-base p-[5px] border-solid border-[#ccc]"
//                     >
//                       From{" "}
//                     </option>
//                     {timeOptions.map((time, index) => (
//                       <option key={index} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </select>
//                   <select className="border-2 border-gray-500 p-2 focus:outline-none rounded flex lg:flex-row flex-col gap-2 ">
//                     <option value="">Period</option>
//                     <option value="AM">AM</option>
//                     <option value="PM">PM</option>
//                   </select>
//                 </div>
//                 <div className="lg:flex hidden">
//                   <Minus />
//                 </div>
//                 <div className="flex gap-1">
//                   <select className="border-2 border-gray-500 p-2 w-[6rem] focus:outline-none rounded">
//                     <option value="">Till</option>
//                     {timeOptions.map((time, index) => (
//                       <option key={index} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </select>
//                   <select className="border-2 border-gray-500 p-2 focus:outline-none rounded">
//                     <option value="">Period</option>
//                     <option value="AM">AM</option>
//                     <option value="PM">PM</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="">
//                 <PlusCircle />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Right Side */}
//       <div className="border-2">
//         <div className="text-center font-bold text-2xl">Available Slot</div>
//         {daysOfWeek.map(
//           (day, index) =>
//             selectedSchedules[day]?.checked && (
//               <div
//                 key={index}
//                 className="flex flex-col text-center xs:text-base text-[10px]"
//               >
//                 <div className="flex items-center justify-center">
//                   {day},{selectedSchedules[day]?.fromTime || "-"}
//                   {selectedSchedules[day]?.fromPeriod || "-"}
//                   <Minus size={10} />
//                   {selectedSchedules[day]?.toTime || "-"}
//                   {selectedSchedules[day]?.toPeriod || "-"}
//                 </div>
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Schedule;


//----------------------------------------------------------------------------------------------------------------------------


// import { Minus, Plus, PlusCircle } from "lucide-react";
// import React, { useState } from "react";

// const Schedule = () => {
//   const daysOfWeek = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const timeOptions = [];
//   for (let hour = 1; hour <= 12; hour++) {
//     const hourString = hour.toString().padStart(2, "0");
//     timeOptions.push(`${hourString}:00`);
//     timeOptions.push(`${hourString}:30`);
//   }

//   const [selectedSchedules, setSelectedSchedules] = useState({});

//   console.log(selectedSchedules);

//   const handleScheduleChange = (day, field, value) => {
//     setSelectedSchedules((prevSchedules) => ({
//       ...prevSchedules,
//       [day]: {
//         ...prevSchedules[day],
//         [field]: value,
//       },
//     }));
//   };
//   console.log();
//   return (
//     <div className="grid 2xl:grid-cols-5 grid-cols-1 p-5 h-full gap-5 text-lg">
//       {/* Left Side */}
//       <div className="flex flex-col gap-5 border-2 py-5 col-span-4">
//         <div className="flex justify-end px-8">
//           <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-2 w-[8rem] rounded-3xl">
//             Save
//           </button>
//         </div>
//         {daysOfWeek.map((day, index) => (
//           <div
//             key={index}
//             className="flex xs:flex-row flex-col justify-between xs:items-center lg:px-10 px-5 xs:pl-5"
//           >
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 className=""
//                 onChange={(e) =>
//                   handleScheduleChange(day, "checked", e.target.checked)
//                 }
//                 checked={selectedSchedules[day]?.checked || false}
//               />
//               <label htmlFor="">{day}</label>
//             </div>
//             <div className="flex items-center">
//               {selectedSchedules[day]?.checked ? (
//                 <>
//                   <div className="p-2 focus:outline-none rounded flex lg:flex-row flex-col items-center gap-2">
//                     <div className="flex gap-1">
//                       <select
//                         placeholder="from"
//                         className="border-2 border-gray-500 p-2 w-[6rem] focus:outline-none rounded"
//                         onChange={(e) =>
//                           handleScheduleChange(day, "fromTime", e.target.value)
//                         }
//                         value={selectedSchedules[day]?.fromTime || ""}
//                       >
//                         <option value="">From </option>
//                         {timeOptions.map((time, index) => (
//                           <option key={index} value={time}>
//                             {time}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         className="border-2 border-gray-500 p-2 focus:outline-none rounded flex lg:flex-row flex-col gap-2 "
//                         onChange={(e) =>
//                           handleScheduleChange(
//                             day,
//                             "fromPeriod",
//                             e.target.value
//                           )
//                         }
//                         value={selectedSchedules[day]?.fromPeriod || ""}
//                       >
//                         <option value="">Period</option>
//                         <option value="AM">AM</option>
//                         <option value="PM">PM</option>
//                       </select>
//                     </div>
//                     <div className="lg:flex hidden">
//                       <Minus />
//                     </div>
//                     <div className="flex gap-1">
//                       <select
//                         className="border-2 border-gray-500 p-2 w-[6rem] focus:outline-none rounded"
//                         onChange={(e) =>
//                           handleScheduleChange(day, "toTime", e.target.value)
//                         }
//                         value={selectedSchedules[day]?.toTime || ""}
//                       >
//                         <option value="">Till</option>
//                         {timeOptions.map((time, index) => (
//                           <option key={index} value={time}>
//                             {time}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         className="border-2 border-gray-500 p-2 focus:outline-none rounded"
//                         onChange={(e) =>
//                           handleScheduleChange(day, "toPeriod", e.target.value)
//                         }
//                         value={selectedSchedules[day]?.toPeriod || ""}
//                       >
//                         <option value="">Period</option>
//                         <option value="AM">AM</option>
//                         <option value="PM">PM</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="">
//                     <PlusCircle />
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-gray-400">Unavailable</div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Right Side */}
//       <div className="border-2">
//         <div className="text-center font-bold text-2xl">Available Slot</div>
//         {daysOfWeek.map(
//           (day, index) =>
//             selectedSchedules[day]?.checked && (
//               <div
//                 key={index}
//                 className="flex flex-col text-center xs:text-base text-[10px]"
//               >
//                 <div className="flex items-center justify-center">
//                   {day},{selectedSchedules[day]?.fromTime || "-"}
//                   {selectedSchedules[day]?.fromPeriod || "-"}
//                   <Minus size={10} />
//                   {selectedSchedules[day]?.toTime || "-"}
//                   {selectedSchedules[day]?.toPeriod || "-"}
//                 </div>
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Schedule;
