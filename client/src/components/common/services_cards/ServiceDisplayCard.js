import React from 'react'
import './ServiceDisplayCard.css';

const ServiceDisplayCard = (sidebarVisible) => {
  return (
    <>
      {/* <div className={sidebarVisible ? 'page move-right' : 'page'} > */}

        <div className='service_cards-container'>
          <div class="service_card">
            <div class="service_card-header">
              <h2 class="service_card-title">Service Name</h2>
              <div class="service_card-price">$100/hour</div>
            </div>
            <div class="service_card-body">
              <p class="service_card-description">Description of the service goes here</p>
              <div class="service_card-call-duration">
                <strong>Call duration:</strong> 30 minutes
              </div>
              <button class="edit-button">Edit</button>
            </div>
          </div>

          <div class="service_card">
            <div class="service_card-header">
              <h2 class="service_card-title">Service Name</h2>
              <div class="service_card-price">$100/hour</div>
            </div>
            <div class="service_card-body">
              <p class="service_card-description">Description of the service goes here</p>
              <div class="service_card-call-duration">
                <strong>Call duration:</strong> 30 minutes
              </div>
              <button class="edit-button">Edit</button>
            </div>
          </div>
        </div>

      {/* </div> */}
    </>
  )
}

export default ServiceDisplayCard;