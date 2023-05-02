import React from 'react'
import './Services.css';

export const Services = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'services move-right' : 'services'} >
      Services
    </div>
  )
}

export default Services