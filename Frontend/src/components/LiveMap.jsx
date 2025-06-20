import React, { useEffect, useRef, useState } from 'react'
import mapBoxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapBoxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const LiveMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [coordinates, setCoordinates] = useState({
        lng: 0,
        lat: 0
    });
    const [loading, setLoading] = useState(true);
    const markerRef = useRef(null);
    const [isMapMoved, setIsMapMoved] = useState(false);

    useEffect(() => {
        if (map.current) return;

        // Initialize map
        map.current = new mapBoxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [coordinates.lng, coordinates.lat],
            zoom: 14
        });

        map.current.addControl(new mapBoxgl.NavigationControl());

        map.current.on('load', () => {
            setLoading(false);
        });

        // Listen for user interaction to detect map movement
        map.current.on('dragstart', () => setIsMapMoved(true));
        map.current.on('zoomstart', () => setIsMapMoved(true));
    }, []);

    useEffect(() => {
        // Use watchPosition for continuous location updates and auto-center
        let watchId;
        if ("geolocation" in navigator) {
            watchId = navigator.geolocation.watchPosition((position) => {
                const newCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setCoordinates(newCoords);

                // Auto-center the map to the new location
                if (map.current) {
                    map.current.flyTo({
                        center: [newCoords.lng, newCoords.lat],
                        zoom: 14
                    });
                    setIsMapMoved(false);
                }
            });

            // Cleanup on unmount
            return () => {
                if (watchId) navigator.geolocation.clearWatch(watchId);
            };
        }
    }, []);

    // Add or update marker for live location
    useEffect(() => {
        if (!map.current || (coordinates.lat === 0 && coordinates.lng === 0)) return;

        // Create a custom blue dot element
        let el = document.createElement('div');
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.background = '#1e90ff';
        el.style.borderRadius = '50%';
        el.style.boxShadow = '0 0 8px 2px #1e90ff88';
        el.style.border = '2px solid white';

        if (!markerRef.current) {
            markerRef.current = new mapBoxgl.Marker(el)
                .setLngLat([coordinates.lng, coordinates.lat])
                .addTo(map.current);
        } else {
            markerRef.current.setLngLat([coordinates.lng, coordinates.lat]);
        }
    }, [coordinates]);

    // Handler for recenter button
    const handleRecenter = () => {
        if (map.current) {
            map.current.flyTo({
                center: [coordinates.lng, coordinates.lat],
                zoom: 14
            });
            setIsMapMoved(false);
        }
    };

    return (
        <div className="relative w-full h-full">
            <div
                ref={mapContainer}
                className="w-full h-full"
                style={{ position: 'relative' }}
            />
            {isMapMoved && (
                <button
                    onClick={handleRecenter}
                    className="fixed right-2 bottom-8 z-10 p-3 rounded-full border-none bg-white shadow-lg cursor-pointer text-2xl"
                    title="Recenter to your location"
                >
                    📍
                </button>
            )}
        </div>
    )
}

export default LiveMap