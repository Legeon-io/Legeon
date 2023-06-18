import React, { useState } from 'react';
import './Payments.css';
import '../index.css';
import { useSelector } from 'react-redux';

import * as BsIcons from 'react-icons/bs';
import { verifyIFSC } from '../../apis/payments/razorpay.apis';

export const Payments = ({ sidebarVisible }) => {
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

  const handleForm = async () => {
    console.log(accountType);
    console.log(accountHolderName);
    console.log(ifscCode);
    console.log(accountNumber);

    const { response } = await verifyIFSC(ifscCode)
    if(response.status !== 200) {
      setErrorMessage('IFSC Code is invalid');
    }
    else if(accountHolderName === "") {
      setErrorMessage("Enter Account Holder Name");
    }
    else if(accountNumber === "") {
      setErrorMessage("Enter Account Number");
    }
    else {
      console.log("Success");
      setErrorMessage("");
      // Make api call to store the encrypted data in database
    }
  }

  const toggleForm = () => {
    setShowForm(!showForm);
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
    </>
  )
}

export default Payments;
