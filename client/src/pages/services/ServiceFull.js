import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
export const ServiceFull = () => {
  return (
    <div className="ml-4">
      <div className="border p-5 flex flex-col rounded-md w-1/2  gap-2 ">
        <div className=" flex justify-between items-center ">
          <div class="p-2 border w-14 text-gray-700 rounded-full">
            <BsFillTelephoneFill size={40} />
          </div>
          <h1 class="text-2xl font-bold">Title</h1>
        </div>
        <hr className="text-blue-300 " />
        <p className="text-lg text-gray-700  text-ellipsis   h-14 overflow-hidden  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates,
          voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aspernatur odit itaque numquam tenetur consequuntur debitis voluptatum
          enim eos aut laborum! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Aspernatur odit itaque numquam tenetur consequuntur
          debitis voluptatum enim eos aut laborum!
        </p>

        <div className="flex justify-between items-center">
          <div className="bg-white p-2 w-10 rounded-full border">
            <AiOutlineEye size={20} />
          </div>
          <div className=" flex gap-2 gap-x-7">
            <button className="p-2  border border-gray-300 rounded-md text-white bg-blue-700">
              40mins
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded-md">
              <span className="line-through">400$</span>/300$
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFull;
