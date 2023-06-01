import React from 'react'
import './Earnings.css';
import '../index.css'

export const Earnings = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Earnings
    </div>
  )
}

export default Earnings