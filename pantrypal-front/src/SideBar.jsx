import { useState } from "react";

export default function SideBar(props) {
    const [quick, SetQuick] = useState(true);
    const [medium, SetMedium] = useState(true);
    const [long, SetLong] = useState(true);

    const getEffortBtnStyle = (buttonState) => {
        return "btn effort-btn" + (buttonState ? " chosen" : "");
    };

    const submit = () => {
        const keywords = document.getElementById("keywords_field").value;
        
        let filters = new URLSearchParams();
        filters.append('keyitems', keywords);
        filters.append('efforts', JSON.stringify({'quick': quick, 'medium': medium, 'long': long}));

        fetch(`http://localhost:5000?${filters.toString()}`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            const SetRecipes = props.SetRecipes;
            console.log(data);
            SetRecipes(data);
          });
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