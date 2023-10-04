import React, { useEffect, useState } from "react";
import "./ServiceDisplayCard.css";
import {
  deleteCallService,
  getCallService,
} from "../../../apis/services/callservices";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";

import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";

const ServiceDisplayCard = ({ username }) => {
  const navigate = useNavigate();
  const [callServiceData, setcallServiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const [showpopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [deleteData, setDeleteData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { response, data } = await getCallService(username);
      if (response.status === 200) {
        setcallServiceData(data.user);
        setIsLoading(false);
      } else {
        console.log("Internal Server Error, data not received", response.error);
      }
    }
    const delay = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(delay);
  }, [username]);

  const handleEdit = (index) => {
    const dataToEdit = callServiceData[index];
    setEditIndex(index);
    setEditData(dataToEdit);
    navigate(`engage-call/edit-service/${dataToEdit._id}`, {
      state: { formData: dataToEdit },
    });
  };

  const handleDelete = (index) => {
    setDeleteData(callServiceData[index]);
    const messagetodisplay =
      "Delete the service " + JSON.stringify(callServiceData[index].title);
    setMessage(messagetodisplay);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    const { response, data } = deleteCallService(
      deleteData.username,
      deleteData.servicetype,
      deleteData.title,
      deleteData.duration,
      deleteData.price
    );
    setMessage("");
    setShowPopup(false);
    window.location.href = "/services";
  };

  const handleCancel = () => {
    setMessage("");
    setShowPopup(false);
  };

  return (
    <>
      {isLoading ? (
        <p
          className="loading"
          style={{ background: "linear-gradient(to right, #0B0C10, #1F2833)" }}
        >
          Engaging...
        </p>
      ) : (
        <>
          <div className="service_cards-container">
            {callServiceData.map((service, index) => (
              <div className="service_card" key={index}>
                <div className="service_card-header">
                  <h2 className="service_card-title"> {service.title} </h2>
                  <div className="service_card-price">
                    {service.price !== 0 && <HiIcons.HiCurrencyRupee />}
                    {service.price === 0 ? "Free" : service.price}
                  </div>
                </div>
                <div className="service_card-body">
                  {/* <p className="service_card-description">Description of the service goes here</p> */}
                  <p className="service_card-description">
                    <MdIcons.MdVideoChat />{" "}
                    {service.servicetype === "EngageCall" ? "1:1 Call" : ""}
                  </p>
                  <div className="service_card-call-duration">
                    <strong>Call duration:</strong> {service.duration} minutes
                  </div>

                  <div className="edit-delete-button-container">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="edit-button"
                      style={{ backgroundColor: "#FF6347" }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <br />
        </>
      )}

      {showpopup && message !== "" && (
        <Popup
          message={message}
          onConfirm={confirmDelete}
          onCancel={handleCancel}
          showConfirm={true}
        />
      )}
    </>
  );
};
export default ServiceDisplayCard;
