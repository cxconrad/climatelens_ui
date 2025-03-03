
# ADR 002: Auswahl der Frontend-Technologien

## Datum
31. Januar 2025

## Status
**Beschlossen**

## Kontext
Das Projekt ist ein kleines Universitätsprojekt, bei dem eine moderne und effiziente Frontend-Architektur benötigt wird. Die Hauptanforderungen sind:

- **Schnelle Entwicklung**: Da es ein kleines Projekt ist, soll die Entwicklung einfach und produktiv sein.
- **Gute Performance**: Das Frontend soll schnell laden und eine reaktive UI bieten.
- **Einfache API-Integration**: Kommunikation mit einem REST-Backend.

## Entscheidung
Wir setzen im Frontend folgende Technologien ein:

- Vite: Schnelles Build-Tool für eine effiziente Entwicklungsumgebung und optimale Performance.
- React: Weit verbreitetes, komponentenbasiertes JavaScript-Framework für flexible UI-Entwicklung.
- TypeScript: Statistisch typisierte Erweiterung von JavaScript zur Verbesserung der Code-Qualität und Wartbarkeit.
- Tailwind CSS: Utility-First CSS-Framework, das schnelles Styling ermöglicht, ohne zusätzliche CSS-Dateien schreiben zu müssen.
- REST API: Vorgabe des Projekts für die Kommunikation zwischen Client und Server.

## Konsequenzen
- Die Architektur basiert auf **Client-Side Rendering (CSR)**.
- Die Anwendung bleibt leichtgewichtig und schnell.
- Ein Ausbau der Seite würde größeren Aufwand bedeuten.

