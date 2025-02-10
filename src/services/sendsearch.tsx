export const sendDataToBackend = async (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    console.log("Gesendete Daten:", jsonData);

    try {
        const response = await fetch("https://dein-backend.com/api/submit", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: jsonData,
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Senden: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("✅ Server Response:", responseData);
        return responseData;
    } catch (error) {
        console.error("Fehler beim Senden:", error);
        throw error;
    }
};
