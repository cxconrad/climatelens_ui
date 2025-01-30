import React from "react";

const Button = ({ label }) => {
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
