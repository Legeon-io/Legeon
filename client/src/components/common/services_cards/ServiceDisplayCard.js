import React from 'react'
import './ServiceDisplayCard.css';

const ServiceDisplayCard = () => {
  return (
    <>

        <div className='service_cards-container'>
          <div className="service_card">
            <div className="service_card-header">
              <h2 className="service_card-title">Service Name</h2>
              <div className="service_card-price">$100/hour</div>
            </div>
            <div className="service_card-body">
              <p className="service_card-description">Description of the service goes here</p>
              <div className="service_card-call-duration">
                <strong>Call duration:</strong> 30 minutes
              </div>
              <button className="edit-button">Edit</button>
            </div>
          </div>

          <div className="service_card">
            <div className="service_card-header">
              <h2 className="service_card-title">Service Name</h2>
              <div className="service_card-price">$100/hour</div>
            </div>
            <div className="service_card-body">
              <p className="service_card-description">Description of the service goes here</p>
              <div className="service_card-call-duration">
                <strong>Call duration:</strong> 30 minutes
              </div>
              <button className="edit-button">Edit</button>
            </div>
          </div>
        </div>
        <br />
    </>
  )
}

export default ServiceDisplayCard;