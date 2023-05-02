import React from 'react'
import './About.css';
import '../index.css';

export const About = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      About
    </div>
  )
}

export default About