import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import '../../index.css'
import logo from '../../../assets/logo.png'
import { createUserProfile, getUserProfile } from '../../../apis/users/userprofiles.js';

const ProfilePage = ({ username, userData, onInputChange }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [userProfileData, setUserProfileData] = useState([
    { name: 'username', value: username },
    { name: 'bio', value: 'Tell your audience about your experience that makes people Engage with you' },
    { name: 'profession', value: 'Your Profession' },
  ]);

  useEffect(() => {
    async function createUserProfileApi() {
      const { response, data } = await createUserProfile(userProfileData[0].value, userProfileData[1].value, userProfileData[2].value);

      if (response.status === 200 || response.status === 201) {
        // console.log(data.message);
      }
      else {
        console.log(data.error);
      }
    }

    async function getUserProfileApi() {
      const { response, data } = await getUserProfile(username);
      if (response.status === 200) {
        const bioField = userProfileData.find(field => field.name === 'bio');
        const professionField = userProfileData.find(field => field.name === 'profession');
        bioField.value = data.user.bio;
        professionField.value = data.user.profession;
        setIsLoading(false);
      }
      else {
        console.log(data.error);
      }
    }
    const delay = 1000; // milliseconds
    const timerId = setTimeout(async () => {
      await createUserProfileApi();
      await getUserProfileApi();
    }, delay);

    return () => clearTimeout(timerId);
  }, [username]);

  return (
    <>
      {
        isLoading ? (
          <p className='loading' style={{background: 'linear-gradient(to right, #0B0C10, #1F2833)'}} >Engaging...</p>
        ) : (
          <div className="card-container">
            <div className="card-header">
              <img className="card-profile-photo" src={logo} alt="Profile" />
              <div className="card-info">
                <h2 className="card-username">{username}</h2>
              </div>
            </div>
            <div className='division'></div>
            <div className='profile-form-container'>
              {/* <div>
              <label className='card-name' htmlFor="username">Username:</label>
              <input placeholder={user.username} className='input-field' type="text" id="username" />
            </div> */}
              <div>
                <label className='card-name' htmlFor="firstname">First Name:</label>
                <input placeholder={userData.firstname || ''} className='input-field' type="text" id="firstname" onChange={onInputChange} />
              </div>
              <div>
                <label className='card-name' htmlFor="lastname">Last Name:</label>
                <input placeholder={userData.lastname || ''} className='input-field' type="text" id="lastname" onChange={onInputChange} />
              </div>
              <div className='bio'>
                <label className='card-bio' htmlFor="bio">Bio:</label>
                <textarea placeholder={userProfileData[1].value} className='textarea' id="bio" onChange={onInputChange}></textarea>
              </div>
              <div>
                <label className='card-name' htmlFor="profession">Profession:</label>
                <input placeholder={userProfileData[2].value} className='input-field' type="text" id="profession" onChange={onInputChange} />
              </div>
            </div>
          </div>
        )}
      <br />
    </>
  )
}

export default ProfilePage