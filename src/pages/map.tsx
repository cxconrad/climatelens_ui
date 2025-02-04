import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherMap from "../components/map";
import Sidebar from "../components/sidebar_stations";

export interface WeatherStation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
}

const Map: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const [stations, setStations] = useState<WeatherStation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/weatherstations")
            .then((response) => response.json())
            .then((data: WeatherStation[]) => {
                setStations(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fehler beim Laden der Wetterstationen:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <header className="text-white p-5">
                <h1 className="text-5xl font-bold">ClimateLens</h1>
                <p className="mt-2 text-lg">Wetterstationen finden - Trends entdecken</p>
            </header>

            <div className="content-center flex flex-1 overflow-hidden">

                <div className="w-1/4 p-4 h-90% overflow-y-auto ">
                    <button className="button p-2 m-2 !bg-pink-500 text-white rounded hover:bg-blue-600" onClick={handleBack}>
                        Zurück
                    </button>
                    <Sidebar stations={stations} loading={loading} />
                </div>

                <div className="flex-1 p-4">
                    <WeatherMap stations={stations} loading={loading} />
                </div>
            </div >
        </div >
    );
};

export default Map;
