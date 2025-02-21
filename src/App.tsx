import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Die App-Komponente definiert die Routen der Anwendung
import Home from "./pages/home";
import Map from "./pages/map";
import Plot from "./pages/plot";
import Table from "./pages/table";

// App-Komponente
export default function App() {
  return (
    <Router>
      <Routes>
        // Startseite die beim Aufruf der Anwendung angezeigt wird
        <Route path="/" element={<Home />} />
        // Map zeigt die Wetterstationen auf der Karte an
        <Route path="/map" element={<Map />} />
        // Plot zeigt die Wetterdaten in einem Diagramm an
        <Route path="/plot" element={<Plot />} />
        // Table zeigt die Wetterdaten in einer Tabelle an
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}