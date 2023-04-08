import React from 'react'
import './Profile.css';

export const Profile = ({sidebarVisible}) => {

  return (
    <div className={sidebarVisible ? 'profile move-right' : 'profile'} >
      Profile
    </div>
  )
}

export default Profile