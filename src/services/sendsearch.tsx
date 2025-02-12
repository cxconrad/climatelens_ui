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
            `/stations-query?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}&count=${data.stationCount}`
        );



        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Wetterstationen");
        }

        const stations = await response.json();
        console.log("Wetterstationen geladen:", stations);

        sessionStorage.setItem("stations", JSON.stringify(stations));

        navigate("/map", { state: { ...data, stations } });
    } catch (error) {
        console.error("Fehler beim Verarbeiten des Formulars:", error);
    }
};
