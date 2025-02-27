/* 
Wird im Formular (inputs.tsx) aufgerufen, wenn die Benutzer:in auf „Wetterstation suchen” klickt.
Schickt die Formulardaten an das Backend (GET-Request an /stations-query).
Speichert bei erfolgreicher Antwort die zurückgelieferten Stationen in sessionStorage.
Leitet anschließend zur Kartenansicht (/map) weiter.
*/

import { NavigateFunction } from "react-router-dom";

export interface FormData {
    longitude: number;
    latitude: number;
    radius: number;
    stationCount: number;
    startYear: number;
    endYear: number;
}

export const handleSubmitForm = async (data: FormData, navigate: NavigateFunction) => {
    try {
        sessionStorage.setItem("formData", JSON.stringify(data));

        const response = await fetch(
            `/stations-query?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}&count=${data.stationCount}&startYear=${data.startYear}&endYear=${data.endYear}`,
            { cache: "no-store" } // erzwingt eine neue Anfrage, um den Cache zu umgehen
        );

        // Allgemeine Prüfung auf einen fehlerhaften Response-Status
        if (!response.ok) {
            throw new Error("Stationsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
        }

        // Windows Error wenn Backend nicht erreichbar
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Stationsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
        }
        // Wenn die Antwort erfolgreich ist, werden die Wetterstationen geladen
        const stations = await response.json();
        console.log("Wetterstationen geladen:", stations);
        sessionStorage.setItem("stations", JSON.stringify(stations));
        navigate("/map", { state: { ...data, stations } });
    }
    // Fehlerbehandlung für Entwicklung und Debugging
    catch (error) {
        console.error("Fehler beim Verarbeiten des Formulars:", error);
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("Ein unbekannter Fehler ist aufgetreten");
        }
    }
};
