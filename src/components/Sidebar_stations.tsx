import WeatherStationCard from "./Stationcard";
import { WeatherStation } from "../pages/Map";

interface SidebarProps {
    stations: WeatherStation[];
    loading: boolean;
}

const sidebar = ({ stations, loading }: SidebarProps) => {
    if (loading) {
        return (
            <div className="p-4 bg-gray-100 w-64 h-full">
                <p>Lade Wetterstationen ...</p>
            </div>
        );
    }

    if (!stations || stations.length === 0) {
        return (
            <div className="p-4 font-bold text-white w-64 h-full">
                <p>Keine Stationen vorhanden.</p>
            </div>
        );
    }

    return (
        <div className="p-8 h-full overflow-y-auto">
            {stations.map((station) => (
                <div
                    key={station.id}
                    className="mb-4 bg-slate-800 rounded shadow p-4">
                    <WeatherStationCard station={station} />
                </div>
            ))}
        </div>
    );
};

export default sidebar;
