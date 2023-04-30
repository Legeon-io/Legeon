import UserProfile from '../mongodb/models/userprofiles.js';


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

// Store userprofile function
export const updateUserProfile = async (req, res) => {
    try {
        const { username, firstname, lastname, email, password, confirmPassword } = req.body;

        const existingUser = await UserProfile.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            const errorMessage = existingUser.username === username
                ? 'Username already taken'
                : 'Email already registered';
            return res.status(409).json({ errorMessage });
        }
        
        if(password !== confirmPassword) {
            return res.status(401).json({ errorMessage: 'Passwords do not match'});
        }

        const user = await User.create({
            username,
            firstname,
            lastname,
            email,
            password,
        });
        res.status(200).json({ message: 'Registered successfully. Welcome to Legeon', user: user });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};