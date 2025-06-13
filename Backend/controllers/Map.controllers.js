const { getCoordinatesFromAddress, getTimeAndDistance, getSuggestionFromAddress } = require('../services/Map.services.js');

async function getCoordinate(req, res) {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const coordinates = await getCoordinatesFromAddress(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return res.status(500).json({ error: error.message });
    }
}

async function getDistanceAndTime(req, res) {
    const { from, to } = req.query;

    if (!from || !to) {
        return res.status(400).json({ error: 'Both "from" and "to" addresses are required' });
    }

    try {
        const fromCoordinates = await getCoordinatesFromAddress(from);
        const toCoordinates = await getCoordinatesFromAddress(to);

        // Here you would typically call a distance matrix API to get the distance and time
        // For demonstration, let's assume we have a mock function that returns dummy data

        const { distance, duration } = await getTimeAndDistance(fromCoordinates, toCoordinates);
        return res.status(200).json({
            from: fromCoordinates,
            to: toCoordinates,
            distance: distance,
            time: duration
        });
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        return res.status(500).json({ error: error.message });
    }

}

async function getAutoCompleteSuggestion(req, res) {
    const address = req.query.address;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const suggestions = await getSuggestionFromAddress(address);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCoordinate, getDistanceAndTime, getAutoCompleteSuggestion
};