/* eslint-env vitest */
import { test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { rest } from "msw";
import { setupServer } from "msw/node";

// Mock-Server, der Backend-Responses simuliert
const server = setupServer(
  rest.get("http://localhost:8000/stations-query", (req, res, ctx) => {
    return res(
      ctx.json({
        stations: [
          { id: "GME00127822", name: "München Station", lat: 48.1351, lon: 11.5820 }
        ],
      })
    );
  }),

  rest.get("http://localhost:8000/station/data", (req, res, ctx) => {
    return res(
      ctx.json({
        temperature: [10.5, 11.2, 12.0, 14.3], // Dummy-Daten
      })
    );
  })
);

// Mock-Server starten vor den Tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Frontend ruft die Wetterstations-API auf und zeigt Ergebnisse an", async () => {
  render(<App />);

  // Eingaben simulieren
  fireEvent.change(screen.getByPlaceholderText("in Dezimalgrad"), { target: { value: "48.1351" } });
  fireEvent.change(screen.getByPlaceholderText("in Dezimalgrad"), { target: { value: "11.5820" } });
  fireEvent.change(screen.getByPlaceholderText("Radius"), { target: { value: "100" } });
  fireEvent.change(screen.getByPlaceholderText("Anzahl"), { target: { value: "10" } });

  // Suche starten
  fireEvent.click(screen.getByText("Wetterstation suchen"));

  // Warten, bis API-Daten angezeigt werden
  await waitFor(() => {
    expect(screen.getByText("München Station")).toBeInTheDocument();
  });
});

test("Frontend ruft die Stationsdaten-API auf und zeigt Temperaturen an", async () => {
  render(<App />);

  // Station suchen
  fireEvent.change(screen.getByPlaceholderText("in Dezimalgrad"), { target: { value: "48.1351" } });
  fireEvent.change(screen.getByPlaceholderText("in Dezimalgrad"), { target: { value: "11.5820" } });
  fireEvent.change(screen.getByPlaceholderText("Radius"), { target: { value: "100" } });
  fireEvent.change(screen.getByPlaceholderText("Anzahl"), { target: { value: "1" } });

  fireEvent.click(screen.getByText("Wetterstation suchen"));

  // Warten, bis Temperaturwerte angezeigt werden
  await waitFor(() => {
    expect(screen.getByText("10.5°C")).toBeInTheDocument();
  });
});
