import React from "react";
import { useNavigate } from "react-router-dom";

interface WeatherStation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
}

interface WeatherStationCardProps {
    station: WeatherStation;
}

const WeatherStationCard: React.FC<WeatherStationCardProps> = ({ station }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/weatherstation1/weatherdata");
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Wetterdaten");
            }

            const data = await response.json();
            navigate("/graph", { state: { weatherData: data } });
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    return (
        <div className="station-card p-2 mb-2 text-white">
            <div className="text-2xl font-bold">{station.name}</div>
            <p>
                <strong>Koordinaten:</strong> L: {station.latitude}, B: {station.longitude}
            </p>
            <p>
                <strong>Entfernung:</strong> {station.distance} km
            </p>
            <button
                className="button p-2 m-2 !bg-pink-500 text-white rounded hover:bg-blue-600"
                onClick={handleClick}
            >
                Wetterdaten ansehen
            </button>
        </div>
    );
};

export default WeatherStationCard;


