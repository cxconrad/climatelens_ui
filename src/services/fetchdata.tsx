import { NavigateFunction } from "react-router-dom";

export const fetchData = async (
    stationId: number,
    navigate: NavigateFunction,
    station: any
) => {
    try {
        const formDataString = sessionStorage.getItem("formData");

        if (!formDataString) {
            console.error("Keine Formulardaten in SessionStorage gefunden.");
            return;
        }

        const formData = JSON.parse(formDataString);
        const startDate = formData.startYear;
        const endDate = formData.endYear;

        if (!startDate || !endDate) {
            console.error("Start- oder Enddatum fehlt in der Session.");
            return;
        }

        const apiUrl = `http://127.0.0.1:8000/api/weatherstation/${stationId}/weatherdata?start=${startDate}&end=${endDate}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Wetterdaten.");
        }

        const data = await response.json();
        console.log("Erhaltene Wetterdaten:", data);

        sessionStorage.setItem("weatherData", JSON.stringify(data));

        sessionStorage.setItem("selectedStation", JSON.stringify(station));

        navigate("/graph", { state: { weatherData: data, station } });
    } catch (error) {
        console.error("Fehler:", error);
    }
};
