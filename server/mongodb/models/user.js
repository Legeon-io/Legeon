import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    firstname: { type: String, required: true},
    lastname: {type: String},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    image: { type: String, default: 'logo.png' },
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;