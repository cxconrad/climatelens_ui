import React from "react";
import Header from "../layouts/header";
import Table from "../components/datatable";

const Table_View = () => {

    return (
        <div className="grid grid-cols-5 gap-3">
            <div className="col-span-5 h-30 float-left"><Header /></div>
            <div className="bg-purple-800">...</div>
            <div className="bg-white col-span-4"><Table /></div>
        </div>
    );
};

export default Table_View;