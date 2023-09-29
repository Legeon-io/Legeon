import { BsFillTelephoneFill } from "react-icons/bs";
import { BsPersonVideo3 } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import ServiceCards from "../../components/common/ServiceCards";
export const ServiceFull = () => {
  return (
    <div className="row-span-5 flex flex-col gap-5">
      <h1 className="text-center text-4xl font-bold">Your services</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 m-10 mt-0   ">
        <ServiceCards
          title={"Mental Health for teens"}
          discription={
            "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          }
          Icon={<BsPersonVideo3 size={40} />}
          cost={200}
          slashprice={100}
        />
        <ServiceCards
          title={"Mental Health for adults"}
          discription={
            "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          }
          Icon={<BsFillTelephoneFill size={40} />}
          cost={100}
          slashprice={0}
        />
        <ServiceCards
          title={"Anti addiction session"}
          discription={
            "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          }
          Icon={<BsFillTelephoneFill size={40} />}
          cost={200}
          slashprice={50}
        />
        <ServiceCards
          title={"Handling chronic depression"}
          discription={
            "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          }
          Icon={<BsPersonVideo3 size={40} />}
          cost={100}
          slashprice={0}
        />
      </div>
    </div>
  );
};

export default ServiceFull;
