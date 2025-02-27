# Erläuterungen zur Seite "Home (Home.tsx)"
Die Seite [Home](../src/pages/Home.tsx) dient als Startseite der Anwendung und verfügt über die Eingabemaske der Suchparameter. Der Aufbau und die grundlegende Funktion der Seite ist wie folgt, darzustellen:

![Overview](../doc/img/Home_Page.png)

## Verwendete Komponenten
Hervorgehend aus der Aufbauansicht werden auf der Seite folgenden Komponenten verwendet:

- [Input-Form](../src/components/inputs.tsx)

Folgender Service wird im Rahmen der Input-Form verwendet: 
- [Send search](../src/services/sendsearch.tsx)



## Klassendiagramm
⚠ **Hinweis zur UML-Darstellung**  
Das UML-Diagramm dient als **abstrahierte Visualisierung** der `home.tsx`-Architektur. Da React/TypeScript **Funktionskomponenten und Hooks** nutzt, werden einige Elemente wie `render()` oder Komponenten als Klassen dargestellt, obwohl sie in der Realität reine Funktionen sind.



![Detailed](../doc/img/Home.png)