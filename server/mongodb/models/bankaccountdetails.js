import mongoose from "mongoose";

const BankAccountDetailsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    accountType: {type: String, required: true },
    accountHolderName: {type: String, required: true },
    ifscCode: {type: String, required: true },
    accountNumber: { type: String, required: true },
});

const bankAccountDetailsModel = mongoose.model('BankAccountDetails', BankAccountDetailsSchema);

export default bankAccountDetailsModel;