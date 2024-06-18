import { useEffect, useState } from "react";
import RecipeModal from "./RecipeModal";

export default function SideBar(props) {
  const [modal, SetModal] = useState(false);

  const [quick, SetQuick] = useState(true);
  const [medium, SetMedium] = useState(true);
  const [long, SetLong] = useState(true);

  const showFilterModal = (event) => {
    event.preventDefault();
    SetModal(true);
  };

  const filter = () => {
    const keywords = document.getElementById("keywords_field").value;

    let filters = new URLSearchParams();
    filters.append("keyitems", keywords);
    // filters.append(
    //   "efforts",
    //   JSON.stringify({ quick: quick, medium: medium, long: long })
    // );

    fetch(`http://localhost:5000?${filters.toString()}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => props.SetRecipes(data));
  };

  return (
    <>
      {modal && (
        <RecipeModal
          btnLabel="Add"
          requestMethod="POST"
          stateFunc={SetModal}
          SetRecipes={props.SetRecipes}
          recipeInfo={{}}
        />
      )}

      <nav>
        <h1>PantryPal</h1>

        <div className="search-box">
          <input
            placeholder="keywords"
            id="keywords_field"
            type="text"
          />
         
          <button onClick={filter} onContextMenu={(e)=>showFilterModal(e)}>Search</button>
        </div>

        <div className="action-box">
          <div className="fa-regular fa-square-plus fa-2xl" />
          <div className="fa-regular fa-square-plus fa-2xl" onClick={()=>{SetModal(true)}}/>
        </div>

      </nav>
    </>
  );
}
