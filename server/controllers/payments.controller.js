// Get get Call service function by id

import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const verifyIFSC = async (req, res) => {
    const { ifscCode } = req.params;
    const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);

    try {
        res.status(response.status).json({message: 'IFSC Code is valid', response: response})
    } catch (error) {
        res.status(response.status).json({error: 'IFSC Code is invalid', error})
    }
};