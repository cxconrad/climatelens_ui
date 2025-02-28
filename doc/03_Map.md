# Erläuterungen zur Seite "Map (Map.tsx)"
Die Seite [Map](../src/pages/map.tsx) wird nach erfolgreichen Suche (Backend verfügbar) angezeigt. Sie dient der Anzeige der verfügbaren Stationen. Der Aufbau und die grundlegende Funktion der Seite ist wie folgt, darzustellen:

![Overview](../doc/img/Map_Page.png)

## Verwendete Komponenten
Hervorgehend aus der Aufbauansicht werden auf der Seite folgenden Komponenten verwendet:

- [Sidebar-Stations](../src/components/sidebar_stations.tsx)
- [Station Card](../src/components/stationcard.tsx)
- [World Map](../src/components/worldmap.tsx)

Im Rahmen der Abfrage nach Wetterdaten wird folgender Service aufgerufen: 
- [Fetch Data](../src/services/fetchdata.tsx)
