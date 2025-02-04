import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { circle as turfCircle } from "@turf/turf"; // Import für Kreisberechnung

const CENTER_LAT = 50;
const CENTER_LON = 45;
const MAX_RADIUS_KM = 100;

interface WeatherStation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
}

const WeatherStationsMapMapLibre: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);
    const [stations, setStations] = useState<WeatherStation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // API-Aufruf: Wetterstationen laden
    useEffect(() => {
        fetch("/api/weatherstations")
            .then((response) => response.json())
            .then((data: WeatherStation[]) => {
                console.log("Geladene Stationen:", data);
                setStations(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fehler beim Laden der Wetterstationen:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (loading || !mapContainerRef.current) return;

        const defaultCenter: [number, number] = [CENTER_LON, CENTER_LAT];
        const center: [number, number] = stations.length > 0
            ? [stations[0].longitude, stations[0].latitude]
            : defaultCenter;

        mapInstance.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: "https://api.maptiler.com/maps/basic-v2/style.json?key=mXKFR8oqkj1r6ntp14X1",
            center: center,
            zoom: 8,
        });

        mapInstance.current.addControl(new maplibregl.NavigationControl());

        mapInstance.current.on("load", () => {
            // **Radius als GeoJSON erzeugen**
            const circleGeoJSON = turfCircle([CENTER_LON, CENTER_LAT], MAX_RADIUS_KM, {
                steps: 64,
                units: "kilometers",
            });

            // **GeoJSON-Quelle für den Suchradius hinzufügen**
            mapInstance.current!.addSource("search-radius", {
                type: "geojson",
                data: circleGeoJSON,
            });

            // Hintergrund für Suchradius
            mapInstance.current!.addLayer({
                id: "search-radius-fill",
                type: "fill",
                source: "search-radius",
                layout: {},
                paint: {
                    "fill-color": "rgba(0, 0, 255, 0.2)",
                },
            });

            // Suchradius
            mapInstance.current!.addLayer({
                id: "search-radius-outline",
                type: "line",
                source: "search-radius",
                layout: {},
                paint: {
                    "line-color": "rgba(0, 0, 255, 0.8)",
                    "line-width": 2,
                },
            });

            // Marker für Suchposition
            new maplibregl.Marker({ color: "blue" })
                .setLngLat([CENTER_LON, CENTER_LAT])
                .addTo(mapInstance.current!);

            // Marker für Wetterstationen
            stations.forEach((station) => {
                const popupContent = `
          <div className="text-center">
            <h2 className="m-0 text-lg font-semibold">${station.name}</h2>
            <p className="m-0 text-sm">Entfernung: ${station.distance} km</p>
          </div>`;
                const popup = new maplibregl.Popup({ offset: 25 }).setHTML(popupContent);

                new maplibregl.Marker({ color: "red" })
                    .setLngLat([station.longitude, station.latitude])
                    .setPopup(popup)
                    .addTo(mapInstance.current!);
            });
        });

        return () => {
            mapInstance.current?.remove();
        };
    }, [loading, stations]);

    return (
        <div className="relative w-[1300px] h-[750px] p-5">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
                    <p className="text-lg font-semibold text-gray-700">Lade Wetterstationen...</p>
                </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full" />
        </div>
    );

};

export default WeatherStationsMapMapLibre;
