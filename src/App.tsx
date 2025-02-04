import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import Home from "./pages/home";
import Map from "./pages/map";
import Graph from "./pages/graph";
import Table from "./pages/table";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}