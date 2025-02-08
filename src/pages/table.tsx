// src/pages/Table.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TemperatureTable from '../components/datatable';

const table = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};
    const [showDropdown, setShowDropdown] = useState(false);

    const allColumns = [
        'annual.max',
        'annual.min',
        'spring.max',
        'spring.min',
        'summer.max',
        'summer.min',
        'autumn.max',
        'autumn.min',
        'winter.max',
        'winter.min'
    ];

    const columnLabels: { [key: string]: string } = {
        'annual.max': 'Max',
        'annual.min': 'Min',
        'spring.max': 'Frühling Max',
        'spring.min': 'Frühling Min',
        'summer.max': 'Sommer Max',
        'summer.min': 'Sommer Min',
        'autumn.max': 'Herbst Max',
        'autumn.min': 'Herbst Min',
        'winter.max': 'Winter Max',
        'winter.min': 'Winter Min',
    };

    const [selectedColumns, setSelectedColumns] = useState<string[]>(allColumns);

    const handleBack = () => {
        navigate("/graph", { state });
    };


    const toggleColumn = (col: string) => {
        if (selectedColumns.includes(col)) {
            setSelectedColumns(selectedColumns.filter(item => item !== col));
        } else {
            setSelectedColumns([...selectedColumns, col]);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="text-white p-5">
                <h1 className="text-5xl font-bold">ClimateLens</h1>
                <p className="mt-2 text-lg">Wetterstationen finden - Trends entdecken</p>
            </header>

            <div className="flex flex-1">
                <aside className="w-1/4 p-4 overflow-y-auto text-white">
                    <button
                        className="button p-2 m-2 !bg-pink-500 text-white rounded"
                        onClick={handleBack}
                    >
                        Zurück
                    </button>
                    <div className="bg-slate-800 content-center p-5">
                        <div className="text-xl font-bold">{state.station?.name}</div>
                        <p className="mt-2">
                            <strong>Koordinaten: </strong>
                            {state.station?.latitude}° N, {state.station?.longitude}° E
                        </p>
                        <p>
                            <strong>Entfernung: </strong>
                            {state.station?.distance} km
                        </p>

                        <button
                            className="button p-2 m-2 !bg-violet-600 text-white rounded"
                            onClick={() => setShowDropdown(prev => !prev)}
                        >
                            Spalten auswählen
                        </button>
                        {showDropdown && (
                            <div className=" bg-white border p-2 m-2 text-gray-800">
                                {allColumns.map(col => (
                                    <div key={col} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={col}
                                            checked={selectedColumns.includes(col)}
                                            onChange={() => toggleColumn(col)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={col}>{columnLabels[col]}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                <main className="flex-1">
                    <TemperatureTable visibleColumns={selectedColumns} />
                </main>
            </div>
        </div>
    );
};

export default table;
