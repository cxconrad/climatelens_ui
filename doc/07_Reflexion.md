# Reflexion
### Kontext
Ziel im Rahmen dieses Projektes war die Entwicklung eines Frontends für die ClimateLens-Anwendung.

### Ziel der Reflexion:
Mit dieser Reflexion sollen der Code kritisch reflektiert werden.

## Herausforderungen, Limitationen und Lösungsansätze
- In mehreren Instanzen wird der sessionStorage abgerufen. Für ein besseres Handling wäre hier eine ausgelagerte Funktion vorteilhaft.
- Elemente wie die Sidebar in Plot und Table könnten in Komponenten ausgelagert werden. Dies würde u.a. für einen flüssigeren Übergang von der Sidebar in der Map-Ansicht sorgen.
- Anzeigeregeln für die fehlenden Werte in der Tabelle, die als leere Werte vom Backend mitgegeben werden, implementiert werden. Somit könnte die UX optimiert werden, besonders bei Anfragen über einen größeren Zeitraum könnte dies Vorteile bringen.
- Der Code könnte weitaus mehr den Clean Code Prinzipien folgen, jedoch sind hier die Entwickler-Kenntnisse limitiert, um ggf. eine Anpassung ohne Verlust der Funktionen zu ermöglichen.
