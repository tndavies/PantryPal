import { useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useState } from "react";

export default function RecipeDisplay(props) {

    return (
        <>
         <div id="content">
            <div id="cards-container">
            {
                props.recipes.map((recipe,idx) => {
                    return <RecipeCard 
                        key={recipe.ruid}
                        SetRecipes={props.SetRecipes}
                        recipeInfo={recipe}
                        arrayID={idx}
                    />
                })
            }
            </div>
        </div>
        </>
    );
};