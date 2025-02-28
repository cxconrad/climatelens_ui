import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { handleSubmitForm, FormData } from "../services/sendsearch";

// Validierungsregeln für das Formular 
const validationRules = {
    latitude: {
        required: "Breitengrad erforderlich",
        min: { value: -90, message: "Breitengrad muss zwischen -90 und 90 liegen" },
        max: { value: 90, message: "Breitengrad muss zwischen -90 und 90 liegen" },
    },
    longitude: {
        required: "Längengrad erforderlich",
        min: { value: -180, message: "Längengrad muss zwischen -180 und 180 liegen" },
        max: { value: 180, message: "Längengrad muss zwischen -180 und 180 liegen" },
    },
    radius: {
        required: "Radius erforderlich",
        max: { value: 100, message: "Radius darf maximal 100km sein." },
    },
    stationCount: {
        required: "Anzahl erforderlich",
        max: { value: 10, message: "Station Count darf maximal 10 sein" },
    },
    startYear: {
        required: "Startjahr erforderlich",
        min: { value: 1763, message: "Startdatum muss mindestens 1763 sein" },
        max: { value: 2024, message: "Startdatum darf maximal 2024 sein" },
        validate: (value: number) =>
            /^\d{4}$/.test(value.toString()) || "Startjahr muss genau 4-stellig sein",
    },
    endYear: {
        required: "Endjahr erforderlich",
        min: { value: 1764, message: "Enddatum muss mindestens 1764 sein" },
        max: { value: 2024, message: "Enddatum darf nur 2024 oder kleiner sein" },
        validate: (value: number, formValues: FormData) =>
            (/^\d{4}$/.test(value.toString()) && value >= formValues.startYear) ||
            "Enddatum muss 4-stellig sein und nach dem Startjahr liegen",
    },
};

// Input-Komponente
interface FormInputProps {
    label: string;
    type: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    validation: any;
    error?: FieldError;
    steps?: number | string;
    maxLength?: number;
}

const FormInput = ({
    label,
    type,
    placeholder,
    register,
    validation,
    error,
    steps,
    maxLength,
}: FormInputProps) => (
    <div>
        <label className="font-bold text-white">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            step={steps}
            max={maxLength ? 9999 : undefined}
            pattern="[0-9,.\-]*" // nur Ziffern, Komma, Punkt und Bindestrich erlauben
            onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9,.\-]/g, "");
                if (maxLength) {
                    target.value = target.value.slice(0, maxLength);
                }
            }}
            className="w-full text-black p-2 border-white bg-white rounded-md shadow-sm focus:ring focus:ring-blue-300"
            {...register}
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
);

const Input = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({ mode: "onChange" });

    const navigate = useNavigate();

    // Formulardaten aus dem sessionStorage laden, damit weiterhin angezeigt wird, was der Benutzer eingegeben hat
    useEffect(() => {
        const storedData = sessionStorage.getItem("formData");
        if (storedData) {
            const parsedData: FormData = JSON.parse(storedData);
            console.log("Geladene Formulardaten:", parsedData);
            Object.keys(parsedData).forEach((key) => {
                setValue(key as keyof FormData, parsedData[key as keyof FormData]);
            });
        }
    }, [setValue]);

    // Formular mit den Input-Feldern
    return (
        <form
            onSubmit={handleSubmit((data) => handleSubmitForm(data, navigate))}
            className="max-w-md mx-auto bg-slate-900 p-6 rounded-lg shadow-indigo-500/50 space-y-4 drop-shadow-md"
        >
            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    label="Breitengrad"
                    type="text" // Disclaimer: Textfeld um alle Regeln zu erfüllen (z.B. , und . Regeln oder auch keine Buchstaben)
                    steps="0.000001"
                    placeholder="in Dezimalgrad"
                    register={register("latitude", {
                        ...validationRules.latitude,
                        setValueAs: (value: any) => {
                            if (typeof value === "string") {
                                return parseFloat(value.replace(",", "."));
                            }
                            return value;
                        },
                    })}
                    error={errors.latitude}
                    validation={undefined}
                />
                <FormInput
                    label="Längengrad"
                    type="text" // Disclaimer: Textfeld um alle Regeln zu erfüllen (z.B. , und . Regeln oder auch keine Buchstaben)
                    steps="0.000001"
                    placeholder="in Dezimalgrad"
                    register={register("longitude", {
                        ...validationRules.longitude,
                        setValueAs: (value: any) => {
                            if (typeof value === "string") {
                                return parseFloat(value.replace(",", "."));
                            }
                            return value;
                        },
                    })}
                    error={errors.longitude}
                    validation={undefined}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    label="Suchradius (km)"
                    type="number"
                    placeholder="Radius"
                    register={register("radius", validationRules.radius)}
                    error={errors.radius}
                    validation={undefined}
                />
                <FormInput
                    label="Anzahl der Stationen"
                    type="number"
                    placeholder="Anzahl"
                    register={register("stationCount", validationRules.stationCount)}
                    error={errors.stationCount}
                    validation={undefined}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    label="Startjahr"
                    type="number"
                    placeholder="Startjahr"
                    register={register("startYear", validationRules.startYear)}
                    error={errors.startYear}
                    validation={undefined}
                    steps={1}
                    maxLength={4}
                />
                <FormInput
                    label="Endjahr"
                    type="number"
                    placeholder="Endjahr"
                    register={register("endYear", validationRules.endYear)}
                    error={errors.endYear}
                    validation={undefined}
                    steps={1}
                    maxLength={4}
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 text-white !bg-purple-700 hover:!bg-purple-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                Wetterstation suchen
            </button>
        </form>
    );
};

export default Input;
