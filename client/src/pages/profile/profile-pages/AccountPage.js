import React, { useState } from 'react'

import EditableInput from '../../../components/common/EditableInput.js';
import '../../index.css';
import './AccountPage.css'

const AccountPage = ({ username, email }) => {
  const [inputValue, setInputValue] = useState(email);

  const handleInputChange = async (value) => {
    setInputValue(value);
  };
  return (
    <>
    <div>
      <h2 className='title-text'>Your details</h2>
      <div className='division'></div>

      <span className='id'>Email address</span>
      <div className='editable-container'>
        <EditableInput value={inputValue} onInputChange={handleInputChange} type={'email'} username={username} />
      </div>
    </div>

    
    </>
  );
}

export default AccountPage