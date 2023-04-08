import React from 'react'
import './Support.css';

export const Support = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'support move-right' : 'support'} >
      Support
    </div>
  )
}

export default Support