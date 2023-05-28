import CallServices from '../mongodb/models/callservices.js'

export const createCallService = async (req, res) => {
    try {
        const { username, servicetype, title, duration, price } = req.body;

        const callService = await CallServices.create({
            username,
            servicetype,
            title,
            duration,
            price,
        });
        res.status(200).json({ message: 'Service added successfully', callService: callService });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
}

// Get get Call service function
export const getCallService = async (req, res) => {
    try {
        const { username } = req.params;
        // Check if user exists
        const user = await CallServices.find({ username });
        if (!user) {
            return res.status(401).json({ error: 'User do not have any services' });
        }
        
        res.status(200).json({ message: 'User information received', user: user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};