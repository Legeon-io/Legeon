import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
export const ServiceCards = ({
  title,
  discription,
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
      <div className=" flex justify-between items-center ">
        <div className="p-2 border w-14 text-gray-700 rounded-full">{Icon}</div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <hr className="text-blue-300 " />
      <p className="text-lg text-gray-700  text-ellipsis   h-14 overflow-hidden  ">
        {discription}
      </p>

      <div className="flex justify-between items-center">
        <div className="bg-white p-2 w-10 rounded-full border">
          <AiOutlineEye size={20} />
        </div>
        <div className=" flex md:gap-2 gap-1 gap-x-7">
          <button
            disabled
            className="md:p-2 p-1 border border-gray-300 rounded-md text-white bg-blue-700"
          >
            40mins
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
