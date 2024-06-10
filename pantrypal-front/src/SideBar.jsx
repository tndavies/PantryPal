import { useState } from "react";

export default function SideBar() {
    const [quick, SetQuick] = useState(false);
    const [medium, SetMedium] = useState(false);
    const [long, SetLong] = useState(false);

    const getEffortBtnStyle = (buttonState) => {
        return "btn effort-btn" + (buttonState ? " chosen" : "");
    };

    const submit = () => {
        const keywords = document.getElementById("keywords_field").value;
        console.log("Filters:", quick, medium, long, keywords);
    };

    return (
       <>
        <div id="sidebar">
                <label id="sidebar-title">PantryPal</label>
                <div id="sidebar-break" />

                <label className="sidebar-subtitle">Filter Recipes</label>
                <input type="text" className="form-control" id="keywords_field" placeholder="keywords"></input>

                <div>
                    <button type="button" onClick={()=>{SetQuick(!quick);}} className={getEffortBtnStyle(quick)}>Quick</button>
                    <button type="button" onClick={()=>{SetMedium(!medium);}} className={getEffortBtnStyle(medium)}>Medium</button>
                    <button type="button" onClick={()=>{SetLong(!long);}} className={getEffortBtnStyle(long)}>Long</button>
                </div>

                <button type="button" onClick={submit} className="btn filter-btn">Filter</button>

            </div>
        </>
    );
};