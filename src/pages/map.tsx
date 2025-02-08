import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WeatherMap from "../components/worldmap";
import Sidebar from "../components/sidebar_stations";

export interface WeatherStation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
}

export interface LocationState {
    longitude: number;
    latitude: number;
    radius: number;
    stationCount: number;
    startYear: number;
    endYear: number;
}

const map = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let formData = location.state as LocationState | undefined;

    if (!formData) {
        const storedData = sessionStorage.getItem("formData");
        if (storedData) {
            formData = JSON.parse(storedData) as LocationState;
        }
    }

    if (!formData) {
        return <p>Keine Formulardaten vorhanden.</p>;
    }

    sessionStorage.setItem("formData", JSON.stringify(formData));

    const [stations, setStations] = useState<WeatherStation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(
            `/api/weatherstations?lat=${formData.latitude}&lon=${formData.longitude}&radius=${formData.radius}`
        )
            .then((response) => response.json())
            .then((data: WeatherStation[]) => {
                console.log("API-Daten:", data);
                setStations(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fehler beim Laden der Wetterstationen:", error);
                setLoading(false);
            });
    }, [formData.latitude, formData.longitude, formData.radius]);

    return (
        <div className="h-screen flex flex-col">
            <header className="text-white p-5">
                <h1 className="text-5xl font-bold">ClimateLens</h1>
                <p className="mt-2 text-lg">Wetterstationen finden - Trends entdecken</p>
            </header>

            <div className="content-center flex flex-1 h-full overflow-hidden">
                <div className="w-1/4 p-4 h-full overflow-y-auto">
                    <button
                        className="button p-2 m-2 !bg-pink-500 text-white rounded hover:bg-blue-600"
                        onClick={() => navigate("/")}
                    >
                        Zurück
                    </button>
                    <Sidebar stations={stations} loading={loading} />
                </div>

                <div className="flex-1 p-4 h-full">
                    <WeatherMap formData={{ ...formData, stations }} loading={loading} />
                </div>
            </div>
        </div>
    );
};

export default map;
