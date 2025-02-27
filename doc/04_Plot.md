# Erläuterungen zur Seite "Plot (plot.tsx)"
Die Seite [Plot](../src/pages/map.tsx) wird nach Auswahl von Wetterdaten anzeigen von der [Map](../src/pages/map.tsx) angezeigt. Sie dient der Anzeige der vorhandenen Wetterdaten. Der Aufbau und die grundlegende Funktion der Seite ist wie folgt, darzustellen:

![Overview](../doc/img/Plot_Page.png)


## Verwendete Komponenten
Hervorgehend aus der Aufbauansicht werden auf der Seite folgenden Komponenten verwendet:
- [Graph](../src/components/graph.tsx)
- [Header](../src/layouts/header.tsx)


## Klassendiagramm
⚠ **Hinweis zur UML-Darstellung**  
Dieses UML-Diagramm dient zur konzeptionellen Veranschaulichung der Architektur unserer React/TypeScript-App.  
Da wir überwiegend **Funktionskomponenten und Interfaces** verwenden, werden einige Elemente wie Methoden (`render()`) und Klassen (`class`) in der UML abstrahiert dargestellt.  
Besonders zu beachten:  
- TypeScript-**Interfaces** (z. B. `WeatherData`) erscheinen als Klassen, um Relationen darzustellen.  
- Funktionskomponenten sind in der UML als Klassen mit `render()` modelliert, da UML keine direkte Darstellung für React-Hooks bietet.  


![Detail](../doc/img/Plot.png)