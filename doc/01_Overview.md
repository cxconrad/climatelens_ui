# Überblick des Frontend von ClimateLens



Das **Frontend von Climate Lens** ist wie folgt aufgebaut:

Die Nutzerinteraktion wird maßgeblich vom **App-Router** gesteuert, der das Navigieren zwischen den einzelnen Pages ermöglicht. Auf diesen Pages befinden sich **Komponenten**, in denen **Hooks** wie useEffect zum Einsatz kommen, um Aktionen beim Laden der jeweiligen Komponente auszuführen. Diese Hooks greifen wiederum auf **Services** zu, genauer gesagt auf **API-Calls**, welche das Backend ansprechen. Die Ergebnisse dieser API-Calls werden anschließend im **Session Storage** abgelegt. Ebenso werden die vom Nutzer im Frontend eingegebenen Parameter mithilfe von Hooks im Session Storage gespeichert.

![Flow Chart](../doc/img/Flow-Chart.png)

## Systemablauf und Datenfluss
<a href="../doc/img/Sequenz_Overview.png" target="_blank">
    <img src="../doc/img/Sequenz_Overview.png" alt="Sequenz" />
</a>


## Pages Dokumentation
- [Home](../doc/02_home.md): Dokumentaion für Startseite mit Eingabemaske<br>
- [ Map](../doc/03_map.md): Dokumentation für Kartenansicht <br>
- [Plot](../doc/04_plot.md): Dokumentation für Plotansicht<br>
- [Table](../doc/05_table.md): Dokumentation für Tableansicht <br>
- [Services](../doc/05_table.md): Dokumentation für die API-Calls <br>


## Ordner Struktur

```
├── .github
│   ├── workflows
│   │   ├── docker-image.yml
├── doc
│   ├── img
│   │   ├── docker-image.yml
│   ├── 00_frontend-archtiecture-descisions.md
│   ├── 01_Overview.md
│   ├── 02_Home.md
├── public
│   ├── icon.png
├── src
│   ├── components 
│   │   ├── datatable.tsx
│   │   ├── graph.tsx
│   │   ├── inputs.tsx
│   │   ├── sidebar_stations.tsx
│   │   ├── stationcard.tsx
│   │   └── worldmap.tsx
│   ├── layouts
│   │   └── header.tsx
│   ├── pages
│   │   ├── home.tsx
│   │   ├── map.tsx
│   │   ├── plot.tsx
│   │   └── table.tsx
│   ├── services
│   │   ├── fetchdata.tsx
│   │   └── sendsearch.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.jsx
├── .dockerignore 
├── .gitignore
├── Dockerfile
├── eslint.config.js 
├── index.html 
├── LICENSE 
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```


