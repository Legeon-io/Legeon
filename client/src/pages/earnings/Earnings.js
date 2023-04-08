import React from 'react'
import './Earnings.css';

export const Earnings = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'earnings move-right' : 'earnings'} >
      Earnings
    </div>
  )
}

export default Earnings