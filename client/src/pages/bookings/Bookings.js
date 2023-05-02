import React from 'react'
import './Bookings.css';
import '../index.css';

export const Bookings = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Bookings
    </div>
  )
}

export default Bookings