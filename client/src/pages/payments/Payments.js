import React from 'react'
import './Payments.css';
import '../index.css';
import { useSelector } from 'react-redux';

export const Payments = ({sidebarVisible}) => {
  const username = useSelector((state) => state.session.username);

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Payments
    </div>
  )
}

export default Payments;