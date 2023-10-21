import React from "react";
import Loading from "../../components/helper/Loading";
import { BiPencil, BiRupee } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { Formik } from "formik";
import Input from "../../components/helper/Input";

const CalenderBooking = () => {
  const loading = false;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="min-h-screen grid grid-cols-3 gap-10 p-10">
            <div className="col-span-2 border-2 border-black"></div>
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
                <div className="flex items-center gap-2 bg-green-400 text-white w-full p-2 rounded">
                  <SlCalender />
                  <div className="text-sm">
                    Monday, 23 Oct | 6:30AM - 6:50AM (GMT - 03:00)
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
                  className="w-[10rem] p-2 bg-black text-white rounded-full"
                >
                  Confirm and Pay
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CalenderBooking;
