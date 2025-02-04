import React, { useEffect, useState } from 'react';

interface TemperatureRange {
    min: number;
    max: number;
}

interface TemperatureEntry {
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

const TemperatureTable: React.FC = () => {
    const [data, setData] = useState<TemperatureEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
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

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3"
                            onClick={() => handleSort('year')}
                        >
                            Jahr {sortColumn === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('annual.max')}
                        >
                            Max {sortColumn === 'annual.max' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('annual.min')}
                        >
                            Min {sortColumn === 'annual.min' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('spring.max')}
                        >
                            Frühling Max {sortColumn === 'spring.max' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('spring.min')}
                        >
                            Frühling Min {sortColumn === 'spring.min' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('summer.max')}
                        >
                            Sommer Max {sortColumn === 'summer.max' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('summer.min')}
                        >
                            Sommer Min {sortColumn === 'summer.min' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('autumn.max')}
                        >
                            Herbst Max {sortColumn === 'autumn.max' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('autumn.min')}
                        >
                            Herbst Min {sortColumn === 'autumn.min' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('winter.max')}
                        >
                            Winter Max {sortColumn === 'winter.max' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => handleSort('winter.min')}
                        >
                            Winter Min {sortColumn === 'winter.min' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr
                            key={entry.year}
                            className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {entry.year}
                            </th>
                            <td className="px-4 py-3">{entry.annual.max}°C</td>
                            <td className="px-4 py-3">{entry.annual.min}°C</td>
                            <td className="px-4 py-3">{entry.spring.max}°C</td>
                            <td className="px-4 py-3">{entry.spring.min}°C</td>
                            <td className="px-4 py-3">{entry.summer.max}°C</td>
                            <td className="px-4 py-3">{entry.summer.min}°C</td>
                            <td className="px-4 py-3">{entry.autumn.max}°C</td>
                            <td className="px-4 py-3">{entry.autumn.min}°C</td>
                            <td className="px-4 py-3">{entry.winter.max}°C</td>
                            <td className="px-4 py-3">{entry.winter.min}°C</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TemperatureTable;
