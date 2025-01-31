import React from "react";
import Header from "../layouts/header";
import Input from "../components/inputs";

const Main = () => {
    return (
        <div className="flex items-center justify-center min-h-screen gap-2">
            <Header />
            <Input />
        </div>
    );
};

export default Main;