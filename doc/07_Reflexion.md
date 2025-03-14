# Reflexion zur Codequalität

## Kontext

Ziel des Projektes war die Entwicklung eines Frontends für die ClimateLens-Anwendung.

## Ziel der Reflexion

Ziel dieser Reflexion ist es, den bestehenden Code kritisch zu evaluieren und potenzielle Optimierungspotenziale aufzuzeigen.

## Herausforderungen, Limitationen und Lösungsansätze

- Der Zugriff auf den sessionStorage erfolgt aktuell an mehreren Stellen redundant. Eine zentralisierte Funktion zum Handling dieser Zugriffe könnte zu besserer Wartbarkeit und Übersichtlichkeit des Codes beitragen.

- Wiederkehrende UI-Elemente wie die Sidebar in den Komponenten Plot und Table könnten in eigenständige Komponenten ausgelagert werden. Dies würde zu einer modularen Struktur und einem reibungsloseren Übergang zwischen Sidebar und Kartenansicht führen.

- Die Einhaltung der Clean-Code-Prinzipien ist derzeit nur eingeschränkt gegeben. Ursache hierfür sind unter anderem begrenzte Kenntnisse der Entwicklerin hinsichtlich spezifischer Methoden. Zukünftige Verbesserungen könnten daher schrittweise und unter Beachtung der bestehenden Funktionalität umgesetzt werden.

## Technische Schulden
Im Rahmen der Abnahme wurde vom Kunden vereinbart, dass das Frontend ausschließlich manuell getestet wird (Protokoll 4). Daher wurde auf die Implementierung automatisierter Unit-Tests zur Absicherung der Funktionen im Frontend verzichtet. 

## Fazit
Die Entwicklung des ClimateLens-Frontends stellte ein anspruchsvolles Projekt dar, das die Relevanz fundierter Programmiermethoden und -richtlinien sowie die effektive Zusammenarbeit in Projektteams hervorhebt. Trotz bestehender Herausforderungen arbeitet das Frontend erfolgreich, wenngleich in den genannten Bereichen weiterhin Optimierungspotenzial besteht.


