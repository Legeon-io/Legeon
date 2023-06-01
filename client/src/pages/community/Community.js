import React from 'react'
import './Community.css';
import '../index.css';

export const Community = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Community
    </div>
  )
}

export default Community