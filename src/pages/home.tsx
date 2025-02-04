import React from "react";
import Input from "../components/inputs";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center">
      <header className="text-white py-10 text-center all">
        <div className="text-8xl font-bold">ClimateLens</div>
        <div className="text-lg mt-2">Wetterstationen finden - Trends entdecken</div>
      </header>
      <div className=" w-[500px] p-2 mt-4">
        <Input />
      </div>
    </div>
  );
};

export default Main;
