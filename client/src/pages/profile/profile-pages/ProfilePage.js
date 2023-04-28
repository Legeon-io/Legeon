import React, { useState } from 'react'
import './ProfilePage.css'
import logo from '../../../assets/logo.png'

const ProfilePage = ({ username }) => {
  console.log(username);
  const [formData, setFormData] = useState({
    username: "username",
    firstname: "firstname",
    lastname: "lastname",
    bio: 'Tell your audience about your experience that makes people Engage with you',
    profession: 'Your Profession'
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value})
  }

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
      <div className="card-container">
        <div className="card-header">
          <img className="card-profile-photo" src={logo} alt="Profile" />
          <div className="card-info">
            <h2 className="card-username">{user.username}</h2>
          </div>
        </div>
        <div className='division'></div>
        <div className='profile-form-container'>
          <form onSubmit={handleSubmit}>
            {/* <div>
              <label className='card-name' htmlFor="username">Username:</label>
              <input placeholder={user.username} className='input-field' type="text" id="username" />
            </div> */}
            <div>
              <label className='card-name' htmlFor="firstname">First Name:</label>
              <input placeholder={formData.firstname} className='input-field' type="text" id="name" value={user.firstname} onChange={handleChange}/>
            </div>
            <div>
              <label className='card-name' htmlFor="lastname">Last Name:</label>
              <input placeholder={formData.lastname} className='input-field' type="text" id="name" value={user.lastname}  onChange={handleChange}/>
            </div>
            <div className='bio'>
              <label className='card-name' htmlFor="bio">Bio:</label>
              <textarea placeholder={formData.bio} className='input-field' id="bio" onChange={handleChange}></textarea>
            </div>
            <div>
              <label className='card-name' htmlFor="profession">Profession:</label>
              <input placeholder={formData.profession} className='input-field' type="text" id="profession" onChange={handleChange}/>
            </div>
          </form>
        </div>
      </div>
      <br />
    </>
  )
}

export default ProfilePage