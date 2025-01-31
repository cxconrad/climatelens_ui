import React from "react";

interface Station {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    distance: number;
}

interface SidebarProps {
    stations: Station[];
    searchParams: {
        latitude: number;
        longitude: number;
        radius: number;
        startYear: number;
        endYear: number;
    };
    onViewData: (id: string) => void;
    onBack: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ stations, searchParams, onViewData, onBack }) => {
    return (
        <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg overflow-auto h-[500px]">
            <button onClick={onBack} className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg">Zurück</button>
            <h3 className="text-lg font-semibold">Suchergebnisse</h3>
            <p className="text-sm text-gray-600">
                <strong>Längengrad:</strong> {searchParams.longitude} <br />
                <strong>Breitengrad:</strong> {searchParams.latitude} <br />
                <strong>Radius:</strong> {searchParams.radius} km <br />
                <strong>Zeitraum:</strong> {searchParams.startYear} - {searchParams.endYear}
            </p>
            {stations.map((station) => (
                <div key={station.id} className="mt-4 p-3 border rounded-lg">
                    <h3 className="font-bold">{station.name}</h3>
                    <p className="text-sm">
                        <strong>Koordinaten:</strong> L: {station.latitude}, B: {station.longitude}
                    </p>
                    <p className="text-sm">
                        <strong>Entfernung:</strong> {station.distance} km
                    </p>
                    <button
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => onViewData(station.id)}
                    >
                        Wetterstation ansehen
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
