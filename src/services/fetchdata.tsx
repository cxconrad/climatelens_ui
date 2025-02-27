/* 
Wird aufgerufen, sobald in der Seitenleiste (stationcard.tsx) auf „Wetterdaten ansehen” geklickt wird.
Schickt einen GET-Request an /station/data, um die Wetterdaten für die gewählte Station zu laden.
Speichert die empfangenen Wetterdaten in sessionStorage und navigiert dann zur Plot-Seite (/plot), wo die Daten grafisch dargestellt werden.
*/
import { NavigateFunction } from "react-router-dom";

// Funktion zum Abrufen der Wetterdaten
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
        // Auslesen der Start- und Enddaten aus der Session damit die Daten für den API-Aufruf vorhanden sind
        const formData = JSON.parse(formDataString);
        const startDate = formData.startYear;
        const endDate = formData.endYear;

        if (!startDate || !endDate) {
            console.error("Start- oder Enddatum fehlt in der Session.");
            return;
        }
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
