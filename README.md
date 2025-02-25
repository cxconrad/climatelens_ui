# Climate Lens Frontend
Diese Frontend ist Teil eines Universitätsprojekt an der DHBW VS.

Das Backend ist unter folgendem Link vorzufinden: [ClimateLens-Backend](https://github.com/FumiZwerg/ClimateLens-Backend)

## Voraussetzungen


## Anwendung starten
docker run -d -p 4173:4173 ghcr.io/cxconrad/climatelens_ui:latest && start http://localhost:4173


## Ordner Struktur
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




