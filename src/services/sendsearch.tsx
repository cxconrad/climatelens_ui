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
// navigate: Funktion zum Navigieren zur nächsten Seite (React Router)
// Rückgabetyp: Promise<void>  (Promise, dass nichts zurückgibt)

export const handleSubmitForm = async (data: FormData, navigate: NavigateFunction) => {
    try {
        sessionStorage.setItem("formData", JSON.stringify(data));

        const response = await fetch(
            `/stations-query?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}&count=${data.stationCount}`
        );
        if (!response.ok) {
            let errorMessage = "Stationsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.";
            throw new Error(errorMessage);
        }

        const stations = await response.json();
        console.log("Wetterstationen geladen:", stations);

        sessionStorage.setItem("stations", JSON.stringify(stations));
        // Navigieren zur nächsten Seite mit den Formulardaten und den geladenen Wetterstationen
        navigate("/map", { state: { ...data, stations } });

    }
    // Error-Handling für die Konsole für den Fall, dass ein Fehler auftritt
    catch (error) {
        console.error("Fehler beim Verarbeiten des Formulars:", error);
        if (error instanceof Error) {
            alert(error.message); // Zeigt die Fehlermeldung dem Benutzer an
        } else {
            alert("Ein unbekannter Fehler ist aufgetreten");
        }
    }
};