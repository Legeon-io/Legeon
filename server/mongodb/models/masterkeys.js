import mongoose from "mongoose";

const MasterKeySchema = new mongoose.Schema({
    username: { type: String, required: true },
    encryptedKey: { type: String, required: true},
    encryptionPassword: { type: String, required: true},
    iv: { type: String, required: true},
});

const masterKeysModel = mongoose.model('MasterKeys', MasterKeySchema);

export default masterKeysModel;