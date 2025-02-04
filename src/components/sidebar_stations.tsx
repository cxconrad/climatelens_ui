import React from "react";
import WeatherStationCard from "./stationcard";
import { WeatherStation } from "../pages/map";

interface SidebarProps {
    stations: WeatherStation[];
    loading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ stations, loading }) => {
    if (loading) {
        return (
            <div className="p-4 bg-gray-100 w-64">
                <p>Lade Wetterstationen ...</p>
            </div>
        );
    }

    if (!stations || stations.length === 0) {
        return (
            <div className="p-4 bg-gray-100 w-64">
                <p>Keine Stationen vorhanden.</p>
            </div>
        );
    }

    return (
        <div className="p-4 w-70% overflow-y-auto">
            {stations.map((station) => (
                <div
                    key={station.id}
                    className="mb-4 !bg-slate-800 rounded shadow p-4"
                >
                    <WeatherStationCard station={station} />
                </div>
            ))}
        </div>
    );

};

export default Sidebar;
