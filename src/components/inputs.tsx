import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleSubmitForm, FormData } from "../services/sendsearch";

const input = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: "onChange",
    });

    const navigate = useNavigate();

    return (
        <form
            onSubmit={handleSubmit((data) => handleSubmitForm(data, navigate))}
            className="max-w-md mx-auto bg-slate-900 p-6 rounded-lg shadow-indigo-500/50 space-y-4 drop-shadow-md"
        >
            <div className="grid grid-cols-2 gap-4">

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
                            min: { value: -90, message: "Breitengrad muss zwischen -90 und 90 liegen" },
                            max: { value: 90, message: "Breitengrad muss zwischen -90 und 90 liegen" },
                        })}
                    />
                    {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
                </div>
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
                            min: { value: -180, message: "Längengrad muss zwischen -180 und 180 liegen" },
                            max: { value: 180, message: "Längengrad muss zwischen -180 und 180 liegen" },
                        })}
                    />
                    {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="radius" className="font-bold text-white">
                        Suchradius (km)
                    </label>
                    <input
                        type="number"
                        placeholder="Radius"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("radius", {
                            required: "Radius erforderlich",
                            max: { value: 100, message: "Radius darf maximal 100 sein" },
                        })}
                    />
                    {errors.radius && <p className="text-red-500 text-sm">{errors.radius.message}</p>}
                </div>
                <div>
                    <label htmlFor="stationCount" className="font-bold text-white">
                        Anzahl der Stationen
                    </label>
                    <input
                        type="number"
                        placeholder="Anzahl"
                        className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        {...register("stationCount", {
                            required: "Anzahl erforderlich",
                            max: { value: 10, message: "Station Count darf maximal 10 sein" },
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
                            min: { value: 1900, message: "Startdatum muss mindestens 1900 sein" },
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
                            max: { value: 2024, message: "Enddatum darf nur 2024 oder kleiner sein" },
                            validate: (value, formValues) =>
                                value >= formValues.startYear || "Enddatum muss nach dem Startdatum liegen",
                        })}
                    />
                    {errors.endYear && <p className="text-red-500 text-sm">{errors.endYear.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 text-white !bg-purple-700 hover:!bg-purple-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                Wetterstation suchen
            </button>
        </form>
    );
};

export default input;