import { useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useState } from "react";

export default function RecipeDisplay(props) {
  return (
    <>
      <main>
        <div className="grid-container">
          {props.recipes.map((recipe, idx) => {
            return (
              <RecipeCard
                key={recipe.ruid}
                SetRecipes={props.SetRecipes}
                recipeInfo={recipe}
                arrayID={idx}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
