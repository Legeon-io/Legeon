import React, { useEffect, useState } from 'react'

import EditableInput from '../../../components/common/EditableInput.js';
import '../../index.css';
import './AccountPage.css'
import { getUser } from '../../../apis/users/users.api.js';

const AccountPage = ({ username, email, isChange }) => {
  const [currentEmail, setCurrentEmail] = useState(email);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { response, data } = await getUser(username);
      if (response.status === 200) {
        setUserData(data.user);
        setCurrentEmail(data.user.email);
        setIsLoading(false);
      } else {
        console.log('Internal Server Error, data not received', response.error);
      }
    }
    const delay = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(delay);
  }, [username]);

  const handleInputChange = async (value) => {
    setCurrentEmail(value);
  };
  return (
    <>
      {isLoading ? (
        <p className='loading'>Engaging...</p>
      ) : (
        <>
          <div>
            <h2 className='title-text'>Your details</h2>
            <div className='division'></div>

            <span className='id'>Email address</span>
            <div className='editable-container'>
              <EditableInput value={currentEmail} onInputChange={handleInputChange} type={'email'} username={username} />
            </div>
          </div>
        </>
      )
      }
    </>
  );
}

export default AccountPage