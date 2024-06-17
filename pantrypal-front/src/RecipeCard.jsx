import { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeCard(props) {
  const { title, notes, items, effort, ruid } = props.recipeInfo;
  const [modal, SetModal] = useState(false);

  //
  const deleteRecipe = () => {
    const userCheck = confirm("Are you sure you wish to delete this recipe?");
    if (!userCheck) return;

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

  const getFooterCol = () => {
    switch (effort) {
      case 1:
        return "effort-quick";
      case 2:
        return "effort-medium";
      case 3:
        return "effort-long";
      default:
        return "";
    }
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

      <div className="card" onClick={()=>{SetModal(true)}}>
        <div className="card-header">
          <h1>{title}</h1>

          <span className="card-btns">
            <div
              className="delBtn fa-regular fa-trash-can fa-lg"
              onClick={deleteRecipe}
            />
          </span>
        </div>
        
        <div className="card-main">
          <div className="card-notes">{notes}</div>
          <div className="card-thumbnail">
            <img src='https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
          </div>
        </div>

        <div className="card-footer">
          <div className="card-items">{items}</div>
          <div className={"card-bar " + getFooterCol()} />
        </div>
      </div>
    </>
  );
}
