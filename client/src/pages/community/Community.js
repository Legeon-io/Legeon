import React from 'react'
import './Community.css';

export const Community = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'community move-right' : 'community'} >
      Community
    </div>
  )
}

export default Community