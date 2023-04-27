import React, { useState } from 'react'
import './Profile.css';
import { AccountPage, ProfilePage } from './profile-pages';

export const Profile = (props) => {
  const [activeTab, setActiveTab] = useState("profilepage");

  const handleTabToChange = (tab) => {
    setActiveTab(tab);
  }

  const handlSubmit = () => {

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
          <button className="save-button" onClick={handlSubmit}>
            Save Changes
          </button>
        </span>


      </div>

      <div className='division'></div>

      <div className={props.sidebarVisible ? 'profile move-right' : 'profile'} >
        <div className='page-container'>
          {activeTab === "profilepage" && <ProfilePage />}
          {activeTab === "accountpage" && <AccountPage />}
        </div>
      </div>
    </>
  )
}

export default Profile