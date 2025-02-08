import React from "react";

interface ButtonProps {
    label: string;
}

const Button = ({ label }: ButtonProps) => {
    return (
        <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
        >
            {label}
        </button>
    );
};

export default Button;
