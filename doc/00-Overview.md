![Flow Chart](./doc/img/Flow-Chart.png)

Das Frontend von Climate Lens ist wie folgt aufgebaut:

Die Nutzerinteraktion wird maßgeblich vom App-Router gesteuert, der das Navigieren zwischen den einzelnen Pages ermöglicht. Auf diesen Pages befinden sich Komponenten, in denen Hooks wie useEffect zum Einsatz kommen, um Aktionen beim Laden der jeweiligen Komponente auszuführen. Diese Hooks greifen wiederum auf Services zu, genauer gesagt auf API-Calls, welche das Backend ansprechen. Die Ergebnisse dieser API-Calls werden anschließend im Session Storage abgelegt. Ebenso werden die vom Nutzer im Frontend eingegebenen Parameter mithilfe von Hooks im Session Storage gespeichert.

