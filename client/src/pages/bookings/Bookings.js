import React from 'react'
import './Bookings.css';

export const Bookings = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'bookings move-right' : 'bookings'} >
      Bookings
    </div>
  )
}

export default Bookings