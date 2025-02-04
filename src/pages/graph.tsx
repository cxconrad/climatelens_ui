import React from "react";
import Header from "../layouts/header";
import WeatherChart, { WeatherApiResponse } from "../components/plot";
import { useLocation, Navigate } from "react-router-dom";

interface LocationState {
    weatherData: WeatherApiResponse;
}

const Main: React.FC = () => {
    const location = useLocation();
    const state = location.state as LocationState | null;

    // zu prüfen wie das Fehlerhandling hier läuft
    if (!state || !state.weatherData) {
        return <Navigate to="/map" replace />;
    }

    return (
        <div className="h-screen flex flex-col">
            <header className="text-white p-5">
                <h1 className="text-5xl font-bold">ClimateLens</h1>
                <p className="mt-2 text-lg">Wetterstationen finden - Trends entdecken</p>
            </header>

            <div className="content-center flex flex-1 overflow-hidden">

                <div className="w-1/4 p-4 h-90% overflow-y-auto ">


                </div>

                <div className="p-4">
                    <WeatherChart data={state.weatherData} selectedStation={state.weatherData.station_id.toString()} />
                </div>
            </div >
        </div >

    );
};

export default Main;
