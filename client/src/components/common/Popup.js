import React from 'react';
import './Popup.css';

function Popup({ message, onConfirm, onCancel, showConfirm=true, showCancel=true}) {
  return (
    <div className="popup-container">
      <div className="popup">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          { showConfirm && <button className="popup-confirm" onClick={onConfirm}>Confirm</button> }
          { showCancel && <button className="popup-cancel" onClick={onCancel}>Cancel</button> }
        </div>
      </div>
    </div>
  );
}

export default Popup;
