import React, { useState } from 'react';
import './Payments.css';
import '../index.css';
import { useSelector } from 'react-redux';

import * as BsIcons from 'react-icons/bs';
import { verifyIFSC } from '../../apis/payments/razorpay.apis';
import CryptoJS from 'crypto-js';
import { saveAccountDetails } from '../../apis/payments/saveaccountdetails.apis';
import Popup from '../../components/common/Popup';

export const Payments = ({ sidebarVisible }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const username = useSelector((state) => state.session.username);
  const [accountType, setAccountType] = useState("savings");
  const [accountHolderName, setAccountHolderName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleAccountHolderNameChange = (event) => {
    setAccountHolderName(event.target.value);
  };

  const handleIfscCodeChange = (event) => {
    setIfscCode(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const saveDetails = async () => {
    // Generate a random encryption key on the client-side
    const encryptionKey = CryptoJS.lib.WordArray.random(32).toString();

    // Encrypt the sensitive data using the encryption key
    const encryptedData = {
      accountType: CryptoJS.AES.encrypt(accountType, encryptionKey).toString(),
      accountHolderName: CryptoJS.AES.encrypt(accountHolderName, encryptionKey).toString(),
      ifscCode: CryptoJS.AES.encrypt(ifscCode, encryptionKey).toString(),
      accountNumber: CryptoJS.AES.encrypt(accountNumber, encryptionKey).toString(),
    };

    // Send the encrypted data to server
    const { response, data } = await saveAccountDetails(username, encryptedData, encryptionKey);

    // Close form
    setShowForm(false);

    // Update the notification state
    setIsPopupOpen(true);

    // Hide the notification after a certain duration
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 2000); // Adjust the duration as needed
  }

  const handleForm = async () => {
    try {

      if (accountHolderName === "") {
        setErrorMessage("Enter Account Holder Name");
      }
      else if (ifscCode === "") {
        setErrorMessage("Enter IFSC Code");
      }
      else if (accountNumber === "") {
        setErrorMessage("Enter Account Number");
      }
      else {
        const { response } = await verifyIFSC(ifscCode)
        if (response.status !== 200) {
          setErrorMessage('IFSC Code is invalid');
        }
        else {
          setErrorMessage('');
          saveDetails(); // Saving the account details in database
        }
      }
    } catch (error) {
      console.error('Error in saving account details', error);
      alert('An error occurred. Please try again.');
    }
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={sidebarVisible ? 'page move-right' : 'page'} >
        <div className='payments-container'>
          <span className='payments-text'>
            Payments
          </span>

          <span className='add-payments'>
            <button className='payments' onClick={toggleForm}>
              <BsIcons.BsFillPersonVcardFill className="icon" />
              <span className="text">Add Payout</span>
            </button>
          </span>
        </div>
      </div>

      <div className='division'></div>

      <div className='payments-popup-form'>

        {showForm && (
          <div className="popup-form">
            <h2>Enter Payout Details</h2>
            {errorMessage && ( // Show alert message if error message is not empty
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <form>
              <div className="payments-account-type">
                <label htmlFor="accountType">Account Type:</label>
                <select id="accountType" name="accountType" onChange={handleAccountTypeChange}>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </div>


              <div className="payments-input-container">
                <label htmlFor="accountHolder">Account Holder Name:</label>
                <input type="text" id="accountHolder" name="accountHolder" onChange={handleAccountHolderNameChange} />
              </div>

              <div className="payments-input-container">
                <label htmlFor="ifscCode">IFSC Code:</label>
                <input type="text" id="ifscCode" name="ifscCode" onChange={handleIfscCodeChange} />
              </div>

              <div className="payments-input-container">
                <label htmlFor="accountNumber">Account Number:</label>
                <input type="text" id="accountNumber" name="accountNumber" onChange={handleAccountNumberChange} />
              </div>
            </form>

            <div className='buttons'>
              <button type="payments-submit" onClick={handleForm}>Save Changes</button>
              <button type="cancelButton" className='cancel' onClick={toggleForm}>Cancel</button>
            </div>

          </div>
        )}
      </div>

      {
        isPopupOpen &&
        
        <Popup
        message="Account Details saved securely!"
        showConfirm={false}
        showCancel={false}
        />
      }

    </>
  )
}

export default Payments;
