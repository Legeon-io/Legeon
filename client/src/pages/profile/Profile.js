import React, { useState } from 'react'
import './Profile.css';
import { AccountPage, ProfilePage } from './profile-pages';

export const Profile = (props) => {
  const [activeTab, setActiveTab] = useState("profilepage");

  const handleTabToChange = (tab) => {
    setActiveTab(tab);
  }

  const handleSubmit = (firstname, lastname, bio, profession) => {
    console.log(`Username: ${props.username}, First Name: ${firstname}, Last Name: ${lastname}, Bio: ${bio}, Profession: ${profession}`);
    // You can add code here to send the form data to a server or perform other actions
  }

  return (
    <>
      <div className={props.sidebarVisible ? 'profile move-right' : 'profile'} >
        <div className='button-container'>
          <span className='profile-span'>
            <button className={activeTab === "profilepage" ? "active" : ""} onClick={() => handleTabToChange("profilepage")}>
              Profile
            </button>
          </span>
          <span className='account-span'>
            <button className={activeTab === "accountpage" ? "active" : ""} onClick={() => handleTabToChange("accountpage")}>
              Account
            </button>
          </span>


        </div>
        <span className='save-span'>
          <button className="save-button" onClick={handleSubmit}>
            Save Changes
          </button>
        </span>

      </div>

      <div className='division'></div>

      <div className={props.sidebarVisible ? 'page-container move-right' : 'page-container'} >
        {/* <div className='page-container'> */}
          {activeTab === "profilepage" && <ProfilePage username={props.username} handleSubmit= {handleSubmit} />}
          {activeTab === "accountpage" && <AccountPage />}
        {/* </div> */}
      </div>
    </>
  )
}

export default Profile