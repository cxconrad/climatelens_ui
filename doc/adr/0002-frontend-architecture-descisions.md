
# ADR 002: Auswahl der Frontend-Technologien

## Status
**Beschlossen**

## Kontext
Das Projekt ist ein kleines Universitätsprojekt, bei dem eine moderne und effiziente Frontend-Architektur benötigt wird. Die Hauptanforderungen sind:

- **Schnelle Entwicklung**: Da es ein kleines Projekt ist, soll die Entwicklung einfach und produktiv sein.
- **Gute Performance**: Das Frontend soll schnell laden und eine reaktive UI bieten.
- **Einfache API-Integration**: Kommunikation mit einem REST-Backend.

## Entscheidung
Wir verwenden folgende Technologien für das Frontend:

- **Vite** als Build-Tool 
- **React** als JavaScript-Framework
- **TypeScript**
- **Tailwind CSS**
- **REST API**

## Begründung
- **Vite**: Sehr schnelle Entwicklungsumgebung und optimale Performance.
- **React**: Flexibles und weit verbreitetes JavaScript-Framework für komponentenbasierte Entwicklung.
- **TypeScript**: Verbesserte Code-Qualität durch statische Typisierung und bessere Wartbarkeit.
- **Tailwind CSS**: Utility-First CSS-Framework für schnelles Styling ohne das Schreiben von zusätzlichen CSS-Dateien.
- **REST API**: Vorgabe des Projekts.

## Konsequenzen
- Entwickler müssen sich an den **Utility-First** Ansatz von Tailwind CSS gewöhnen.
- Die Architektur basiert auf **Client-Side Rendering (CSR)**.
- Die Anwendung bleibt leichtgewichtig und schnell.

## Beteiligte
- **Chantal Conrad** (Frontend Developerin)

## Datum
31. Januar 2025

