import React from 'react'
import './About.css';

export const About = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'about move-right' : 'about'} >
      About
    </div>
  )
}

export default About