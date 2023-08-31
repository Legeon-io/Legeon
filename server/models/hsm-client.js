import mongoose from "mongoose";

const HSMSchema = new mongoose.Schema({
    username: { type: String, required: true },
    encryptionPassword: { type: String, required: true},
});

const hsmModel = mongoose.model('HSM', HSMSchema);

export default hsmModel;