import React from 'react'
import './Payments.css';
import '../index.css'

export const Payments = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Payments
    </div>
  )
}

export default Payments