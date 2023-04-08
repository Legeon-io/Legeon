import React from 'react'
import './Feedback.css';

export const Feedback = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'feedback move-right' : 'feedback'} >
      Feedback
    </div>
  )
}

export default Feedback