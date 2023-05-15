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
        res.status(200).json({ message: 'Call Service added successfully', callService: callService });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
}