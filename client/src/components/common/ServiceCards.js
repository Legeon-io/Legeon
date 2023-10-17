import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { AiOutlineEye } from "react-icons/ai";
export const ServiceCards = ({
  title,
  description,
  Icon,
  duration,
  cost,
  slashprice,
}) => {
  var content;

  if (slashprice !== 0) {
    content = (
      <span>
        <span className="line-through ">{cost}$</span>/{slashprice}$
      </span>
    );
  } else {
    content = <span>{cost}$</span>;
  }

  return (
    <div className="border p-5 flex flex-col rounded-md w-full h-100 gap-2 shadow-md">
      <div className="flex gap-3 justify-end items-center">
        <button className="text-2xl hover:text-gray-600 duration-300 ">
          <BsFillPencilFill className="text-sm" />
        </button>
        <button className="text-2xl text-red-600 hover:text-red-800 duration-300 ">
          <MdDelete />
        </button>
      </div>
      <div className=" flex justify-between items-center ">
        <div className="p-2 border w-14 text-gray-700 rounded-full">{Icon}</div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <hr className="text-blue-300 " />
      <p className="text-lg text-gray-700 text-ellipsis">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center bg-white p-2 w-10 rounded-full border">
          <AiOutlineEye size={20} />
        </div>
        <div className=" flex md:gap-2 gap-1 gap-x-7">
          <button
            disabled
            className="md:p-2 p-1 border border-gray-300 rounded-md text-white bg-blue-700"
          >
            40 mins
          </button>
          <div className="md:p-2 p-1 bg-white border border-gray-300 rounded-md">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
