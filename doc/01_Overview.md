# Überblick des Frontend von ClimateLens
Das **Frontend von Climate Lens** ist wie folgt aufgebaut:

![Overview](../doc/img/Overview.png)

**React Router:** 
Der *App-Router*, basierend auf React Router, ermöglicht die Navigation zwischen den einzelnen *Pages* (Home, Map, Plot, Table).

**Komponentenstruktur und Hooks:**
Die einzelnen Seiten bestehen aus *Komponenten*, die jeweils eigene Zustandslogik implementiert haben. *Hooks* wie useEffect werden genutzt, um beim Laden der Komponente Initialisierungen (z. B. Datenabrufe oder das Setzen von Session Storage-Werten) durchzuführen.

**State Management und Session Storage:**
Neben der lokalen Zustandsverwaltung innerhalb der Komponenten (z. B. über useState) wird die Session Storage verwendet. Dies dient der speicherung von benutzerbezogene Daten und die Ergebnisse von API-Calls. Dies ermöglicht es, den Zustand zwischen den verschiedenen Seiten beizubehalten, ohne dass Daten bei der Navigation verloren gehen.

**Service-Aufrufe und API-Calls:**
In Service-Funktionen (siehe sendsearch.tsx und Fetchdata.tsx) werden API-Calls an das Backend ausgeführt, um die Wetterstationen und -daten zu erhalten. Die Ergebnisse dieser API-Calls werden anschließend verarbeitet und in den Session Storage abgelegt, sodass sie in den entsprechenden Komponenten weiterverwendet werden können.


## Technischer Aufbau
Die Anwendung ist als **Single-Page-Application (SPA)** aufgebaut und umfasst vier zentrale Seiten:

- [Home](../doc/02_home.md): Startseite mit Eingabeformular für Suchparameter.
- [ Map](../doc/03_map.md): Anzeige einer interaktiven Karte mit Suchradius und Liste der gefundenen Wetterstationen.
- [Plot](../doc/04_plot.md): Grafische Darstellung der Wetterdaten mittels interaktivem Diagramm.
- [Table](../doc/05_table.md): Darstellung der Wetterdaten in einer dynamisch sortierbaren und anpassbaren Tabelle.

In diesen Seiten werden unterstützende Komponenten, die die Funktionalität gewährleisten, verwendet. (z. B. Formulareingaben, Kartenanzeige, Station-Karten, Datenabruf).

## Systemablauf und Datenfluss
Folgendes Diagramm zeigt den gesamten Systemablauf und Datenfluss in der Anwendung aus Frontendperspektive.
<a href="../doc/img/Sequenz_Overview.png" target="_blank">
    <img src="../doc/img/Sequenz_Overview.png" alt="Sequenz">
</a>

## Verwendete Bibliotheken
- **react-hook-form:** Sorgt für die Validierung und effiziente Handhabung der Formulareingaben.
- **MapLibre GL:** Wird für die Anzeige der interaktiven Weltkarte eingesetzt.
- **Turf.js:** Generiert den GeoJSON-Kreis für den Suchradius.
- **Plotly:** Dient der Erstellung interaktiver Diagramme in der Plot-Seite.

