const axios = require('axios');
const { MAP_TOKEN } = process.env;

// Function to get coordinates from an address using Mapbox API
async function getCoordinatesFromAddress(address) {
    try {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAP_TOKEN}`;
        const response = await axios.get(url);
        if (
            response.data &&
            response.data.features &&
            response.data.features.length > 0
        ) {
            const [longitude, latitude] = response.data.features[0].center;
            console.log(`Coordinates for address "${address}":`, { latitude, longitude });
            return { latitude, longitude };
        } else {
            throw new Error('No coordinates found for the given address.');
        }
    } catch (error) {
        throw new Error(`Error fetching coordinates: ${error.message}`);
    }
}

// Function to get time and distance between two coordinates using Mapbox API
async function getTimeAndDistance(origin, destination) {
    try {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${MAP_TOKEN}`;
        const response = await axios.get(url);
        if (
            response.data &&
            response.data.routes &&
            response.data.routes.length > 0
        ) {
            const route = response.data.routes[0];
            const distance = route.distance; // Distance in meters
            const duration = route.duration; // Duration in seconds
            console.log(`Distance: ${distance} meters, Duration: ${duration} seconds`);
            return { distance, duration };
        } else {
            throw new Error('No route found between the given coordinates.');
        }
    } catch (error) {
        throw new Error(`Error fetching time and distance: ${error.message}`);
    }
}

async function getSuggestionFromAddress(address) {
    try {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAP_TOKEN}`;
        const response = await axios.get(url);
        if (
            response.data &&
            response.data.features &&
            response.data.features.length > 0
        ) {
            return response.data.features.map(feature => ({
                place_name: feature.place_name,
                center: feature.center
            }));
        } else {
            throw new Error('No suggestions found for the given address.');
        }
    } catch (error) {
        throw new Error(`Error fetching suggestions: ${error.message}`);
    }
}

module.exports = {
    getCoordinatesFromAddress,
    getTimeAndDistance,
    getSuggestionFromAddress
}
