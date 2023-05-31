import React, { useEffect, useState } from 'react'
import './ServiceDisplayCard.css';
import { getCallService } from '../../../apis/services/callservices';
import { useNavigate } from 'react-router-dom';


const ServiceDisplayCard = ({ username }) => {

  const navigate = useNavigate();
  const [callServiceData, setcallServiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { response, data } = await getCallService(username);
      if (response.status === 200) {
        setcallServiceData(data.user);
        setIsLoading(false);
      } else {
        console.log('Internal Server Error, data not received', response.error);
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
    navigate('engage-call/edit-service', { state: { formData: dataToEdit } });
  }

  return (
    <>
      {isLoading ? (
        <p className='loading' style={{ background: 'linear-gradient(to right, #0B0C10, #1F2833)' }} >Engaging...</p>
      ) : (
        <>
          <div className='service_cards-container'>
            {callServiceData.map((service, index) => (

              <div className="service_card" key={index}>
                <div className="service_card-header">
                  <h2 className="service_card-title"> {service.title} </h2>
                  <div className="service_card-price">Rs. {service.price} /-</div>
                </div>
                <div className="service_card-body">
                  {/* <p className="service_card-description">Description of the service goes here</p> */}
                  <p className="service_card-description">{service.servicetype === "EngageCall" ? "1:1 Call" : ""}</p>
                  <div className="service_card-call-duration">
                    <strong>Call duration:</strong> {service.duration} minutes
                  </div>
                  <button className="edit-button" onClick={() => handleEdit(index)} >Edit</button>
                </div>
              </div>

            ))}

          </div>
          <br />

        </>
      )
      }
    </>
  )
}
export default ServiceDisplayCard