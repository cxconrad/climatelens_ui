# ADR 001: Auswahl der Frontend-Technologien

## Kontext

Das Projekt ist ein kleines Universitätsprojekt, bei dem eine moderne und effiziente Frontend-Architektur benötigt wird. Die Hauptanforderungen sind:

- **Schnelle Entwicklung**: Da es ein kleines Projekt ist, soll die Entwicklung einfach und produktiv sein.
- **Gute Performance**: Das Frontend soll schnell laden und eine reaktive UI bieten.
- **Moderne Entwicklungsmethoden**: Nutzung von TypeScript zur besseren Code-Qualität und Tailwind CSS für effiziente Styles.
- **Einfache API-Integration**: Kommunikation mit einem REST-Backend.

## Entscheidung

Wir verwenden folgende Technologien für das Frontend:

- **Vite** als Build-Tool für eine schnelle Entwicklungsumgebung
- **TypeScript** zur Verbesserung der Code-Qualität
- **Tailwind CSS** für eine flexible und schnelle Gestaltung
- **REST-API** als Schnittstelle zur Kommunikation mit dem Backend

## Begründung

- **Vite** bietet eine extrem schnelle Entwicklungsumgebung und Hot Module Replacement (HMR), ideal für ein kleines Projekt.
- **TypeScript** hilft, Fehler frühzeitig zu erkennen und den Code wartbarer zu machen.
- **Tailwind CSS** ermöglicht eine schnelle und responsive Gestaltung ohne das Schreiben von eigenen CSS-Dateien.
- **REST-API** ist leicht zu implementieren und benötigt keine komplexe State-Management-Lösung wie GraphQL.

## Alternativen

### Webpack statt Vite
- **Vorteil**: Weit verbreitet und flexibel.
- **Nachteil**: Langsamere Build-Zeiten und mehr Konfigurationsaufwand.

### Vanilla CSS oder SCSS statt Tailwind CSS
- **Vorteil**: Volle Kontrolle über das Styling.
- **Nachteil**: Langsamere Entwicklung und höherer Wartungsaufwand.

### GraphQL statt REST
- **Vorteil**: Flexibler in der Datenabfrage.
- **Nachteil**: Höherer initialer Aufwand für ein kleines Projekt.

## Konsequenzen

### Positiv:
- Schnelle Entwicklung durch moderne Tools.
- Einfache Wartung durch TypeScript und Tailwind CSS.
- Gute Performance durch Vite.

### Negativ:
- Einarbeitung in Tailwind CSS für Entwickler ohne Vorerfahrung.
- Eventuell spätere Umstellung auf ein komplexeres Architekturmodell, falls das Projekt wächst.

## Status

**Beschlossen**

## Beteiligte

- [Dein Name]

## Datum

**Januar 2025**
