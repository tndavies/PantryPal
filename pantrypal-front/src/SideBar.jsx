import { useEffect, useState } from "react";
import RecipeModal from "./RecipeModal";

export default function SideBar(props) {
  const [modal, SetModal] = useState(false);

  const [quick, SetQuick] = useState(true);
  const [medium, SetMedium] = useState(true);
  const [long, SetLong] = useState(true);

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
        <div className="nav-title">PantryPal</div>

        <div className="search-container">
          <input
            className="nav-search"
            placeholder="keywords"
            id="keywords_field"
            type="text"
          />
          <button className="searchBtn" onClick={filter}>Search</button>

          <div className="fa-solid fa-filter fa-lg" />
        </div>

        <div
          className="newBtn fa-regular fa-square-plus fa-lg"
          onClick={() => SetModal(true)}
        />
      </nav>
    </>
  );
}
