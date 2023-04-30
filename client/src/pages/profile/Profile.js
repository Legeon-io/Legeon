import React, { useEffect, useState } from 'react'
import './Profile.css';
import '../index.css'
import { AccountPage, ProfilePage } from './profile-pages';
import { getUser } from '../../apis/users/users.api';
import Popup from '../../components/common/Popup';

export const Profile = (props) => {
  const [activeTab, setActiveTab] = useState('profilepage');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProfileChanges, setIsProfileChanges] = useState(false);
  const [noChanges, setNoChanges] = useState(false);

  const [formData, setFormData] = useState([
    { name: 'firstname', value: '' },
    { name: 'lastname', value: '' },
    { name: 'bio', value: '' },
    { name: 'profession', value: '' },
  ]);

  const handleTabToChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function fetchData() {
      const { response, data } = await getUser(props.username);
      if (response.status === 200) {
        setUserData(data.user);
        console.log("user data = ", data.user);
        setIsLoading(false);
      } else {
        console.log('Internal Server Error, data not received', response.error);
      }
    }
    const delay = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(delay);
  }, [props.username]);

  const handleInputChange = (event) => {
    setIsProfileChanges(true);
    const { id, value } = event.target;
    setFormData((prevFormData) =>
      prevFormData.map((field) =>
        field.name === id ? { ...field, value: value } : field
      )
    );
  }

  const handleSubmit = () => {
    // If there are any changes done by the user in the form then pop up is set to true
    if(isProfileChanges) setIsPopupOpen(true);
    else setNoChanges(true);
  }


  const handleConfirm = () => {
    // Code to save changes
    console.log("Form data = ", formData);
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setNoChanges(false);
    setIsPopupOpen(false);
  };


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
          {isPopupOpen && (
            <Popup
              message="Are you sure you want to save changes?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
          {noChanges && (
            <Popup
              message="No changes made yet!"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              showConfirm={false}
            />
          )}


        </span>

      </div>

      <div className='division'></div>

      {isLoading ? (
        <p className='loading'>Engaging...</p>
      ) : (
        <>
          <div className={props.sidebarVisible ? 'page-container move-right' : 'page-container'} >
            {
              activeTab === "profilepage" && <ProfilePage username={props.username} userData={userData}
                onInputChange={handleInputChange} />
            }
            {
              activeTab === "accountpage" && <AccountPage />
            }

          </div>
        </>
      )
      }
    </>
  )
}

export default Profile