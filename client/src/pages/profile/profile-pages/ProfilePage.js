import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import logo from '../../../assets/logo.png'
import { createUserProfile, getUserProfile } from '../../../apis/users/userprofiles.js';

const ProfilePage = ({ username, userData, onFormChange }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFormChange({ [name]: value });
  }

  const [userFormData, setUserFormData] = useState([
    { name: 'username', value: username },
    { name: 'bio', value: 'Tell your audience about your experience that makes people Engage with you' },
    { name: 'profession', value: 'Your Profession' },
  ]);

  const [userProfileData, setUserProfileData] = useState([
    { name: 'username', value: username },
    { name: 'bio', value: 'hehe' },
    { name: 'profession', value: 'hehe' },
  ]);

  useEffect(() => {
    async function createUserProfileApi() {
      const { response, data } = await createUserProfile(userFormData[0].value, userFormData[1].value, userFormData[2].value);

      if (response.status === 200 || response.status === 201) {
        console.log(data.message);
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
    createUserProfileApi();
    getUserProfileApi();
  }, [username]);

  // const handleFormChange = (formData) => {
  //   setFormData({ ...formData, [event.target.name]: event.target.value});
  //   console.log(formData);
  // }

  // const [username, setUsername] = useState('');
  // const [firstname, setFirstName] = useState('');
  // const [lastname, setLastName] = useState('');
  // const [bio, setBio] = useState('Tell your audience about your experience that makes people Engage with you');
  // const [profession, setProfession] = useState('Your Profession');

  // const [profilePhoto, setProfilePhoto] = useState(null);

  // const handlePhotoUpload = (event) => {
  //   const uploadedPhoto = event.target.files[0];
  //   setProfilePhoto(URL.createObjectURL(uploadedPhoto));
  //   console.log(uploadedPhoto);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const user = {
    username: 'janakrish_30',
    firstname: 'Janarthanan',
    lastname: 'K',
    bio: 'I love React!',
    profession: 'Engineer'
    // profilePhoto: 'https://example.com/profile.jpg'
  };

  return (
    <>
      {
        isLoading ? (
          <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>Engaging...</p>
        ) : (
          <div className="card-container">
            <div className="card-header">
              <img className="card-profile-photo" src={logo} alt="Profile" />
              <div className="card-info">
                <h2 className="card-username">{user.username}</h2>
              </div>
            </div>
            <div className='division'></div>
            <div className='profile-form-container'>
              {/* <form onSubmit={handleSubmit}> */}
              {/* <div>
              <label className='card-name' htmlFor="username">Username:</label>
              <input placeholder={user.username} className='input-field' type="text" id="username" />
            </div> */}
              <div>
                <label className='card-name' htmlFor="firstname">First Name:</label>
                <input placeholder={userData.firstname || ''} className='input-field' type="text" id="firstname" onChange={handleInputChange} />
              </div>
              <div>
                <label className='card-name' htmlFor="lastname">Last Name:</label>
                <input placeholder={userData.lastname || ''} className='input-field' type="text" id="lastname" onChange={handleInputChange} />
              </div>
              <div className='bio'>
                <label className='card-name' htmlFor="bio">Bio:</label>
                <textarea placeholder={userProfileData[1].value} className='input-field' id="bio" onChange={handleInputChange}></textarea>
              </div>
              <div>
                <label className='card-name' htmlFor="profession">Profession:</label>
                <input placeholder={userProfileData[2].value} className='input-field' type="text" id="profession" onChange={handleInputChange} />
              </div>
              {/* </form> */}
            </div>
          </div>
        )}
      <br />
    </>
  )
}

export default ProfilePage