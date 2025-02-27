# Climate Lens Frontend
Diese Frontend ist Teil eines Universitätsprojekt, im Rahmen des Kurse WWI22ABC-5 Projekt / Anwendungsentwicklung, an der DHBW VS. 

Das Backend ist unter folgendem Link vorzufinden: [ClimateLens-Backend](https://github.com/FumiZwerg/ClimateLens-Backend)

Die Dokumentation ist unter folgenden Link vorzufinden: [Dokumentation](./doc/01_Overview.md)


## Anwendung im Container starten
### Voraussetzung 
- **Docker** Version 4.37.1 oder höher
- Windows 11
### Anwendung starten
```
cd ~
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/FumiZwerg/ClimateLens-Backend/main/docker-compose.yml" -OutFile "docker-compose.yml"
docker compose up -d
Start-Sleep -Seconds 120
Start-Process "http://localhost:4173"
```







