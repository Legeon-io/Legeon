import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    bio: {type: String, default: 'Tell your audience about your experience that makes people Engage with you'},
    profession: {type: String, default: 'Your Profession'},
    image: { type: String, default: 'logo.png' },
});

const userProfileModel = mongoose.model('UserProfile', UserProfileSchema);

export default userProfileModel;