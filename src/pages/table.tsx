import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TemperatureTable from '../components/datatable';
import Header from '../layouts/header';

// Defiition der Tabelle
const table = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};
    const [showDropdown, setShowDropdown] = useState(false);
    // Alle Spalten
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
    // Spaltenbezeichnungen
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

    // Anzeige der ausgewählten Spalten
    const [selectedColumns, setSelectedColumns] = useState<string[]>(allColumns);
    // Zurück zur Plot Seite
    const handleBack = () => {
        navigate("/plot", { state });
    };

    // Spalten auswählen
    const toggleColumn = (col: string) => {
        if (selectedColumns.includes(col)) {
            setSelectedColumns(selectedColumns.filter(item => item !== col));
        } else {
            setSelectedColumns([...selectedColumns, col]);
        }
    };

    // Tabelle rendern
    return (
        <div className="h-screen overflow-y-auto flex flex-col overflow-x-hidden">
            <Header />
            <div className="flex flex-1">
                <aside className="w-1/4 p-4 overflow-y-auto text-white">
                    <button
                        className="button p-2 m-2 !bg-pink-500 text-white rounded"
                        onClick={handleBack}>
                        Zurück
                    </button>
                    <div className="bg-slate-800 content-center p-5 m-4">
                        <div className="text-2xl font-bold">
                            {state.station?.name ?? "Unbekannte Station"}
                        </div>
                        <p className="mt-2">
                            <strong>Koordinaten: </strong>
                            <p> B: {state.station?.latitude}</p>
                            <p> L: {state.station?.longitude}</p>
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
                            <div className="!bg-transparent p-2 m-1 text-white max-w-50">
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

                <main className="flex-1 p-4 h-full">
                    <div className="max-h-3/4 overflow-y-auto">
                        <TemperatureTable visibleColumns={selectedColumns} />
                    </div>
                </main>

            </div>
        </div>
    );
};

// Export der Tabelle
export default table;
