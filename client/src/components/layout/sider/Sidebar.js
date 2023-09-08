import React from "react";

export const Sidebar = () => {
  return (
    <div className="col-span-1 bg-gray-100 lg:text-2xl lext-lg font-thin md:flex flex-col  gap-20 hidden md:visible  ">
      <ul className="flex flex-col items-center space-y-4 p-4 gap-5 mt-5">
        <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
          <a
            className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
            href="/"
          >
            Dashboard
          </a>
        </li>
        <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
          <a
            className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
            href="/"
          >
            DirectMessage
          </a>
        </li>
        <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
          <a
            className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
            href="/"
          >
            Bookings
          </a>
        </li>
      </ul>
      <div className="  flex flex-col">
        <ul className="flex flex-col items-center space-y-4 p-4 gap-5">
          <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
            <a
              className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
              href="/"
            >
              Availability
            </a>
          </li>
          <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
            <a
              className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
              href="/"
            >
              Services
            </a>
          </li>
          <li className="font-bold  hover:bg-purple-200  w-full text-center p-2 transition duration-300 rounded-md">
            <a
              className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text"
              href="/"
            >
              Payments
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
