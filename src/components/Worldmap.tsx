import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { circle as turfCircle } from "@turf/turf";

interface WeatherStation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
}

interface LocationState {
    longitude: number;
    latitude: number;
    radius: number;
    stationCount: number;
    startYear: number;
    endYear: number;
    stations: WeatherStation[];
}

interface WeatherMapProps {
    formData: LocationState;
    loading: boolean;
}

function Worldmap({ formData, loading }: WeatherMapProps) {
    const { longitude, latitude, radius, stations } = formData;
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        mapInstance.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/basic-v2/style.json?key=mXKFR8oqkj1r6ntp14X1",
            center: [longitude, latitude],
            zoom: 8,
        });

        mapInstance.current.addControl(new maplibregl.NavigationControl());

        mapInstance.current.on("load", () => {
            const circleGeoJSON = turfCircle([longitude, latitude], radius, {
                steps: 64,
                units: "kilometers",
            });

            mapInstance.current!.addSource("search-radius", {
                type: "geojson",
                data: circleGeoJSON,
            });

            mapInstance.current!.addLayer({
                id: "search-radius-fill",
                type: "fill",
                source: "search-radius",
                layout: {},
                paint: { "fill-color": "rgba(0, 0, 255, 0.2)" },
            });

            mapInstance.current!.addLayer({
                id: "search-radius-outline",
                type: "line",
                source: "search-radius",
                layout: {},
                paint: { "line-color": "rgba(0, 0, 255, 0.8)", "line-width": 2 },
            });

            new maplibregl.Marker({ color: "red" })
                .setLngLat([longitude, latitude])
                .addTo(mapInstance.current!);

            stations.forEach((station) => {
                const popupContent = `<div className="text-center">
                    <div class="m-0 text-lg font-semibold dark:text-black">${station.name}</div>
                    <div class="m-0 text-sm dark:text-black">Entfernung: ${station.distance} km</div>
                </div>`;

                const popup = new maplibregl.Popup({ offset: 25 }).setHTML(popupContent);

                new maplibregl.Marker({ color: "blue" })
                    .setLngLat([station.longitude, station.latitude])
                    .setPopup(popup)
                    .addTo(mapInstance.current!);
            });
        });

        return () => {
            mapInstance.current?.remove();
        };
    }, [longitude, latitude, radius, stations]);


    return <div ref={mapContainer} className="w-full h-full min-h-[800px] flex-1 p-5" />;
};

export default Worldmap;
