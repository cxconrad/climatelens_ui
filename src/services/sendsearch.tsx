import { NavigateFunction } from "react-router-dom";

// Typ für die Formulardaten
export interface FormData {
    longitude: number;
    latitude: number;
    radius: number;
    stationCount: number;
    startYear: number;
    endYear: number;
}

// Funktion zum Verarbeiten des Formulars
// Parameter: data: FormData, navigate: NavigateFunction
// data: Formulardaten

export const handleSubmitForm = async (data: FormData, navigate: NavigateFunction) => {
    try {
        sessionStorage.setItem("formData", JSON.stringify(data));

        const response = await fetch(
            `/stations-query?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}&count=${data.stationCount}`,
            { cache: "no-store" } // erzwingt eine neue Anfrage, um den Cache zu umgehen
        );

        // Explizit 304 behandeln -> Windows Error wenn Backend nicht erreichbar
        if (response.status === 304) {
            throw new Error("Stationsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
        }

        // Allgemeine Prüfung auf einen fehlerhaften Response-Status
        if (!response.ok) {
            throw new Error("Stationsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
        }

        // Optional: Sicherstellen, dass die Antwort auch JSON enthält
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Ungültige Antwort vom Server (kein JSON).");
        }

        const stations = await response.json();
        console.log("Wetterstationen geladen:", stations);

        sessionStorage.setItem("stations", JSON.stringify(stations));
        navigate("/map", { state: { ...data, stations } });
    }
    catch (error) {
        console.error("Fehler beim Verarbeiten des Formulars:", error);
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("Ein unbekannter Fehler ist aufgetreten");
        }
    }
};
