import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const DirectionMap = ({ origin, destination }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [originCoords, setOriginCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);

    // Geocode location names
    useEffect(() => {
        if (!origin || !destination) return;

        const geocode = async (place) => {
            const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json`, {
                params: {
                    access_token: mapboxgl.accessToken,
                    limit: 1,
                },
            });
            return res.data.features[0]?.geometry?.coordinates;
        };

        const fetchCoordinates = async () => {
            const originPoint = await geocode(origin);
            const destinationPoint = await geocode(destination);

            if (originPoint && destinationPoint) {
                setOriginCoords(originPoint);
                setDestinationCoords(destinationPoint);
            }
        };

        fetchCoordinates();
    }, [origin, destination]);

    // Initialize map after coordinates are fetched
    useEffect(() => {
        if (!originCoords || !destinationCoords) return;

        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: originCoords,
                zoom: 12,
                attributionControl: false,
            });

            map.current.on('load', () => {
                new mapboxgl.Marker({ color: 'green' }).setLngLat(originCoords).addTo(map.current);
                new mapboxgl.Marker({ color: 'red' }).setLngLat(destinationCoords).addTo(map.current);

                // Draw the route
                getRoute(originCoords, destinationCoords);
            });
        }
    }, [originCoords, destinationCoords]);

    const getRoute = async (start, end) => {
        const res = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}`,
            {
                params: {
                    geometries: 'geojson',
                    access_token: mapboxgl.accessToken,
                },
            }
        );

        const route = res.data.routes[0].geometry;

        if (map.current.getSource('route')) {
            map.current.getSource('route').setData(route);
        } else {
            map.current.addSource('route', {
                type: 'geojson',
                data: route,
            });

            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#3b82f6',
                    'line-width': 5,
                },
            });
        }

        const bounds = new mapboxgl.LngLatBounds();
        route.coordinates.forEach(coord => bounds.extend(coord));
        map.current.fitBounds(bounds, { padding: 60 });
    };

    return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};

export default DirectionMap;
