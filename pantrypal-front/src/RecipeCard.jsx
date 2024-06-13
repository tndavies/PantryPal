import { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeCard(props) {
  const { title, notes, items, effort, ruid } = props.recipeInfo;
  const [modal, SetModal] = useState(false);

  //
  const deleteRecipe = () => {
    fetch("http://localhost:5000/recipe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ruid: ruid }),
    }).then((res) => {
      if (res.ok) {
        const filterCondition = (idxVal, idx) => idx != props.arrayID;
        props.SetRecipes((recipesArr) => recipesArr.filter(filterCondition));
      }
    });
  };
  //

  const setRecipeInfo = (newInfo) => {
    props.SetRecipes((recipesArr) => {
      let newArr = [...recipesArr];
      let self = newArr[props.arrayID];

      self.title = newInfo.title;
      self.notes = newInfo.notes;
      self.items = newInfo.items;
      self.effort = newInfo.effort;

      return newArr;
    });
  };

  return (
    <>
      {modal && (
        <RecipeModal
          btnLabel="Done"
          requestMethod="PATCH"
          stateFunc={SetModal}
          recipeInfo={props.recipeInfo}
          SetRecipes={props.SetRecipes}
          SetRecipeInfo={setRecipeInfo}
        />
      )}

      <div className="card">
        <div className="card-title">{title}</div>
        <div className="card-notes">{notes}</div>
        <div className="card-items">{items}</div>
        <div className="card-effort">{effort}</div>

        <div className="card-thumbnail" />

        <div className="card-btnContainer">
          <button
            className="card-btn edit-btn"
            type="button"
            onClick={() => SetModal(true)}
          >
            Edit
          </button>

          <button className="card-btn del-btn" type="button" onClick={deleteRecipe}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
