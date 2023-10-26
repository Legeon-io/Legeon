import React from "react";
import { BiPencil, BiRupee } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { Formik } from "formik";
import Input from "../../components/helper/Input";
const RightPage = ({ pickDate, pickTime }) => {
  console.log(pickDate, pickTime);
  return (
    <div>
      <div className="border-2 border-black rounded-2xl">
        <div className="flex flex-col items-center p-5">
          <div className="flex justify-between w-full p-5">
            <div>
              <div className="text-2xl font-bold">1:1 Session</div>
              <div className="flex gap-2 items-center">
                <label htmlFor="" className="font-bold">
                  Video Meeting:
                </label>
                <p>20 minutes</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 px-5 rounded-xl">
              {true && (
                <div className="flex items-center gap-1 line-through justify-center">
                  <BiRupee />
                  100
                </div>
              )}
              <div className="flex items-center gap-1 font-bold text-xl">
                <BiRupee />
                200
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 font-bold bg-green-400 text- w-full p-2 rounded">
            <SlCalender />
            <div className="text-base flex gap-2">
              <span>
                {pickDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>|</span>
              <span>{pickTime}</span>
            </div>
          </div>
          <div className="p-5 w-full">
            <Formik
              initialValues={{
                name: "",
                email: "",
                description: "",
                phoneNumber: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <>
                  <div className="flex flex-col gap-5">
                    <Input name="name" type="text" label="Name" />
                    <Input name="email" type="text" label="Email" />
                    <Input
                      as="textarea"
                      name="description"
                      type="text"
                      label="Description"
                      className="h-[10rem]"
                    />
                    <Input
                      name="phoneNumber"
                      type="text"
                      label="Phone Number"
                    />
                  </div>
                </>
              )}
            </Formik>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full"
          >
            Confirm and Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightPage;
