import React, { useMemo } from "react";
import Plot from "react-plotly.js";

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
        winter: { min: "#00cccc", max: "#6666ff" },
        summer: { min: "#ffa64d", max: "#ffcc00" },
        autumn: { min: "#aa4cff", max: "#ff884d" },
        spring: { min: "#33cc33", max: "#66ff66" },
    };
    return colors[season]?.[type] || "#000000";
};

const WeatherChart: React.FC<WeatherChartProps> = ({ data, selectedStation }) => {
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

    // Zusammenstellen der Plot-Daten für Plotly
    const plotData = useMemo(() => [
        {
            x: temperatureData.years,
            y: temperatureData.maxTemperatures,
            type: "scatter" as const,
            mode: "lines+markers" as const,
            name: "Max Temperatur",
            line: { color: "#ff4d4d" },
        },
        {
            x: temperatureData.years,
            y: temperatureData.minTemperatures,
            type: "scatter" as const,
            mode: "lines+markers" as const,
            name: "Min Temperatur",
            line: { color: "#4db8ff" },
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
        <div className="p-4">
            <Plot
                data={plotData}
                layout={{
                    title: {
                        text: `Wetterdaten der Station ${selectedStation || "Unbekannt"}`,
                        font: { color: "#ffffff" },
                    },
                    paper_bgcolor: "#2b2b3c",
                    plot_bgcolor: "#2b2b3c",
                    xaxis: {
                        title: { text: "Jahr", font: { color: "#ffffff" } },
                        tickfont: { color: "#ffffff" },
                    },
                    yaxis: {
                        title: { text: "Temperatur (°C)", font: { color: "#ffffff" } },
                        tickfont: { color: "#ffffff" },
                    },
                    legend: {
                        font: { color: "#ffffff" },
                    },
                    margin: { t: 50, l: 50, r: 50, b: 50 },
                }}
                config={{ responsive: true }}
                style={{ width: "1200px", height: "750px" }}
            />
        </div>
    );
};

export default WeatherChart;
