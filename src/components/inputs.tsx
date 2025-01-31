import { useForm } from "react-hook-form";
import SubmitButton from "./custombutton";
import { sendDataToBackend } from "../services/sendsearch";

const Input = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await sendDataToBackend(data);
        } catch (error) {
            console.error("⚠️ Fehler bei der API-Anfrage:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-blue-950 p-6 rounded-lg shadow-lg space-y-4 drop-shadow-md">
            <input
                type="number"
                placeholder="Breitengrad"
                className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                {...register("latitude", {
                    required: "Breitengrad erforderlich",
                    min: { value: -90, message: "Breitengrad darf nicht kleiner als -90 sein" },
                    max: { value: 90, message: "Breitengrad darf nicht größer als 90 sein" }
                })}
            />
            {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}

            <input
                type="number"
                placeholder="Längengrad"
                className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                {...register("longitude", {
                    required: "Längengrad erforderlich",
                    min: { value: -180, message: "Längengrad darf nicht kleiner als -180 sein" },
                    max: { value: 180, message: "Längengrad darf nicht größer als 180 sein" }
                })}
            />
            {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}

            <input
                type="number"
                placeholder="Radius in km"
                className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                {...register("radius", {
                    required: "Radius erforderlich",
                    min: 0
                })}
            />
            {errors.radius && <p className="text-red-500 text-sm">{errors.radius.message}</p>}

            <input
                type="number"
                placeholder="Anzahl der Stationen"
                className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                {...register("stationCount", {
                    required: "Anzahl erforderlich",
                    min: 1,
                    max: 100
                })}
            />
            {errors.stationCount && <p className="text-red-500 text-sm">{errors.stationCount.message}</p>}

            <input
                type="number"
                placeholder="Startjahr"
                className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                {...register("startYear", {
                    required: "Startjahr erforderlich",
                    min: { value: 1900, message: "Jahr muss ≥ 1900 sein" },
                    max: { value: new Date().getFullYear(), message: "Jahr darf nicht in der Zukunft liegen" }
                })}
            />
            {errors.startYear && <p className="text-red-500 text-sm">{errors.startYear.message}</p>}

            <input
                type="number"
                placeholder="Endjahr"
                className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
                {...register("endYear", {
                    required: "Endjahr erforderlich",
                    min: { value: 1900, message: "Jahr muss ≥ 1900 sein" },
                    max: { value: new Date().getFullYear(), message: "Jahr darf nicht in der Zukunft liegen" },
                    validate: (value, formValues) =>
                        parseInt(value) >= parseInt(formValues.startYear) || "Endjahr muss nach Startjahr liegen"
                })}
            />
            {errors.endYear && <p className="text-red-500 text-sm">{errors.endYear.message}</p>}

            <SubmitButton label="Suchen" />
        </form>
    );
};

export default Input;
