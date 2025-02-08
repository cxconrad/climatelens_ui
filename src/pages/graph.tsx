import React from "react";
import WeatherChart, { WeatherApiResponse } from "../components/plot";
import { useLocation, useNavigate, Navigate } from "react-router-dom";


interface Locations {
    weatherData: WeatherApiResponse;
    station: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        distance: number;
    };
}

const graph = () => {
    const location = useLocation();
    const state = location.state as Locations | null;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/map");
    };

    const handleTableView = () => {
        navigate("/table", { state });
    };

    if (!state || !state.weatherData) {
        return <Navigate to="/map" replace />;
    }

    return (
        <div className="h-screen flex flex-col">
            <header className="text-white p-5">
                <h1 className="text-5xl font-bold">ClimateLens</h1>
                <p className="mt-2 text-lg">Wetterstationen finden - Trends entdecken</p>
            </header>

            <div className="flex flex-1">

                <div className="w-1/4 p-4 overflow-y-auto text-white">
                    <button className="p-2 m-2 !bg-pink-500 text-white rounded hover:bg-blue-600" onClick={handleBack}>
                        Zurück
                    </button>
                    <div className="bg-slate-800 content-center p-5">
                        <div className="text-xl font-bold">{state.station.name}</div>
                        <p className="mt-2">
                            <strong>Koordinaten: </strong> {state.station.latitude}° N, {state.station.longitude}° E
                        </p>
                        <p>
                            <strong>Entfernung: </strong> {state.station.distance} km
                        </p>
                        <button
                            className="button p-2 m-2 !bg-violet-600 text-white rounded hover:bg-blue-600"
                            onClick={handleTableView}
                        >
                            Tabelle anzeigen
                        </button>
                    </div>
                </div>

                <div className="p-4 flex-grow">
                    <WeatherChart
                        data={state.weatherData}
                        selectedStation={state.weatherData.station_id?.toString() ?? "Unbekannt"}
                    />
                </div>
            </div>
        </div>
    );
};

export default graph;
