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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); 

        const response = await fetch(
            `http://localhost:8000/stations-query?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}&count=${data.stationCount}&startYear=${data.startYear}&endYear=${data.endYear}`,
            { cache: "no-store", signal: controller.signal } 
        );

        clearTimeout(timeoutId); 

        if (!response.ok) {
            throw new Error("Stationsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Stationsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
        }

        const stations = await response.json();
        console.log("Wetterstationen geladen:", stations);
        sessionStorage.setItem("stations", JSON.stringify(stations));
        navigate("/map", { state: { ...data, stations } });

    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            console.error("Fehler: Der Request hat zu lange gedauert und wurde abgebrochen.");
            alert("Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es später erneut.");
        } else {
            console.error("Fehler beim Verarbeiten des Formulars:", error);
            alert(error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten");
        }
    }
};
