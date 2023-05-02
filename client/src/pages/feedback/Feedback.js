import React from 'react'
import './Feedback.css';
import '../index.css'

export const Feedback = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Feedback
    </div>
  )
}

export default Feedback