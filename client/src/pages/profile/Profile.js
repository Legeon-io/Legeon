import React, { useEffect, useState } from 'react'
import './Profile.css';
import { AccountPage, ProfilePage } from './profile-pages';
import { getUser } from '../../apis/users/users.api';

export const Profile = (props) => {
  const [activeTab, setActiveTab] = useState('profilepage');
  const [userData, setUserData] = useState(null);
  const [userFormData, setUserFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleTabToChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFormChange = (formData) => {
    // setUserFormData((prevUser) => ({ ...prevUser, ...Object.fromEntries(formData.map((field) => [field.name, field.value])) }));
    console.log(formData);
  };

  useEffect(() => {
    async function fetchData() {
      const { response, data } = await getUser(props.username);
      if (response.status === 200) {
        setUserData(data.user);
        setIsLoading(false);
      } else {
        console.log('Internal Server Error, data not received', response.error);
      }
    }
    fetchData();
  }, [props.username]);

  const handleSubmit = () => {
    console.log("Getting called")
    console.log("formdata", userFormData);
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
        {
          isLoading ? (
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>Engaging...</p>
          ) : (
            activeTab === "profilepage" && <ProfilePage username={props.username} userData={userData} 
            onFormChange={handleFormChange} setUserFormData={setUserFormData}/>
          )

        }
        {activeTab === "accountpage" && <AccountPage />}
        {/* </div> */}
      </div>
    </>
  )
}

export default Profile