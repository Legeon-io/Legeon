// import { XCircle } from "lucide-react";
// import React, { useMemo, useState } from "react";

// const Schedule = () => {
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const generateTimeArray = () => {
//     const times = [];
//     for (let hour = 1; hour <= 12; hour++) {
//       for (let minute = 0; minute < 60; minute += 30) {
//         const formattedHour = hour.toString().padStart(2, "0");
//         const formattedMinute = minute.toString().padStart(2, "0");
//         const time = `${formattedHour}:${formattedMinute}`;
//         times.push(time);
//       }
//     }
//     return times;
//   };

//   const timeArray = useMemo(() => generateTimeArray(), []);
//   const periods = ["Period", "AM", "PM"];

//   const [selectedDays, setSelectedDays] = useState([]);

//   const toggleDay = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(
//         selectedDays.filter((selectedDay) => selectedDay !== day)
//       );
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   const [scheduleData, setScheduleData] = useState(
//     days.map((day) => ({
//       day,
//       timeSlots: [{ fromTime: "", fromPeriod: "", toTime: "", toPeriod: "" }],
//     }))
//   );

//   const handleTimeSlotChange = (dayIndex, slotIndex, field, value) => {
//     const updatedScheduleData = [...scheduleData];
//     updatedScheduleData[dayIndex].timeSlots[slotIndex][field] = value;
//     setScheduleData(updatedScheduleData);
//   };

//   const addTimeSlot = (dayIndex) => {
//     const updatedScheduleData = [...scheduleData];
//     updatedScheduleData[dayIndex].timeSlots.push({
//       fromTime: "",
//       fromPeriod: "",
//       toTime: "",
//       toPeriod: "",
//     });
//     setScheduleData(updatedScheduleData);
//   };

//   const removeTimeSlot = (dayIndex, slotIndex) => {
//     const updatedScheduleData = [...scheduleData];
//     updatedScheduleData[dayIndex].timeSlots.splice(slotIndex, 1);
//     setScheduleData(updatedScheduleData);
//   };

//   return (
//     <div className="grid 2xl:grid-cols-3 grid-cols-1 p-5 h-full gap-5 text-lg">
//       {/* Left Side */}
//       <div className="flex flex-col gap-5 border-2 py-5 col-span-2">
//         <div className="flex justify-end px-16">
//           <button className="bg-[#3691f3] text-white p-2 w-[8rem] rounded-3xl">
//             Save
//           </button>
//         </div>
//         <div className="flex flex-col gap-5">
//           {scheduleData.map((dayData, dayIndex) => (
//             <div className="flex justify-between px-10" key={dayIndex}>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   id={dayData.day}
//                   className="h-4 w-4"
//                   checked={selectedDays.includes(dayData.day)}
//                   onChange={() => toggleDay(dayData.day)}
//                 />
//                 <label htmlFor={dayData.day}>{dayData.day}</label>
//               </div>
//               {selectedDays.includes(dayData.day) ? (
//                 <div className="flex flex-col gap-2 px-10">
//                   {dayData.timeSlots.map((timeSlot, slotIndex) => (
//                     <div className="flex gap-2" key={slotIndex}>
//                       <select
//                         value={timeSlot.fromTime}
//                         onChange={(e) =>
//                           handleTimeSlotChange(
//                             dayIndex,
//                             slotIndex,
//                             "fromTime",
//                             e.target.value
//                           )
//                         }
//                         className="border-2 border-black focus:outline-none rounded px-2 w-[6rem]"
//                       >
//                         <option value="">From</option>
//                         {timeArray.map((item, i) => (
//                           <option key={i} value={item}>
//                             {item}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         value={timeSlot.fromPeriod}
//                         onChange={(e) =>
//                           handleTimeSlotChange(
//                             dayIndex,
//                             slotIndex,
//                             "fromPeriod",
//                             e.target.value
//                           )
//                         }
//                         className="border-2 border-black focus:outline-none rounded px-2 w-[6rem]"
//                       >
//                         <option value="">Period</option>
//                         <option value="AM">AM</option>
//                         <option value="PM">PM</option>
//                       </select>
//                       <span>-</span>
//                       <select
//                         value={timeSlot.toTime}
//                         onChange={(e) =>
//                           handleTimeSlotChange(
//                             dayIndex,
//                             slotIndex,
//                             "toTime",
//                             e.target.value
//                           )
//                         }
//                         className="border-2 border-black focus:outline-none rounded px-2 w-[6rem]"
//                       >
//                         <option value="">To</option>
//                         {timeArray.map((item, i) => (
//                           <option key={i} value={item}>
//                             {item}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         value={timeSlot.toPeriod}
//                         onChange={(e) =>
//                           handleTimeSlotChange(
//                             dayIndex,
//                             slotIndex,
//                             "toPeriod",
//                             e.target.value
//                           )
//                         }
//                         className="border-2 border-black focus:outline-none rounded px-2 w-[6rem]"
//                       >
//                         <option value="">Period</option>
//                         <option value="AM">AM</option>
//                         <option value="PM">PM</option>
//                       </select>
//                       <button
//                         onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                       >
//                         <XCircle />
//                       </button>
//                     </div>
//                   ))}
//                   <button onClick={() => addTimeSlot(dayIndex)}>
//                     Add Time Slot
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">Unavailable</div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Right Side */}
//       <div className="border-2">
//         <div className="text-center font-bold text-2xl">Available Slot</div>
//         <div className="grid 2xl:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-4">
//           {selectedDays.map((selectedDay) => {
//             const dayData = scheduleData.find(
//               (data) => data.day === selectedDay
//             );
//             return (
//               <div key={selectedDay} className="mb-4">
//                 <h3>{selectedDay}</h3>
//                 <ul className="">
//                   {dayData.timeSlots.map((timeSlot, slotIndex) => (
//                     <li className="flex gap-2 items-center" key={slotIndex}>
//                       {`${timeSlot.fromTime}${timeSlot.fromPeriod} - ${timeSlot.toTime}${timeSlot.toPeriod}`}
//                       ,
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;

// import { Minus, PlusCircle, Trash2 } from "lucide-react";
// import React, { useMemo, useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";

// const Schedule = () => {
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const generateTimeArray = () => {
//     const times = [];
//     for (let hour = 1; hour <= 12; hour++) {
//       for (let minute = 0; minute < 60; minute += 30) {
//         const formattedHour = hour.toString().padStart(2, "0");
//         const formattedMinute = minute.toString().padStart(2, "0");
//         const time = `${formattedHour}:${formattedMinute}`;
//         times.push(time);
//       }
//     }
//     return times;
//   };

//   const timeArray = useMemo(() => generateTimeArray(), []);

//   const sheduleSchema = Yup.object({
//     fromTime: Yup.string().required(),
//     fromPeriod: Yup.string().required(),
//     toTime: Yup.string().required(),
//     toPeriod: Yup.string().required(),
//   });

//   const [sheduleData, setSheduleData] = useState(
//     days.map((day) => ({
//       selected: false,
//       day: day,
//       timeSlots: [],
//     }))
//   );

//   const handleSave = () => {
//     console.log(sheduleData);
//   };

//   return (
//     <div className="grid 2xl:grid-cols-3 grid-cols-1 p-5 h-full gap-5 text-lg">
//       {/* Left Side */}
//       <div className="flex flex-col gap-5 border-2 py-5 col-span-2">
//         <div className="flex justify-end px-16">
//           <button
//             onClick={handleSave}
//             className="bg-[#3691f3] text-white p-2 w-[8rem] rounded-3xl"
//           >
//             Save
//           </button>
//         </div>
//         {sheduleData.map((dayData, item) => (
//           <div key={item} className="flex justify-between px-10">
//             <div className="flex gap-2 items-center">
//               <input
//                 id={dayData.day}
//                 type="checkbox"
//                 checked={dayData.selected}
//                 onChange={() =>
//                   setSheduleData((prevScheduleData) => {
//                     const updatedScheduleData = prevScheduleData.map((item) => {
//                       if (item.day == dayData.day) {
//                         return {
//                           ...item,
//                           selected: !item.selected,
//                         };
//                       }
//                       return item;
//                     });
//                     return updatedScheduleData;
//                   })
//                 }
//                 className="h-4 w-4 border-2 border-black"
//               />
//               {dayData.day}
//             </div>
//             <Formik
//               initialValues={{
//                 fromTime: "",
//                 fromPeriod: "",
//                 toTime: "",
//                 toPeriod: "",
//               }}
//               validationSchema={sheduleSchema}
//               onSubmit={(values, { resetForm }) => {
//                 setSheduleData((prevScheduleData) => {
//                   const updatedData = prevScheduleData.map((item) => {
//                     if (item.day == dayData.day) {
//                       return {
//                         ...item,
//                         timeSlots: [...item.timeSlots, values],
//                       };
//                     }
//                     return item;
//                   });
//                   return updatedData;
//                 });
//                 resetForm();
//               }}
//             >
//               <Form>
//                 <div className="flex items-center gap-2">
//                   <Field
//                     as="select"
//                     name="fromTime"
//                     className="w-[6rem] border-2 border-black rounded"
//                   >
//                     <option value="">From</option>
//                     {timeArray.map((time, i) => (
//                       <option key={i} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </Field>
//                   <Field
//                     as="select"
//                     name="fromPeriod"
//                     className="w-[6rem] border-2 border-black rounded"
//                   >
//                     <option value="">Period</option>
//                     <option value="AM">AM</option>
//                     <option value="PM">PM</option>
//                   </Field>
//                   <Minus size={30} />
//                   <Field
//                     as="select"
//                     name="toTime"
//                     className="w-[6rem] border-2 border-black rounded"
//                   >
//                     <option value="">From</option>
//                     {timeArray.map((time, i) => (
//                       <option key={i} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </Field>
//                   <Field
//                     as="select"
//                     name="toPeriod"
//                     className="w-[6rem] border-2 border-black rounded"
//                   >
//                     <option value="">Period</option>
//                     <option value="AM">AM</option>
//                     <option value="PM">PM</option>
//                   </Field>
//                   <button type="submit">
//                     <PlusCircle size={30} />
//                   </button>
//                 </div>
//               </Form>
//             </Formik>
//           </div>
//         ))}
//       </div>
//       {/* Right Side */}
//       <div className="flex flex-col border-2">
//         <div className="text-center font-bold text-2xl">Available Slot</div>
//         {sheduleData.map((dayData, item) => (
//           <div key={item} className="flex justify-between px-4 py-2">
//             <div className="font-bold">{dayData.day}</div>
//             {dayData.selected ? (
//               <>
//                 {dayData.timeSlots.length > 0 ? (
//                   <>
//                     <div className="flex flex-col gap-2">
//                       {dayData.timeSlots.map((slot, i) => (
//                         <div key={i} className="flex items-center gap-2">
//                           <span>
//                             {slot.fromTime}
//                             {slot.fromPeriod} : {slot.toTime}
//                             {slot.toPeriod}
//                           </span>
//                           <button
//                             onClick={() =>
//                               setSheduleData((prevScheduleData) => {
//                                 const updatedScheduleData =
//                                   prevScheduleData.map((item) => {
//                                     if (item.day === dayData.day) {
//                                       return {
//                                         ...item,
//                                         timeSlots: [
//                                           ...item.timeSlots.slice(0, i),
//                                           ...item.timeSlots.slice(i + 1),
//                                         ],
//                                       };
//                                     }
//                                     return item;
//                                   });
//                                 return updatedScheduleData;
//                               })
//                             }
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <div>Select Slots</div>
//                 )}
//               </>
//             ) : (
//               <div>Unavailable</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Schedule;
