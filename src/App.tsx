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
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/plot" element={<Plot />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}