const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    if (!pickup || !destination || !vehicleType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const ride = await rideService.createRide({
            user: { _id: userId },
            pickup,
            destination,
            vehicleType
        });
        return res.status(201).json(ride);
    }
    catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ error: error.message });
    }

}