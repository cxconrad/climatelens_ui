/* 
Wird aufgerufen, sobald in der Seitenleiste (stationcard.tsx) auf „Wetterdaten ansehen” geklickt wird.
Schickt einen GET-Request an /station/data, um die Wetterdaten für die gewählte Station zu laden.
Speichert die empfangenen Wetterdaten in sessionStorage und navigiert dann zur Plot-Seite (/plot), wo die Daten grafisch dargestellt werden.
*/

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

        const apiUrl = `http://localhost:8000/station/data?stationId=${stationId}&startYear=${startDate}&endYear=${endDate}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); 

        const response = await fetch(apiUrl, { signal: controller.signal });

        clearTimeout(timeoutId); 
        if (!response.ok) {
            if (response.status === 404) {
                alert("Es sind keine Wetterdaten für die ausgewählte Station vorhanden.");
                return;
            }
            throw new Error("Fehler beim Abrufen der Wetterdaten.");
        }

        const data = await response.json();
        console.log("Erhaltene Wetterdaten:", data);

        sessionStorage.setItem("weatherData", JSON.stringify(data));
        sessionStorage.setItem("selectedStation", JSON.stringify(station));
        navigate("/plot", { state: { weatherData: data, station } });
        
    } catch (error) {
        if ((error as Error).name === "AbortError") {
            console.error("Fehler: Der Request hat zu lange gedauert und wurde abgebrochen.");
            alert("Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es später erneut.");
        } else {
            console.error("Fehler: Bitte prüfen sie den Code.", error);
        }
    }
};
