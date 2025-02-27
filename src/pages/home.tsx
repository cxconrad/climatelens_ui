/* Startseite der Anwendung mit Input-Formular */
import Input from "../components/inputs";

const home = () => {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center overflow-x-hidden">
      <header className="text-white py-10 text-center all">
        <div className="text-8xl font-bold">ClimateLens</div>
        <div className="text-lg mt-2">Wetterstationen finden - Trends entdecken</div>
      </header>
      <div className=" w-[500px] p-2 mt-4">
        <div className="relative group">
          <div
            role="button"
            className="h-4 px-120 text-xx !bg-transparent text-white focus:outline-none ring-0 border-0">
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
        <Input />
      </div>
    </div>
  );
};

export default home;
