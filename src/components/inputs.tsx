// This file is a component used in the home page
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
    longitude: number;
    latitude: number;
    radius: number;
    stationCount: number;
    startYear: number;
    endYear: number;
};

const input = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: "onChange",
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            console.log("Daten wurden erfolgreich verarbeitet:", data);
            navigate("/map", { state: data });
        } catch (error) {
            console.error("Fehler bei der API-Anfrage:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto bg-slate-900 p-6 rounded-lg shadow-indigo-500/50 space-y-4 drop-shadow-md"
        >
            <div className="absolute top-2 right-2 group">
                <div
                    role="button"
                    className="h-4 px-4 text-xx !bg-transparent text-white focus:outline-none ring-0 border-0"
                >
                    i
                </div>
                <div className="absolute left-full right-0 mt-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Eingabe erfolgt in Dezimalgrad, somit entsprechend die folgenden Werte:
                    <p>- 180 = 180 W</p>
                    <p>180 = 180 E</p>
                    <p>-90 = 90 S</p>
                    <p>90 = 90 N</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="longitude" className="font-bold text-white">
                        Längengrad
                    </label>
                    <input
                        step="any"
                        type="number"
                        placeholder="in Dezimalgrad"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("longitude", {
                            required: "Längengrad erforderlich",
                            valueAsNumber: true,
                            min: { value: -180, message: "Längengrad darf nicht kleiner als -180 sein" },
                            max: { value: 180, message: "Längengrad darf nicht größer als 180 sein" },
                        })}
                    />
                    {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
                </div>
                <div>
                    <label htmlFor="latitude" className="font-bold text-white">
                        Breitengrad
                    </label>
                    <input
                        step="any"
                        type="number"
                        placeholder="in Dezimalgrad"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("latitude", {
                            required: "Breitengrad erforderlich",
                            valueAsNumber: true,
                            min: { value: -90, message: "Breitengrad darf nicht kleiner als -90 sein" },
                            max: { value: 90, message: "Breitengrad darf nicht größer als 90 sein" },
                        })}
                    />
                    {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="Radius" className="font-bold text-white">
                        Suchradius
                    </label>
                    <input
                        type="number"
                        placeholder="Radius in km"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("radius", {
                            required: "Radius erforderlich",
                            min: { value: 0, message: "Radius darf nicht negativ sein" },
                            max: { value: 100, message: "Radius darf nicht größer als 100 sein" },
                        })}
                    />
                    {errors.radius && <p className="text-red-500 text-sm">{errors.radius.message}</p>}
                </div>
                <div>
                    <label htmlFor="stationcount" className="font-bold text-white">
                        Anzahl der Stationen
                    </label>
                    <input
                        type="number"
                        placeholder="Anzahl der Stationen"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("stationCount", {
                            required: "Anzahl erforderlich",
                            min: { value: 1, message: "Mindestens eine Station erforderlich" },
                            max: { value: 10, message: "Maximal 10 Stationen erlaubt" },
                        })}
                    />
                    {errors.stationCount && <p className="text-red-500 text-sm">{errors.stationCount.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startYear" className="font-bold text-white">
                        Startjahr
                    </label>
                    <input
                        type="number"
                        placeholder="Startjahr"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("startYear", {
                            required: "Startjahr erforderlich",
                            min: { value: 1900, message: "Jahr muss ≥ 1900 sein" },
                            max: { value: new Date().getFullYear(), message: "Jahr darf nicht in der Zukunft liegen" },
                        })}
                    />
                    {errors.startYear && <p className="text-red-500 text-sm">{errors.startYear.message}</p>}
                </div>
                <div>
                    <label htmlFor="endYear" className="font-bold text-white">
                        Endjahr
                    </label>
                    <input
                        type="number"
                        placeholder="Endjahr"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("endYear", {
                            required: "Endjahr erforderlich",
                            min: { value: 1900, message: "Jahr muss ≥ 1900 sein" },
                            max: { value: new Date().getFullYear(), message: "Jahr darf nicht in der Zukunft liegen" },
                            validate: (value, formValues) =>
                                value >= formValues.startYear || "Endjahr muss nach Startjahr liegen",
                        })}
                        onKeyDown={handleKeyDown}
                    />
                    {errors.endYear && <p className="text-red-500 text-sm">{errors.endYear.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 text-white !bg-purple-700 hover:!bg-purple-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
                Wetterstation suchen
            </button>
        </form>
    );
};

export default input;
