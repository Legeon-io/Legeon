import UserProfile from '../models/userprofiles.js';


export const createUserProfile = async (req, res) => {
    try {
        const { username, bio, profession } = req.body;

        const existingUser = await UserProfile.findOne({ username });
        if (existingUser) {
            return res.status(201).json({ message: 'User Profile already created for the current user' });
        }

        const userProfile = await UserProfile.create({
            username,
            bio,
            profession,
        });
        res.status(200).json({ message: 'User Profile created successfully', userProfile: userProfile });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
}

// Get User Profile function
export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        // Check if user exists
        const user = await UserProfile.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'User not registered' });
        }
        
        res.status(200).json({ message: 'User information received', user: user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};

// Update User Profile function
export const updateUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const { bio, profession } = req.body;

        const currentUser = await UserProfile.findOne({ username });

        // Update user data if changes are made
        if (bio !== undefined && bio !== null && bio !== "" && bio !== currentUser.bio) {
            currentUser.bio = bio;
        }

        if (profession !== undefined && profession !== null && profession !== "" && profession !== currentUser.profession) {
            currentUser.profession = profession;
        }

        const updatedUser = await currentUser.save();

        res.status(200).json({ message: 'Changes updated in the userprofiles table', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};