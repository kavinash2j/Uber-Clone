const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const { getFare } = require('../services/ride.service');
const mapServices = require('../services/Map.services')
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('Creating ride with data:', req.body);
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

        const pickupCoordinates = await mapServices.getCoordinatesFromAddress(pickup);
        const destinationCoordinates = await mapServices.getCoordinatesFromAddress(destination);
        console.log("pickup", pickupCoordinates, "destination", destinationCoordinates)
        sendMessageToSocketId(ride._id, { event: "ride-Coordinates", data: { pickupCoordinates, destinationCoordinates } });

        const captainsInRadius = await mapServices.getCaptainsInTheRadius(pickupCoordinates.latitude, pickupCoordinates.longitude, 100, vehicleType);
        console.log("pickupcoordinates", pickupCoordinates);

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')

        captainsInRadius.map(async captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

        console.log(captainsInRadius);
        res.status(201).json(ride);
    }
    catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ error: error.message });
    }

}
module.exports.fareController = async (req, res) => {
    const { pickup, destination } = req.query;
    if (!pickup || !destination) {
        return res.status(400).json({ error: 'Pickup and destination are required' });
    }
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error('Error fetching fare:', error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports.confrimRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { rideId, captain } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        console.log("ride confirmed set scoket");

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain })

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    console.log("ending ride post request");
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        // console.log("ending ride with rideId:", rideId, "and captain:", req.captian);
        const ride = await rideService.endRide({ rideId, captian: req.captian });
        console.log(ride);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        return res.status(200).json(ride);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
