# Allgemeine Informationen

Die Services dienen der Kommunikation und Verarbeitung der Daten vom Backend. Sie können unter folgenden Ordner gefunden werden: [Services](../src/services/)

## [sendsearch.tsx](../src/services/sendsearch.tsx)
**Hauptfunktionalität:**
- Verarbeitung und Übertragung der Formulardaten, die von der Benutzeroberfläche (inputs.tsx in home.tsx) erfasst werden.
- Speicherung der Formulardaten in der sessionStorage, um diese später für weitere API-Aufrufe oder Navigationen bereitzuhalten.
- GET-Request an /stations-query unter Nutzung der Formulardaten (Latitude, Longitude, Radius, StationCount, Start- und Endjahr).
- Prüfung des HTTP-Response-Status sowie Validierung des Content-Type der Antwort.
- Bei erfolgreicher Antwort: Extraktion und Speicherung der Stationsdaten im JSON-Format in der sessionStorage und Navigation zur Kartenansicht (/map).
- Fehlerbehandlung mit Console-Logging und Benutzerfeedback mit Alert.

**Verwendete Bibliotheken/Frameworks:**
- React Router: Nutzung von NavigateFunction zur Navigation.
- Fetch API: Zur Durchführung der HTTP-Anfragen an das Backend.
- SessionStorage: Zum Zwischenspeichern von Formular- und API-Daten.

**Event-Handler & Callbacks:**
- handleSubmitForm dient als Callback-Funktion für den Formular-Submit-Event.
- Neben der Validierung und Speicherung der Formulardaten, wird der HTTP-Request durchgeführt und im Fehlerfall sowohl in der Konsole als auch per Alert kommuniziert.

## [fetchdata.tsx](../src/services/fetchdata.tsx)
**Hauptfunktionalität:**
- Abrufen von Wetterdaten basierend auf einer ausgewählten Station und einem angegebenen Datumsbereich (Nutzung von in der sessionStorage gespeicherten Formulardaten (Start- und Endjahr))
- Konstruktion der API-URL mit Query-Parametern (stationId, startYear, endYear).
- Fehlerbehandlung (falls Formulardaten fehlen oder die API keine Daten liefert).
- Speicherung der empfangenen Wetterdaten sowie der ausgewählten Station in der sessionStorage und Navigation zur Plot-Seite.

**Verwendete Bibliotheken/Frameworks:**
- React Router: Nutzung von NavigateFunction zur Navigation.
- Fetch API: Zur Durchführung der HTTP-Anfragen an das Backend.
- SessionStorage: Zum Zwischenspeichern von API-Daten.

**Event-Handler & Callbacks:**
- Die Funktion fetchData dient als Callback und übernimmt Parameter wie stationId, navigate und das station-Objekt.
- Implementierung eines try/catch-Blocks zur Fehlerbehandlung und Konsolenlogging.
