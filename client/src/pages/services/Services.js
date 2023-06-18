import React from 'react'
import './Services.css';
import '../index.css'

import { Link } from 'react-router-dom';
import ServiceDisplayCard from '../../components/common/services_cards/ServiceDisplayCard';
import { useSelector } from 'react-redux';
import * as IoIcons from 'react-icons/io';


export const Services = ({ sidebarVisible }) => {
  const username = useSelector((state) => state.session.username);

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
                <IoIcons.IoMdCreate className="icon" />
                <span className="text">Create Service</span>
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