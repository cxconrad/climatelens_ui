// This file is a component used in the graph page
import React, { useMemo, useEffect } from "react";
import Plot from 'react-plotly.js';

interface WeatherDatum {
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

export interface WeatherApiResponse {
    station_id: number;
    data: WeatherDatum[];
}

interface TemperatureData {
    years: string[];
    maxTemperatures: number[];
    minTemperatures: number[];
    seasonalData: {
        winter: { min: number[]; max: number[] };
        summer: { min: number[]; max: number[] };
        autumn: { min: number[]; max: number[] };
        spring: { min: number[]; max: number[] };
    };
}

interface WeatherChartProps {
    data: WeatherApiResponse;
    selectedStation?: string;
}

const getSeasonColor = (season: string, type: "min" | "max"): string => {
    const colors: Record<string, { min: string; max: string }> = {
        "winter": { "min": "#1f77b4", "max": "#0e4d92" },
        "summer": { "min": "#ff7f0e", "max": "#ffbb78" },
        "autumn": { "min": "#d62728", "max": "#bcbd22" },
        "spring": { "min": "#2ca02c", "max": "#17becf" }
    };
    return colors[season]?.[type] || "#000000";
};

const plot = ({ data, selectedStation }: WeatherChartProps) => {
    useEffect(() => {
        if (data) {
            const logsKey = "apiCallLogs";
            const existingLogs = sessionStorage.getItem(logsKey);
            const logs = existingLogs ? JSON.parse(existingLogs) : [];

            logs.push({
                timestamp: new Date().toISOString(),
                weatherData: data,
            });

            sessionStorage.setItem(logsKey, JSON.stringify(logs));
        }
    }, [data]);

    const temperatureData: TemperatureData = useMemo(() => ({
        years: data.data.map((item) => item.year.toString()),
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
    }), [data]);

    const plotData = useMemo(() => [
        {
            x: temperatureData.years,
            y: temperatureData.maxTemperatures,
            type: "scatter" as const,
            mode: "lines+markers" as const,
            name: "Max Temperatur",
            line: { color: "#32cd32" },
        },
        {
            x: temperatureData.years,
            y: temperatureData.minTemperatures,
            type: "scatter" as const,
            mode: "lines+markers" as const,
            name: "Min Temperatur",
            line: { color: "#0055ff" },
        },
        ...Object.entries(temperatureData.seasonalData).flatMap(
            ([season, { min, max }]) => [
                {
                    x: temperatureData.years,
                    y: min,
                    type: "scatter" as const,
                    mode: "lines+markers" as const,
                    name: `Min Temperatur ${season.charAt(0).toUpperCase() + season.slice(1)}`,
                    line: { color: getSeasonColor(season, "min") },
                },
                {
                    x: temperatureData.years,
                    y: max,
                    type: "scatter" as const,
                    mode: "lines+markers" as const,
                    name: `Max Temperatur ${season.charAt(0).toUpperCase() + season.slice(1)}`,
                    line: { color: getSeasonColor(season, "max") },
                },
            ]
        ),
    ], [temperatureData]);

    return (
        <div className="absolute overflow-x-auto shadow-md sm:rounded-lg">
            <Plot
                data={plotData}
                layout={{
                    title: {
                        text: `Wetterdaten der Station ${selectedStation || "Unbekannt"}`,
                        font: { color: "#3e3e66" },
                    },
                    paper_bgcolor: "#fffff",
                    plot_bgcolor: "#fffff",
                    xaxis: {
                        title: { text: "Jahr", font: { color: "#3e3e66" } },
                        tickfont: { color: "#3e3e66" },
                    },
                    yaxis: {
                        title: { text: "Temperatur (°C)", font: { color: "#3e3e66" } },
                        tickfont: { color: "#3e3e66" },
                    },
                    legend: {
                        orientation: "h",
                        x: 0.5,
                        y: -0.1,
                        xanchor: "center",
                        font: { color: "#3e3e66" },
                    },
                    margin: { t: 50, l: 50, r: 100, b: 50 },
                }}
                config={{ responsive: true }}
                style={{ width: "1200px", height: "800px" }}
            />
        </div>
    );
};

export default plot;
