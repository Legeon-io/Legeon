import React, { useState } from 'react';
import './EditableInput.css';
import { updateUser } from '../../apis/users/users.api';

function EditableInput({ value, onInputChange, type, username }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    onInputChange(inputValue);
    setEditing(false);
    if (type === 'email') {
      const activeTab = 'accountpage';
      const userUpdateResponse = await updateUser(username, null, null, inputValue);
      window.location.href = '/profile';
    }
  };

  const handleCancelClick = () => {
    setInputValue(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <>
        <div className="editable-input-container">
          <input
            type={type}
            className="editable-input-field"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="editable-input-buttons">
            <button className="editable-input-button" onClick={handleSaveClick}>Save</button>
            <button className="editable-input-button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="editable-input-container">
          <div className="editable-input-value">{value}</div>
          <button className="editable-input-button" onClick={handleEditClick}>Edit</button>
        </div>
      </>
    );
  }
}

export default EditableInput;
