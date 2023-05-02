import React, { useState } from 'react'
import './Services.css';
import '../index.css'

export const Services = ({ sidebarVisible }) => {
  const [virtualEngage, setVirtualEngage] = useState(false);

  return (
    <>
      <div className={sidebarVisible ? 'services move-right' : 'services'} >

        <div className='services-container'>
          <span className='services-text'>
            Services
          </span>
          <span className='add-services'>
            <button className='services' >
              + Add Services
            </button>
          </span>
        </div>
      </div>
      <div className='division'></div>
    </>
  )
}

export default Services