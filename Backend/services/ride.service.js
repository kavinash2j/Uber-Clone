const rideModel = require('../models/ride.model');
const mapService = require('./Map.services');

async function getFare(pickup, destination) {
    try {
        // Get coordinates for pickup and destination addresses
        const pickupCoordinates = await mapService.getCoordinatesFromAddress(pickup);
        const destinationCoordinates = await mapService.getCoordinatesFromAddress(destination);

        // Get time and distance between the two coordinates
        const { distance, duration } = await mapService.getTimeAndDistance(pickupCoordinates, destinationCoordinates);
        // Define per kilometer rates for different vehicle types
        const perMinuteRate = {
            auto: 2, // Example rate per minute for auto
            bike: 1,
            car: 3 // Example rate per minute for bike
        };
        const perKmRate = {
            auto: 10, // Example rate per kilometer for auto
            bike: 8,
            car: 15 // Example rate per kilometer for car
        };
        const baseFare = {
            auto: 30, // Base fare for auto
            bike: 20,
            car: 50 // Base fare for car
        };
        // Convert distance from meters to kilometers and duration from seconds to minutes
        const distanceInKm = distance / 1000;
        const durationInMinutes = duration / 60;

        const fare = {
            auto: baseFare.auto + (distanceInKm * perKmRate.auto) + (durationInMinutes * perMinuteRate.auto),
            bike: baseFare.bike + (distanceInKm * perKmRate.bike) + (durationInMinutes * perMinuteRate.bike),
            car: baseFare.car + (distanceInKm * perKmRate.car) + (durationInMinutes * perMinuteRate.car),
        };
        return fare;
    } catch (error) {
        throw new Error(`Error calculating fare: ${error.message}`);
    }

}

function getOtp(num) {
    try {
        const power = Math.pow(10, num);
        const otp = Math.floor(Math.random() * power).toString();
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
