const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./Map.services');

async function getFare(pickup, destination) {
    try {
        const pickupCoordinates = await mapService.getCoordinatesFromAddress(pickup);
        const destinationCoordinates = await mapService.getCoordinatesFromAddress(destination);

        const { distance, duration } = await mapService.getTimeAndDistance(pickupCoordinates, destinationCoordinates);
        const perMinuteRate = {
            auto: 2,
            bike: 1,
            car: 3
        };
        const perKmRate = {
            auto: 10,
            bike: 8,
            car: 15
        };
        const baseFare = {
            auto: 30,
            bike: 20,
            car: 50
        };
        const distanceInKm = distance / 1000;
        const durationInMinutes = duration / 60;

        const fare = {
            auto: Math.round(baseFare.auto + (distanceInKm * perKmRate.auto) + (durationInMinutes * perMinuteRate.auto)),
            bike: Math.round(baseFare.bike + (distanceInKm * perKmRate.bike) + (durationInMinutes * perMinuteRate.bike)),
            car: Math.round(baseFare.car + (distanceInKm * perKmRate.car) + (durationInMinutes * perMinuteRate.car)),
        };
        return fare;
    } catch (error) {
        throw new Error(`Error calculating fare: ${error.message}`);
    }

}

module.exports.getFare = getFare;

function getOtp(num) {
    try {
        const power = Math.pow(10, num);
        let otp = Math.floor(Math.random() * power).toString();
        otp = otp.padStart(num, '0'); // Ensure OTP has the required number of digits
        console.log(`Generated OTP for ${num}: ${otp}`);
        return otp;
    } catch (error) {
        throw new Error(`Error generating OTP: ${error.message}`);
    }
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('Missing required fields');
    }
    const fare = await getFare(pickup, destination);
    const ride = new rideModel({
        user: user._id,
        pickup: pickup,
        destination: destination,
        fare: fare[vehicleType],
        otp: getOtp(6),
    });
    return await ride.save();
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captian }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    console.log(1, rideId, captian);
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captian._id
    }).populate('user').populate('captain');
    console.log(2);
    if (!ride) {
        throw new Error('Ride not found');
    }
    console.log(3);
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }
    console.log(4)
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed',
    });

    return ride;
}