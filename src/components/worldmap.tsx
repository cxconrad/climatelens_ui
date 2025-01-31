import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";

interface Station {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
}

interface MapProps {
    stations: Station[];
    searchParams: {
        latitude: number;
        longitude: number;
    };
}

const WeatherMap: React.FC<MapProps> = ({ stations, searchParams }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const features = stations.map((station) =>
            new Feature({
                geometry: new Point(fromLonLat([station.longitude, station.latitude])),
                name: station.name,
            }).setStyle(
                new Style({
                    image: new Icon({
                        src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                        anchor: [0.5, 1],
                        scale: 1,
                    }),
                })
            )
        );

        const vectorLayer = new VectorLayer({
            source: new VectorSource({ features }),
        });

        const map = new Map({
            target: mapRef.current,
            layers: [new TileLayer({ source: new OSM() }), vectorLayer],
            view: new View({
                center: fromLonLat([searchParams.longitude || 56.0, searchParams.latitude || 45.0]),
                zoom: 6,
            }),
        });

        return () => map.setTarget(null);
    }, [stations, searchParams]);

    return <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow-md"></div>;
};

export default WeatherMap;