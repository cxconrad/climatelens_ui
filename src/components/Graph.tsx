import { useMemo, useEffect } from "react";
import Plot from "react-plotly.js";

// Struktur der API-Antwort für die Wetterdaten
interface WeatherData {
    year: number;
    annual: {
        min: number;
        max: number;
    };
    spring: {
        min: number;
        max: number;
    };
    summer: {
        min: number;
        max: number;
    };
    autumn: {
        min: number;
        max: number;
    };
    winter: {
        min: number;
        max: number;
    };
}

export interface WeatherAPIResponse {
    station_id: number;
    name: string;
    data: WeatherData[];
}

// Datenstruktur für die Temperaturdaten
interface TemperatureData {
    years: number[];
    maxTemperatures: number[];
    minTemperatures: number[];
    seasonalData: {
        winter: { min: number[]; max: number[] };
        summer: { min: number[]; max: number[] };
        autumn: { min: number[]; max: number[] };
        spring: { min: number[]; max: number[] };
    };
}

// Props für die WeatherChart-Komponente
interface WeatherChartProps {
    data: WeatherAPIResponse;
    selectedStation?: string;
}

const getSeasonColor = (season: string, type: "min" | "max"): string => {
    const colors: Record<string, { min: string; max: string }> = {
        winter: { min: "#4e95d9", max: "#83cbeb" },
        summer: { min: "#e97132", max: "#ffc000" },
        autumn: { min: "#61280b", max: "#cc8800" },
        spring: { min: "#4ea72e", max: "#92d050" },
    };
    return colors[season]?.[type] || "#000000";
};

const seasonNames: Record<string, string> = {
    winter: "Winter",
    summer: "Sommer",
    autumn: "Herbst",
    spring: "Frühling",
};

const logWeatherData = (data: WeatherAPIResponse) => {
    const logsKey = "apiCallLogs";
    const existingLogs = sessionStorage.getItem(logsKey);
    const logs = existingLogs ? JSON.parse(existingLogs) : [];

    logs.push({
        timestamp: new Date().toISOString(),
        weatherData: data,
    });

    sessionStorage.setItem(logsKey, JSON.stringify(logs));
};

const WeatherChart = ({ data, selectedStation }: WeatherChartProps) => {
    useEffect(() => {
        if (data) {
            logWeatherData(data);
        }
    }, [data]);

    const temperatureData: TemperatureData = useMemo(
        () => ({
            years: data.data.map((item) => item.year),
            maxTemperatures: data.data.map((item) => item.annual.max),
            minTemperatures: data.data.map((item) => item.annual.min),
            seasonalData: {
                winter: {
                    min: data.data.map((item) => item.winter.min),
                    max: data.data.map((item) => item.winter.max),
                },
                summer: {
                    min: data.data.map((item) => item.summer.min),
                    max: data.data.map((item) => item.summer.max),
                },
                autumn: {
                    min: data.data.map((item) => item.autumn.min),
                    max: data.data.map((item) => item.autumn.max),
                },
                spring: {
                    min: data.data.map((item) => item.spring.min),
                    max: data.data.map((item) => item.spring.max),
                },
            },
        }),
        [data]
    );

    // Berechne den Gesamtbereich und bestimme die Skalierung der X-Achse
    const totalRange = Math.max(...temperatureData.years) - Math.min(...temperatureData.years);
    const tickVals =
        totalRange > 50
            ? temperatureData.years.filter((year) => year % 10 === 0)
            : temperatureData.years;

    const plotData = useMemo(() => {
        const yearlyData = [
            {
                x: temperatureData.years,
                y: temperatureData.maxTemperatures,
                type: "scatter" as const,
                mode: "lines+markers" as const,
                name: "Max Temperatur",
                line: { color: "#FF0000" },
                visible: true,
                connectgaps: false,

            },
            {
                x: temperatureData.years,
                y: temperatureData.minTemperatures,
                type: "scatter" as const,
                mode: "lines+markers" as const,
                name: "Min Temperatur",
                line: { color: "#0000FF" },
                visible: true,
                connectgaps: false,
            },
        ];

        const seasonalData = Object.entries(temperatureData.seasonalData).flatMap(
            ([season, { min, max }]) => {
                const seasonLabel = seasonNames[season] || season.charAt(0).toUpperCase() + season.slice(1);
                return [
                    {
                        x: temperatureData.years,
                        y: min,
                        type: "scatter" as const,
                        mode: "lines+markers" as const,
                        name: `Min Temperatur ${seasonLabel}`,
                        line: { color: getSeasonColor(season, "min") },
                        visible: "legendonly" as const,
                        connectgaps: false,
                    },
                    {
                        x: temperatureData.years,
                        y: max,
                        type: "scatter" as const,
                        mode: "lines+markers" as const,
                        name: `Max Temperatur ${seasonLabel}`,
                        line: { color: getSeasonColor(season, "max") },
                        visible: "legendonly" as const,
                        connectgaps: false,
                    },
                ];
            }
        );

        return [...yearlyData, ...seasonalData];
    }, [temperatureData]);

    const layout = useMemo(
        () => ({
            title: {
                text: `Wetterdaten der Station ${selectedStation || "Unbekannt"}`,
                font: { color: "#3e3e66" },
            },
            paper_bgcolor: "#fffff",
            plot_bgcolor: "#fffff",
            dragmode: "pan" as const,
            scrollZoom: true,
            xaxis: {
                title: { text: "Jahr", font: { color: "#3e3e66" } },
                tickfont: { color: "#3e3e66" },
                tickmode: "array" as const,
                tickvals: tickVals,
                ticktext: tickVals.map(String),
            },
            yaxis: {
                title: { text: "Temperatur (°C)", font: { color: "#3e3e66" } },
                tickfont: { color: "#3e3e66" },
            },
            legend: {
                orientation: "h" as const,
                x: 0.5,
                y: -0.1,
                xanchor: "center" as const,
                font: { color: "#3e3e66" },
            },
            margin: { t: 100, l: 50, r: 100, b: 50 },
        }),
        [tickVals, selectedStation]
    );

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Plot
                key={JSON.stringify(plotData)}
                data={plotData}
                layout={layout}
                config={{ responsive: true }}
                style={{ width: "1200px", height: "799px" }}
            />
        </div>
    );
};

export default WeatherChart;
