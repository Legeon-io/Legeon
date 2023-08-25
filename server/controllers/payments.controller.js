// Get get Call service function by id

import Razorpay from 'razorpay';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import BankAccountDetails from '../mongodb/models/bankaccountdetails.js';

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });


export const verifyIFSC = async (req, res) => {
    const { ifscCode } = req.params;
    const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);

    try {
        res.status(response.status).json({ message: 'IFSC Code is valid', response: response })
    } catch (error) {
        res.status(response.status).json({ error: 'IFSC Code is invalid', error })
    }
};

export const saveAccountDetails = async (req, res) => {
    try {
        const { username, encryptedData, encryptionKey } = req.body;

        // Decrypt the data using the encryption key
        const decryptedData = {
            accountType: CryptoJS.AES.decrypt(encryptedData.accountNumber, encryptionKey).toString(CryptoJS.enc.Utf8),
            accountHolderName: CryptoJS.AES.decrypt(encryptedData.accountHolderName, encryptionKey).toString(CryptoJS.enc.Utf8),
            ifscCode: CryptoJS.AES.decrypt(encryptedData.ifscCode, encryptionKey).toString(CryptoJS.enc.Utf8),
            accountNumber: CryptoJS.AES.decrypt(encryptedData.accountNumber, encryptionKey).toString(CryptoJS.enc.Utf8),
        };

        // console.log(decryptedData);

        // Get the master key from the table (encrypted and stored in table)
        const response = await axios.post(`${process.env.DATABASE_SERVER_URL}/api/masterkeys/decryptMasterKey`, { username });
        const masterKey = response.data.decryptedKey;

        // Encrypt the data using the master key
        const encryptedDataWithMasterKey = {
            username: username,
            accountType: CryptoJS.AES.encrypt(decryptedData.accountType, masterKey).toString(),
            accountHolderName: CryptoJS.AES.encrypt(decryptedData.accountHolderName, masterKey).toString(),
            ifscCode: CryptoJS.AES.encrypt(decryptedData.ifscCode, masterKey).toString(),
            accountNumber: CryptoJS.AES.encrypt(decryptedData.accountNumber, masterKey).toString(),
        };

        const existingAccountDetails = await BankAccountDetails.findOne({ username });

        if (existingAccountDetails) {
            existingAccountDetails.accountType = encryptedDataWithMasterKey.accountType;
            existingAccountDetails.accountHolderName = encryptedDataWithMasterKey.accountHolderName;
            existingAccountDetails.ifscCode = encryptedDataWithMasterKey.ifscCode;
            existingAccountDetails.accountNumber = encryptedDataWithMasterKey.accountNumber;

            await existingAccountDetails.save();
        }
        else {
            await BankAccountDetails.create(encryptedDataWithMasterKey);
        }

        res.status(200).json({ message: 'Data encrypted and stored successfully!' });
    } catch (error) {
        console.error('Error saving encrypted data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};