import React, { useState } from "react";
import Loading from "../../components/helper/Loading";
import RightPage from "./RightPage";
import LeftPage from "./LeftPage";

const CalenderBooking = () => {
  const [pickTime, setPickTime] = useState();
  const [pickDate, setPickDate] = useState(new Date());
  const loading = false;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="min-h-screen grid grid-cols-3 gap-10 p-10">
            <div className="col-span-2 border-2 border-black rounded-3xl overflow-hidden">
              {/* Upper Portion */}
              <div className="grid grid-cols-3 border-b-2 border-black">
                <div className="relative flex justify-center items-center p-2">
                  <div className="absolute w-[40rem] h-full top-0 left-[-20rem] skew-x-[-40deg] border-r-2 border-black -z-10 bg-gray-200" />
                  <img
                    src=""
                    alt=""
                    className="bg-white h-[10rem] w-[10rem] rounded-full"
                  />
                </div>
                <div className="col-span-2 p-5 flex flex-col gap-5 items-end">
                  <div className="text-5xl font-bold">Shailendra Trivedi</div>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl">shilaendratrivedi004#1234</span>
                    <span className="text-gray-500">MERN Developer</span>
                  </div>
                </div>
              </div>
              {/* Lower Portion */}
              <LeftPage
                pickDate={pickDate}
                pickTime={pickTime}
                setPickTime={setPickTime}
                setPickDate={setPickDate}
              />
            </div>
            {/* RightSide */}
            <RightPage pickDate={pickDate} pickTime={pickTime} />
          </div>
        </>
      )}
    </>
  );
};

export default CalenderBooking;
