import { AiOutlineMinus, AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import React, { useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Schedule = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const generateTimeArray = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute}`;
        times.push(time);
      }
    }
    return times;
  };

  const timeArray = useMemo(() => generateTimeArray(), []);

  const sheduleSchema = Yup.object({
    fromTime: Yup.string().required(),
    fromPeriod: Yup.string().required(),
    toTime: Yup.string().required(),
    toPeriod: Yup.string().required(),
  });

  const [sheduleData, setSheduleData] = useState(
    days.map((day) => ({
      selected: false,
      day: day,
      timeSlots: [],
    }))
  );

  const handleSave = () => {
    console.log(sheduleData);
  };

  return (
    <div className="grid 2xl:grid-cols-3 grid-cols-1 p-5 h-full gap-5 text-lg">
      {/* Left Side */}
      <div className="flex flex-col gap-5 border-2 py-5 col-span-2">
        <div className="flex justify-end px-16">
          <button
            onClick={handleSave}
            className="bg-[#3691f3] text-white p-2 w-[8rem] rounded-3xl"
          >
            Save
          </button>
        </div>
        {sheduleData.map((dayData, item) => (
          <div
            key={item}
            className="flex md:flex-row flex-col justify-between px-10"
          >
            <div className="flex gap-2 items-center">
              <input
                id={dayData.day}
                type="checkbox"
                checked={dayData.selected}
                onChange={() =>
                  setSheduleData((prevScheduleData) => {
                    const updatedScheduleData = prevScheduleData.map((item) => {
                      if (item.day === dayData.day) {
                        return {
                          ...item,
                          selected: !item.selected,
                        };
                      }
                      return item;
                    });
                    return updatedScheduleData;
                  })
                }
                className="h-4 w-4 border-2 border-black"
              />
              {dayData.day}
            </div>
            <Formik
              initialValues={{
                fromTime: "",
                fromPeriod: "",
                toTime: "",
                toPeriod: "",
              }}
              validationSchema={sheduleSchema}
              onSubmit={(values, { resetForm }) => {
                setSheduleData((prevScheduleData) => {
                  const updatedData = prevScheduleData.map((item) => {
                    if (item.day === dayData.day) {
                      return {
                        ...item,
                        timeSlots: [...item.timeSlots, values],
                      };
                    }
                    return item;
                  });
                  return updatedData;
                });
                resetForm();
              }}
            >
              <Form>
                <div className="flex lg:flex-row flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <Field
                      as="select"
                      name="fromTime"
                      className="w-[6rem] border-2 border-black rounded"
                    >
                      <option value="">From</option>
                      {timeArray.map((time, i) => (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="fromPeriod"
                      className="w-[6rem] border-2 border-black rounded"
                    >
                      <option value="">Period</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </Field>
                  </div>
                  <AiOutlineMinus className="lg:flex hidden" size={30} />
                  <div className="flex gap-2">
                    <Field
                      as="select"
                      name="toTime"
                      className="w-[6rem] border-2 border-black rounded"
                    >
                      <option value="">From</option>
                      {timeArray.map((time, i) => (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="toPeriod"
                      className="w-[6rem] border-2 border-black rounded"
                    >
                      <option value="">Period</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </Field>
                  </div>
                  <button type="submit">
                    <AiOutlinePlusCircle size={30} />
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        ))}
      </div>
      {/* Right Side */}
      <div className="flex flex-col border-2">
        <div className="text-center font-bold text-2xl">Available Slot</div>
        {sheduleData.map((dayData, item) => (
          <div key={item} className="flex xs:flex-row flex-col justify-between xs:px-4 px-1  py-2">
            <div className="font-bold">{dayData.day}</div>
            {dayData.selected ? (
              <>
                {dayData.timeSlots.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-2">
                      {dayData.timeSlots.map((slot, i) => (
                        <div key={i} className="flex  items-center gap-2">
                          <span className="flex sm:gap-1">
                            <div>
                              {slot.fromTime}
                              {slot.fromPeriod}
                            </div>
                            <div className="sm:flex ">:</div>
                            <div>
                              {slot.toTime}
                              {slot.toPeriod}
                            </div>
                          </span>
                          <button
                            onClick={() =>
                              setSheduleData((prevScheduleData) => {
                                const updatedScheduleData =
                                  prevScheduleData.map((item) => {
                                    if (item.day === dayData.day) {
                                      return {
                                        ...item,
                                        timeSlots: [
                                          ...item.timeSlots.slice(0, i),
                                          ...item.timeSlots.slice(i + 1),
                                        ],
                                      };
                                    }
                                    return item;
                                  });
                                return updatedScheduleData;
                              })
                            }
                          >
                            <BsTrash size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div>Select Slots</div>
                )}
              </>
            ) : (
              <div>Unavailable</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
