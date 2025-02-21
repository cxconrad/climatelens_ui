// Import der Module von React 
import { useMemo, useEffect } from "react";
// Import der Plot-Komponente von Plotly
import Plot from "react-plotly.js";

// Datenstruktur für die Wetterdaten
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

// Datenstruktur für die Wetter-API-Antwort
export interface WeatherApiResponse {
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
    data: WeatherApiResponse;
    selectedStation?: string;
}

// Farben für die Jahreszeiten
const getSeasonColor = (season: string, type: "min" | "max"): string => {
    const colors: Record<string, { min: string; max: string }> = {
        winter: { min: "#4e95d9", max: "#83cbeb" },
        summer: { min: "#e97132", max: "#ffc000" },
        autumn: { min: "#61280b", max: "#cc8800" },
        spring: { min: "#4ea72e", max: "#92d050" },
    };
    return colors[season]?.[type] || "#000000";
};

// Mapping von englischen zu deutschen Jahreszeiten, damit das Frontend die richtigen Jahreszeiten anzeigt
const seasonNames: Record<string, string> = {
    winter: "Winter",
    summer: "Sommer",
    autumn: "Herbst",
    spring: "Frühling",
};

// Funktion, um Wetterdaten zu protokollieren
const logWeatherData = (data: WeatherApiResponse) => {
    const logsKey = "apiCallLogs";
    const existingLogs = sessionStorage.getItem(logsKey);
    const logs = existingLogs ? JSON.parse(existingLogs) : [];

    logs.push({
        timestamp: new Date().toISOString(),
        weatherData: data,
    });

    sessionStorage.setItem(logsKey, JSON.stringify(logs));
};

// Komponente für die Wetterdaten
const WeatherChart = ({ data, selectedStation }: WeatherChartProps) => {
    // Logge die Daten beim Mount oder wenn sich die Daten ändern
    useEffect(() => {
        if (data) {
            logWeatherData(data);
        }
    }, [data]);

    // Wetterdaten in ein lesbares Format umwandeln
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

    // Zeige nur alle 10 Jahre auf der X-Achse an
    const filteredYears = temperatureData.years.filter(year => year % 10 === 0);


    // Erstelle die Plot-Daten für das Diagramm
    const plotData = useMemo(() => {
        const baseTraces = [
            {
                x: temperatureData.years,
                y: temperatureData.maxTemperatures,
                type: "scatter" as const,
                mode: "lines+markers" as const,
                name: "Max Temperatur",
                line: { color: "#FF0000" },
                visible: true,
            },
            {
                x: temperatureData.years,
                y: temperatureData.minTemperatures,
                type: "scatter" as const,
                mode: "lines+markers" as const,
                name: "Min Temperatur",
                line: { color: "#0000FF" },
                visible: true,
            },
        ];

        const seasonalTraces = Object.entries(temperatureData.seasonalData).flatMap(
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
                    },
                    {
                        x: temperatureData.years,
                        y: max,
                        type: "scatter" as const,
                        mode: "lines+markers" as const,
                        name: `Max Temperatur ${seasonLabel}`,
                        line: { color: getSeasonColor(season, "max") },
                        visible: "legendonly" as const,
                    },
                ];
            }
        );

        return [...baseTraces, ...seasonalTraces];
    }, [temperatureData]);

    // Layout-Definition für das Diagramm
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
                tickvals: filteredYears,
                ticktext: filteredYears.map(String),
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
        [temperatureData.years, selectedStation, filteredYears]
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
