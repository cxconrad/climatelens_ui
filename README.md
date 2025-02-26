# Climate Lens Frontend
Diese Frontend ist Teil eines Universitätsprojekt an der DHBW VS.

Das Backend ist unter folgendem Link vorzufinden: [ClimateLens-Backend](https://github.com/FumiZwerg/ClimateLens-Backend)

## Anwendung lokal öffnen
### Voraussetzungen
* Node
* NPM

**Anwendung im Dev-Modus starten** <br>
```npm run dev ```

**Anwendung im Produktions-Modus starten**<br>
```npm run ....```



## Anwendung im Container starten
### :triangular_flag_on_post: Voraussetzung 
Docker

### Anwendung starten
```
docker run -d -p 8000:8000 ghcr.io/fumizwerg/..... 
docker run -d -p 4173:4173 ghcr.io/cxconrad/climatelens_ui:latest && start http://localhost:4173
```



## Ordner Struktur
├── src <br> 
│   ├── components<br>
│   │   ├── datatable.tsx <br>
│   │   ├── graph.tsx<br>
│   │   ├── inputs.tsx<br>
│   │   ├── sidebar_stations.tsx<br>
│   │   ├── stationcard.tsx<br>
│   │   └── worldmap.tsx<br>
│   ├── layouts<br>
│   │   └── header.tsx<br>
│   ├── pages<br>
│   │   ├── home.tsx<br>
│   │   ├── map.tsx<br>
│   │   ├── plot.tsx<br>
│   │   └── table.tsx<br>
│   ├── services<br>
│   │   ├── fetchdata.tsx<br>
│   │   └── sendsearch.tsx<br>
│   ├── App.css<br>
│   ├── App.tsx<br>
│   ├── index.css<br>
│   └── main.jsx<br>
├── .dockerignore<br>
├── .gitignore<br>
├── Dockerfile<br>
├── eslint.config.js<br>
├── index.html<br>
├── LICENSE<br>
├── package-lock.json<br>
├── package.json<br>
├── README.md<br>
└── tsconfig.json<br>




