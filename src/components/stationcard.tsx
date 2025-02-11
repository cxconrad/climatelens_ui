import { useNavigate } from "react-router-dom";
import { fetchData } from "../services/fetchdata";

interface WeatherStation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
    startYear: number;
    endYear: number;
}

interface WeatherStationCard {
    station: WeatherStation;
}

function stationcard({ station }: WeatherStationCard) {
    const navigate = useNavigate();

    return (
        <div className="station-card p-2 mb-2 text-white">
            <div className="text-2xl font-bold">{station.name}</div>
            <div>
                <p className="font-bold">Koordinaten:</p>
                <p className="font-thin">L: {station.latitude}</p>
                <p className="font-thin">B: {station.longitude}</p>
            </div>
            <p>
                <strong>Entfernung:</strong> {station.distance} km
            </p>
            <div className="content-center">
                <button
                    className="button p-2 m-2 !bg-violet-600 text-white rounded hover:bg-blue-600"
                    onClick={() => fetchData(station.id, navigate, station)}
                >
                    Wetterdaten ansehen
                </button>
            </div>
        </div>
    );
}

export default stationcard;
