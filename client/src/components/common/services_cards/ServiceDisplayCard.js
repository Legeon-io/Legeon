import React, { useEffect, useState } from 'react'
import './ServiceDisplayCard.css';
import { getCallService } from '../../../apis/services/callservices';

const ServiceDisplayCard = ({ username }) => {

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { response, data } = await getCallService(username);
      if (response.status === 200) {
        setUserData(data.user);
        setIsLoading(false);
        console.log(data);
      } else {
        console.log('Internal Server Error, data not received', response.error);
      }
    }
    const delay = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(delay);
  }, [username]);

  return (
    <>
      {isLoading ? (
        <p className='loading' style={{ background: 'linear-gradient(to right, #0B0C10, #1F2833)' }} >Engaging...</p>
      ) : (
        <>
          <div className='service_cards-container'>
            {userData.map((service, index) => (

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
                  <button className="edit-button">Edit</button>
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