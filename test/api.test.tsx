import { beforeEach, afterEach, expect, test } from "vitest";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import React from "react";

const BACKEND_URL = "http://localhost:8000"; 

beforeEach(() => {
  // Bevor jeder Test läuft, rendere die App
  render(<App />);
});

afterEach(() => {
  // Nach jedem Test die Komponente aufräumen
  document.body.innerHTML = "";
});

test("Das Frontend ruft Wetterstationen vom Backend ab", async () => {
  // Warten, bis die API-Antwort verarbeitet ist
  await waitFor(async () => {
    const response = await fetch(`${BACKEND_URL}/stations-query?latitude=48.1351&longitude=11.582&radius=100000&count=10`);
    const data = await response.json();

    // Überprüfen, ob das Backend Daten liefert
    expect(response.status).toBe(200);
    expect(data).toHaveProperty("stations");
    expect(data.stations.length).toBeGreaterThan(0);

  });
});

test("Das Frontend ruft Wetterdaten einer Station vom Backend ab", async () => {
  await waitFor(async () => {
    const response = await fetch(`${BACKEND_URL}/station/data?stationId=MUC001&startYear=2010&endYear=2020`);
    const data = await response.json();

    // Überprüfen, ob das Backend Wetterdaten liefert
    expect(response.status).toBe(200);
    expect(data).toHaveProperty("temperature");

  });
});