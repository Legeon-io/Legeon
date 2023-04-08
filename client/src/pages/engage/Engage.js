import React from 'react'
import './Engage.css';

export const Engage = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'engage move-right' : 'engage'} >
      Engage
    </div>
  )
}

export default Engage