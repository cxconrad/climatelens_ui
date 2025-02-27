# Climate Lens Frontend
Diese Frontend ist Teil eines Universitätsprojekt, im Rahmen des Kurse WWI22ABC-5 Projekt / Anwendungsentwicklung, an der DHBW VS. 

Das Backend ist unter folgendem Link vorzufinden: [ClimateLens-Backend](https://github.com/FumiZwerg/ClimateLens-Backend)

Die Dokumentation ist unter folgenden Link vorzufinden: [Dokumentation](./doc/01_Overview.md)

## Anwendung (Frontend) lokal öffnen
### Voraussetzungen
* Node
* NPM

**Anwendung im Dev-Modus starten** <br>
```npm run dev ```

**Anwendung im Produktions-Modus starten**<br>
```npm run ....```



## Anwendung im Container starten
### Voraussetzung 
Docker

### Anwendung starten
```
docker run -d -p 8000:8000 ghcr.io/fumizwerg/..... 
docker run -d -p 4173:4173 ghcr.io/cxconrad/climatelens_ui:latest && start http://localhost:4173
```







