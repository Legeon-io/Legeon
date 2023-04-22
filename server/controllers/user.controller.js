import User from '../mongodb/models/user.js';

// SignUp function
export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        const userExists = await User.findOne({ email });
        if(password !== confirmPassword) {
            return res.status(401).json({ error: 'Passwords does not match'});
        }
        if (userExists) {
            return res.status(402).json({ error: 'User already exists. Please Sign In' });
        }
        const user = await User.create({
            username,
            email,
            password,
        });
        res.status(200).json({ message: 'Registered successfully. Welcome to Legeon', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not registered. Sign up to Engage with Legeon' });
        }
        // Check if password is correct
        if (password !== user.password) {
            return res.status(402).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};