import { NavigateFunction } from "react-router-dom"; // Import der NavigateFunction

// Funktion zum Abrufen der Wetterdaten
export const fetchData = async (
    stationId: number,
    navigate: NavigateFunction,
    station: any
) => {
    try {
        // Parameter: stationId, navigate-Funktion, station
        // stationId: ID der ausgewählten Station
        // navigate: Funktion zum Navigieren zur nächsten Seite
        // station: Objekt mit Informationen zur ausgewählten Station
        const formDataString = sessionStorage.getItem("formData");

        if (!formDataString) {
            console.error("Keine Formulardaten in SessionStorage gefunden.");
            return;
        }
        // Auslesen der Start- und Enddaten aus der Session damit die Daten für den API-Aufruf vorhanden sind
        const formData = JSON.parse(formDataString);
        const startDate = formData.startYear;
        const endDate = formData.endYear;

        if (!startDate || !endDate) {
            console.error("Start- oder Enddatum fehlt in der Session.");
            return;
        }
        // API-URL für den Abruf der Wetterdaten
        const apiUrl = `/station/data?stationId=${stationId}&startYear=${startDate}&endYear=${endDate}`;
        const response = await fetch(apiUrl);
        // Error-Handling vom Frontend:
        if (!response.ok) {
            // Backend sendet 404 für den Fall, dass keine Daten in diesem Zeitraum vorhanden sind
            if (response.status === 404) {
                alert("Es sind keine Wetterdaten für die ausgewählte Station vorhanden.");
                return;
            }
            throw new Error("Fehler beim Abrufen der Wetterdaten.");
        }
        // Wenn die Daten erfolgreich abgerufen wurden, werden sie in der Session gespeichert und die nächste Seite wird aufgerufen
        const data = await response.json();
        console.log("Erhaltene Wetterdaten:", data);

        sessionStorage.setItem("weatherData", JSON.stringify(data));
        sessionStorage.setItem("selectedStation", JSON.stringify(station));
        navigate("/plot", { state: { weatherData: data, station } });
    }
    // Error-Handling für die Konsole für den Fall, dass ein Fehler auftritt
    catch (error) {
        console.error("Fehler: Bitte prüfen sie den Code. ", error);
    }
};
