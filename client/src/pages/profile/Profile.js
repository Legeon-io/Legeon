import React, { useEffect, useState } from 'react'
import './Profile.css';
import '../index.css'
import { AccountPage, ProfilePage } from './profile-pages';
import { getUser, updateUser } from '../../apis/users/users.api';
import Popup from '../../components/common/Popup';
import { updateUserProfile } from '../../apis/users/userprofiles';

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
    if (isProfileChanges || activeTab === 'accountpage') setIsPopupOpen(true);
    else setNoChanges(true);
  }


  const handleConfirm = async () => {
    if (activeTab === 'accountpage') {
      window.location.href = '/profile';
      setIsPopupOpen(false);
    }
    else {
      const userUpdateResponse = await updateUser(props.username, formData[0].value, formData[1].value);
      const userProfileUpdateResponse = await updateUserProfile(props.username, formData[2].value, formData[3].value);
      if (userUpdateResponse.response.status !== 200) {
        console.log(userUpdateResponse.data.error);
        console.log(userProfileUpdateResponse.data.error);
      }
      setIsPopupOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  };

  const handleCancel = () => {
    setNoChanges(false);
    setIsPopupOpen(false);
  };


  return (
    <>
      {isLoading ? (
        <p className='loading' style={{background: 'linear-gradient(to right, #0B0C10, #1F2833)'}} >Engaging...</p>
      ) : (
        <>
          <div className={props.sidebarVisible ? 'page move-right' : 'page'} >
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
          <div className={props.sidebarVisible ? 'page-container move-right' : 'page-container'} >
            {
              activeTab === "profilepage" && <ProfilePage username={props.username} userData={userData}
                onInputChange={handleInputChange} />
            }
            {
              activeTab === "accountpage" && <AccountPage username={props.username} email={userData.email} />
            }
          </div>

        </>
      )
      }
    </>
  )
}

export default Profile