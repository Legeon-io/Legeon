import React from 'react'
import './Support.css';
import '../index.js'

export const Support = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Support
    </div>
  )
}

export default Support