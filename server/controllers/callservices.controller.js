import CallServices from '../mongodb/models/callservices.js'

export const createCallService = async (req, res) => {
    try {
        const { username, servicetype, title, duration, price } = req.body;

        // Check if a service with the same values already exists
        const existingService = await CallServices.findOne({
            username,
            servicetype,
            title,
            duration,
            price,
        });

        if (existingService) {
            // Service already exists, return an error response
            return res.status(409).json({ error: 'Service already exists' });
        }

        // Create a new service
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

// Update Call Service function
export const updateCallService = async (req, res) => {
    try {
        const { username } = req.params;
        const { servicetype, oldTitle, oldDuration, oldPrice, newTitle, newDuration, newPrice } = req.body;

        // Check if a service with the same values already exists
        const existingService = await CallServices.findOne({
            username,
            servicetype,
            title: oldTitle,
            duration: oldDuration,
            price: oldPrice,
        });

        if (existingService === null) {
            // No such service exists
            return res.status(409).json({ error: 'No such service exists' });
        }

        // Update user data if changes are made
        if (newTitle !== undefined && newTitle !== null && newTitle !== "" && newTitle !== existingService.title) {
            existingService.title = newTitle;
        }

        if (newDuration !== undefined && newDuration !== null && newDuration !== 0 && newDuration !== existingService.duration) {
            existingService.duration = newDuration;
        }

        if (newPrice !== undefined && newPrice !== null && newPrice !== existingService.price) {
            existingService.price = newPrice;
        }

        const updatedService = await existingService.save();

        res.status(200).json({ message: 'Service updated successfully', newService: updatedService });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};

export const deleteCallService = async (req, res) => {
    try {
        const { username } = req.params;
        const { servicetype, title, duration, price } = req.body;

        // Find the service to delete
        const serviceToDelete = await CallServices.findOneAndDelete({
            username,
            servicetype,
            title,
            duration,
            price,
        });

        if (!serviceToDelete) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
};
