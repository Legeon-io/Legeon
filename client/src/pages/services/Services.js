import React from 'react'
import './Services.css';
import '../index.css'

import { Link } from 'react-router-dom';
import ServiceDisplayCard from '../../components/common/services_cards/ServiceDisplayCard';


export const Services = ({ sidebarVisible, username }) => {

  return (
    <>
      <div className={sidebarVisible ? 'page move-right' : 'page'} >

        <div className='services-container'>
          <span className='services-text'>
            Services
          </span>

          <span className='add-services'>
            <Link to='/services/create-service' style={{ textDecoration: 'none' }} >
              <button className='services'>
                + Add Services
              </button>
            </Link>
          </span>
        </div>
      </div>

      <div className='division'></div>
      <div className={sidebarVisible ? 'services-cards move-right' : 'services-cards'} >
        <div className='service-card-conatainer'>
          <span style={{ fontSize: '30px', color: '#C5C6C7' }}>Your Services</span>
        </div>
        <ServiceDisplayCard username={username} />
      </div>


    </>
  )
}

export default Services