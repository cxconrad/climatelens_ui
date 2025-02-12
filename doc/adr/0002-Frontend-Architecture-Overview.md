# Frontend Architecture

## Home
Der Nutzer gelangt beim Laden der Webanwendung auf die [Home-Seite](.../src/home.tsx). In dieser ist die Eingabemask für die [Suche der Webstation](inputs.tsx) integriert. Bei Absenden der Formulardaten werden diese
1. in der Session Storage gespeichert
2. über die [Send Search](sendsearch.tsx) an das Backend gesendet.
3. Bei erfolgreic


## Map


## Plot


## Table

## Navigation
Die Navigation wird würde die Router-Funktion von React gehandelt. In der [App.tsx](App.tsx) Datei sind die Routen festgelegt. Die Funktion ist Nativ für React und werden über 
    ```import { BrowserRouter as Router, Routes, Route } from "react-router-dom";```
aktiviert.


# API Verwaltung
Die API-Calls werden über die Dateien [Fetch Data](fetchdata.tsx) und [Send Search](sendsearch.tsx) verarbeitet. 
- Sendsearch ist für die initale Abfrage der Stationen nach Eingabe im [Home](home.tsx) zuständig. 
- Fetchdata is für die Abfrage der Wetterdaten der ausgewählten Station zuständig.

Die Componenten (Karte, Plot, Tabelle) der jeweilligen Seite greifen nicht auf die API-Calls zurück. 