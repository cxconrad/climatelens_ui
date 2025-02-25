import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WeatherMap from "../components/worldmap";
import Sidebar from "../components/sidebar_stations";
import Header from "../layouts/header";

export interface WeatherStation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
    startYear: number;
    endYear: number;
}

export interface LocationState {
    longitude: number;
    latitude: number;
    radius: number;
    stationCount: number;
    startYear: number;
    endYear: number;
    stations?: WeatherStation[];
}

const map = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let formData = location.state as LocationState | undefined;

    if (!formData) {
        const storedData = sessionStorage.getItem("formData");
        if (storedData) {
            formData = JSON.parse(storedData) as LocationState;
            console.log("Formulardaten aus sessionStorage geladen:", formData);
        } else {
            console.warn("Keine Formulardaten in sessionStorage gefunden.");
        }
    }

    if (!formData) {
        return <p>Keine Formulardaten vorhanden.</p>;
    }

    const storedStations = sessionStorage.getItem("stations");
    const initialStations = formData.stations || (storedStations ? JSON.parse(storedStations) : []);

    const [stations, setStations] = useState<WeatherStation[]>(initialStations);
    const [loading, setLoading] = useState<boolean>(!initialStations.length);

    useEffect(() => {
        if (!stations.length) {
            console.warn("Keine Wetterstationen in sessionStorage gefunden.");
            setLoading(false);
        } else {
            console.log("Wetterstationen erfolgreich aus sessionStorage geladen.");
        }
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="content-center flex overflow-y-hidden overflow-x-hidden">
                <div className="w-1/4 p-4 h-12/13">
                    <button
                        className="button p-2 m-2 !bg-pink-500 text-white rounded hover:bg-blue-600"
                        onClick={() => navigate("/")}>
                        Zurück
                    </button>
                    <Sidebar stations={stations} loading={loading} />
                </div>
                <div className="flex-1 p-4 h-full overflow-hidden">
                    <WeatherMap formData={{ ...formData, stations }} loading={loading} />
                </div>
            </div>
        </div>
    );
};

export default map;
