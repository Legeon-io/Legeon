import React, { useEffect, useState } from "react";
import "./Services.css";
import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import {
  BsCurrencyRupee,
  BsInfinity,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import EditServices from "./EditServices";
import { useDispatch, useSelector } from "react-redux";
import { deleteCallAction, getVerify } from "../../redux/service/CallAction";
import { deleteMessageAction } from "../../redux/service/personalAction";
import DeletePopUp from "./DeletePopUp";
export const Services = ({ sidebarVisible }) => {
  const loading = false;

  const callStore = useSelector((state) => state.serviceStore);
  console.log(callStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVerify());
  }, []);

  const checkTheme = (id) => {
    switch (id) {
      case "onetoone":
        return {
          icon: <FiPhoneCall />,
          bgColor: "bg-indigo-500",
          border: "border-indigo-500",
        };
      case "message":
        return {
          icon: <FiMessageSquare />,
          bgColor: "bg-pink-500",
          border: "border-pink-500",
        };
      default:
        return {
          color: "bg-black",
        };
    }
  };

  const [editModel, setEditModel] = useState(false);
  const [editServicesValue, setEditServicesValue] = useState();

  const handleEditModel = (service, getTheme) => {
    setEditModel(true);
    setEditServicesValue({ ...service, ...getTheme });
  };

  const [deleteToggle, setDeleteToggle] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const handleDeleteService = (type, id) => {
    setDeleteType(type);
    setDeleteId(id);
    setDeleteToggle(true);
  };

  return (
    <>
      {loading ? (
        <>
          <div
            role="status"
            className="flex justify-center items-center pt-[10rem]"
          >
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 mr-2 text-white animate-spin  fill-violet-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-xl">Loading...</span>
          </div>
        </>
      ) : (
        <div className="relative z-30">
          {editModel && (
            <EditServices
              setEditModel={setEditModel}
              value={editServicesValue}
            />
          )}
          {deleteToggle && (
            <DeletePopUp
              setDeleteToggle={setDeleteToggle}
              deleteType={deleteType}
              deleteId={deleteId}
            />
          )}
          <div className="space-y-5 xs:p-10 p-2">
            {/* Heading */}
            <div className="text-4xl">Services</div>
            {/* Button to create services */}
            <Link
              to="/services/createServices"
              className="flex md:justify-end justify-center w-full"
            >
              <button className="flex gap-2 items-center justify-center border-2 border-black p-2 w-[15rem] rounded-3xl">
                <AiOutlinePlus />
                Create Services
              </button>
            </Link>
            {/* Cards */}
            <div className="space-y-10">
              {callStore.data &&
                callStore.data.map((item, i) => {
                  const getTheme = checkTheme(item.serviceType);
                  return (
                    <>
                      <div
                        key={i}
                        className={`grid md:grid-cols-3 gap-2 border-2 ${getTheme.border} xl:w-[40rem] rounded-3xl p-5 shadow-xl`}
                      >
                        {/* Left Box */}
                        <div className="flex md:flex-col gap-5 justify-center items-center">
                          <div
                            className={`text-5xl ${getTheme.bgColor} text-white rounded-full p-5`}
                          >
                            {getTheme.icon}
                          </div>
                          <div className="flex flex-col gap-2 text-lg">
                            <button
                              onClick={() => handleEditModel(item, getTheme)}
                              className="flex gap-2 justify-center items-center bg-gray-300 p-1 rounded-3xl w-[8rem]"
                            >
                              <BsPencilSquare /> Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteService(item.serviceType, item._id)
                              }
                              className="flex gap-2 justify-center items-center bg-gray-300 p-1 rounded-3xl w-[8rem]"
                            >
                              <BsTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                        {/* Right Box */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                          <div className="text-3xl py-2 font-bold md:text-left text-center">
                            {item.serviceTitle}
                          </div>
                          <div className="flex gap-2">
                            <span className="font-bold">Price : </span>
                            <p className="flex items-center ">
                              <BsCurrencyRupee />
                              {item.price}
                            </p>
                            <p className="flex items-center line-through">
                              <BsCurrencyRupee />
                              {item.slashPrice}
                            </p>
                          </div>
                          {item.duration && (
                            <div className="flex gap-2">
                              <span className="font-bold">Duration : </span>
                              {item.duration} min
                            </div>
                          )}
                          <div className="flexv flex-col gap-2">
                            <span className="font-bold">Description : </span>
                            <div className="">
                              {item.serviceDescription &&
                              item.serviceDescription.length > 100 ? (
                                <>
                                  {item.serviceDescription.substring(0, 100)}
                                  <p className="font-black"> ...more</p>
                                </>
                              ) : (
                                item.serviceDescription
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
