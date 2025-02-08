// src/components/datatable.tsx
import React, { useEffect, useState } from 'react';

interface TemperatureRange {
    min: number;
    max: number;
}

export interface TemperatureEntry {
    year: number;
    annual: TemperatureRange;
    spring: TemperatureRange;
    summer: TemperatureRange;
    autumn: TemperatureRange;
    winter: TemperatureRange;
}

interface ApiResponse {
    station_id: number;
    data: TemperatureEntry[];
}

interface TemperatureTableProps {
    visibleColumns: string[];
}

const datatable = ({ visibleColumns }: TemperatureTableProps) => {
    const [data, setData] = useState<TemperatureEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortColumn, setSortColumn] = useState<string>('year');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const fetchDataFromAPI = async () => {
        try {
            const response = await fetch('/api/weatherstation1/weatherdata');
            if (!response.ok) {
                throw new Error('Fehler beim Laden der Daten');
            }
            const json: ApiResponse = await response.json();
            setData(json.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const logsKey = "apiCallLogs";
        const logsStr = sessionStorage.getItem(logsKey);
        if (logsStr) {
            const logs = JSON.parse(logsStr);
            if (Array.isArray(logs) && logs.length > 0) {
                const latestLog = logs[logs.length - 1];
                if (latestLog && latestLog.weatherData && latestLog.weatherData.data) {
                    setData(latestLog.weatherData.data);
                    setLoading(false);
                    return;
                }
            }
        }
        fetchDataFromAPI();
    }, []);

    const getNestedValue = (obj: any, columnKey: string): any => {
        return columnKey.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
    };

    const handleSort = (column: string) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newSortOrder);

        const sortedData = [...data].sort((a, b) => {
            const aValue = column.includes('.') ? getNestedValue(a, column) : (a as any)[column];
            const bValue = column.includes('.') ? getNestedValue(b, column) : (b as any)[column];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return newSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return newSortOrder === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            return 0;
        });

        setData(sortedData);
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    if (error) {
        return <div>Fehler: {error}</div>;
    }

    const columns = [
        { key: 'annual.max', label: 'Max' },
        { key: 'annual.min', label: 'Min' },
        { key: 'spring.max', label: 'Frühling Max' },
        { key: 'spring.min', label: 'Frühling Min' },
        { key: 'summer.max', label: 'Sommer Max' },
        { key: 'summer.min', label: 'Sommer Min' },
        { key: 'autumn.max', label: 'Herbst Max' },
        { key: 'autumn.min', label: 'Herbst Min' },
        { key: 'winter.max', label: 'Winter Max' },
        { key: 'winter.min', label: 'Winter Min' },
    ];

    return (
        <div className="absolute overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('year')}
                        >
                            Jahr {sortColumn === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        {columns
                            .filter(col => visibleColumns.includes(col.key))
                            .map(col => (
                                <th
                                    key={col.key}
                                    scope="col"
                                    className="px-4 py-3 cursor-pointer"
                                    onClick={() => handleSort(col.key)}
                                >
                                    {col.label} {sortColumn === col.key && (sortOrder === 'asc' ? '↑' : '↓')}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(entry => (
                        <tr
                            key={entry.year}
                            className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-4 py-3 font-medium !text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {entry.year}
                            </th>
                            {columns
                                .filter(col => visibleColumns.includes(col.key))
                                .map(col => (
                                    <td key={col.key} className="px-4 py-3 text-black">
                                        {getNestedValue(entry, col.key)}°C
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default datatable;
