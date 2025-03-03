# Erläuterungen zur Seite "Home (Home.tsx)"

*Datei:* [Home.tsx](../src/pages/Home.tsx)

**Funktionalität und Aufgaben:**
- **Einstiegspunkt:** Die Home-Seite stellt den Einstieg in die Applikation dar. Sie zeigt den Titel „ClimateLens“ sowie einen Slogan an(„Wetterstationen finden – Trends entdecken“).
- **Eingabeformular:**
Das Formular, realisiert über die Komponente Inputs.tsx, ermöglicht die Eingabe von Suchparametern:
    - Geographische Koordinaten 
    - Suchradius in Kilometern
    - Anzahl der anzuzeigenden Wetterstationen
    - Zeitspanne definiert durch Start- und Endjahr
- **Formular-Submission (Integration von sendsearch.tsx):**
    - Beim Klick auf „Wetterstation suchen“ wird die Funktion handleSubmitForm aus sendsearch.tsx aufgerufen. Diese führt folgende Schritte durch:
    - Persistenz der Formulardaten: Die eingegebenen Werte werden im sessionStorage unter dem Schlüssel "formData" gespeichert.
    - API-Aufruf: Es wird ein GET-Request an den Endpunkt /stations-query gesendet, wobei die Formulardaten als Query-Parameter übermittelt werden.
    - Verarbeitung der Antwort: Bei erfolgreicher Antwort werden die zurückgelieferten Stationen in sessionStorage unter dem Schlüssel "stations" abgelegt.
    - Navigation: Anschließend wird der Nutzer über navigate zur Map-Seite weitergeleitet, wobei sowohl die Formulardaten als auch die ermittelten Wetterstationen als Zustandsdaten übergeben werden.

Folgende Grafik dient der Veranschaulichung der Struktur: ![Overview](../doc/img/Home_Page.png)

## Technische Details:

- **Regeln:** Die Eingabefelder werden durch die Hilfskomponente FormInput verwaltet, die neben typisierten Eigenschaften auch Input-Masking (z. B. Erlauben von Zahlen, Komma und Punkt) implementiert.
- **Validierung:** Mithilfe von react-hook-form werden Eingaben validiert (z. B. Bereiche für Koordinaten, Beschränkungen bei Jahreszahlen).
- **Persistenz:** Ringegebene Formulardaten werden aus dem sessionStorage geladen, um eine Wiederherstellung der Nutzereingaben zu ermöglichen.
- **User Interface:**
Zusätzlich wird ein Info-Tooltip angeboten, der die Eingabe in Dezimalgrad erläutert.


## Verwendete Komponenten
Hervorgehend aus der Aufbauansicht werden auf der Seite folgenden Komponenten verwendet:

- [Input-Form](../src/components/inputs.tsx)

Folgender Service wird im Rahmen der Input-Form verwendet: 
- [Send search](../src/services/sendsearch.tsx)

