import { useEffect, useState } from "react";
import RecipeModal from "./RecipeModal";

export default function SideBar(props) {
    const [modal, SetModal] = useState(false);

    const [quick, SetQuick] = useState(true);
    const [medium, SetMedium] = useState(true);
    const [long, SetLong] = useState(true);

    const getEffortBtnStyle = (buttonState) => {
        return "btn effort-btn" + (buttonState ? " chosen" : "");
    };

    const filter = () => {
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
          .then(data => props.SetRecipes(data));
    };

    return (
       <>
        {modal && 
          <RecipeModal 
            btnLabel="Add" 
            requestMethod="POST" 
            stateFunc={SetModal}
            SetRecipes={props.SetRecipes}
            recipeInfo={{}}
          />
        }

        <div id="sidebar">
                <label id="sidebar-title">PantryPal</label>
                <div id="sidebar-break" />

                <label className="sidebar-subtitle">Add a Recipe</label>
                <button type="button" onClick={()=>SetModal(true)} className="btn filter-btn">New Recipe</button>
                <br />
                <br />

                <label className="sidebar-subtitle">Filter Recipes</label>
                <input type="text" className="form-control" id="keywords_field" placeholder="keywords"></input>

                <div>
                    <button type="button" onClick={()=>{SetQuick(!quick);}} className={getEffortBtnStyle(quick)}>Quick</button>
                    <button type="button" onClick={()=>{SetMedium(!medium);}} className={getEffortBtnStyle(medium)}>Medium</button>
                    <button type="button" onClick={()=>{SetLong(!long);}} className={getEffortBtnStyle(long)}>Long</button>
                </div>

                <button type="button" onClick={filter} className="btn filter-btn">Filter</button>

            </div>
        </>
    );
};