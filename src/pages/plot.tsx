import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Header from "../layouts/header";
import WeatherChart, { WeatherApiResponse } from "../components/graph";


interface Locations {
    weatherData: WeatherApiResponse;
    station: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        distance: number;
        startYear: number;
        endYear: number;
    };
}

const graph = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let state = location.state as Locations | null;

    if (!state) {
        const storedWeatherData = sessionStorage.getItem("weatherData");
        const storedStation = sessionStorage.getItem("selectedStation");

        if (storedWeatherData && storedStation) {
            state = {
                weatherData: JSON.parse(storedWeatherData),
                station: JSON.parse(storedStation),
            };
            console.log("Daten aus sessionStorage geladen:", state);
        }
    }

    if (!state || !state.weatherData || !state.station) {
        console.error("Fehler: Keine Stationsdaten gefunden.");
        return <Navigate to="/map" replace />;
    }

    sessionStorage.setItem("selectedStation", JSON.stringify(state.station));
    sessionStorage.setItem("weatherData", JSON.stringify(state.weatherData));

    const handleBack = () => {
        navigate("/map");
    };

    const handleTableView = () => {
        navigate("/table", { state });
    };

    return (
        <div className="h-screen overflow-y-auto flex flex-col">
            <Header />
            <div className="flex flex-1">
                <div className="w-1/4 p-4 overflow-y-auto text-white">
                    <button className="p-2 m-2 !bg-pink-500 text-white rounded hover:bg-blue-600" onClick={handleBack}>
                        Zurück
                    </button>
                    <div className="bg-slate-800 content-center p-5 m-4">
                        <div className="text-2xl font-bold">
                            {state.station?.name ?? "Unbekannte Station"}
                        </div>
                        <p className="mt-2">
                            <strong>Koordinaten: </strong>
                            <p> B: {state.station?.latitude}</p>
                            <p> L: {state.station?.longitude}</p>
                        </p>
                        <p>
                            <strong>Entfernung: </strong>
                            {state.station?.distance} km
                        </p>
                        <button
                            className="button p-2 m-2 !bg-violet-600 text-white rounded hover:bg-blue-600"
                            onClick={handleTableView}
                        >
                            Tabelle anzeigen
                        </button>
                    </div>
                </div>

                <div className="p-4 overflow-y-auto flex">
                    <WeatherChart
                        data={state.weatherData}
                        selectedStation={state.weatherData?.station_id?.toString() ?? "Unbekannt"}
                    />
                </div>
            </div>
        </div>
    );
};

export default graph;
