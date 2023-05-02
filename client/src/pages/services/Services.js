import React, { useState } from 'react'
import './Services.css';
import '../index.css'

import { Link } from 'react-router-dom';

export const Services = ({ sidebarVisible }) => {
  const [virtualEngage, setVirtualEngage] = useState(false);

  return (
    <>
      <div className={sidebarVisible ? 'page move-right' : 'page'} >

        <div className='services-container'>
          <span className='services-text'>
            Services
          </span>
      <Link to='/create-service' style={{textDecoration:'none'}} >
          <span className='add-services'>
            <button className='services' >
              + Add Services
            </button>
          </span>
      </Link>
        </div>
      </div>

      <div className='division'></div>
      
      <div className={sidebarVisible ? 'services-types move-right' : 'services-types'} >
        <div className='services-type'>
          Service Type

          <div className='types'>
            <button className='engagecall'> 1:1 Engage</button>
            <button className='text-query'> Ask Query?</button>
          </div>
        </div>

      </div>

      <div className={sidebarVisible ? 'services-cards move-right' : 'services-cards'} >
        <div className='service-card-conatainer'>
          Service Cards
          <div>
            Cards
          </div>
          <div>
            Cards
          </div>
          <div>
            Cards
          </div>
          <div>
            Cards
          </div>
        </div>

      </div>
      
    </>
  )
}

export default Services