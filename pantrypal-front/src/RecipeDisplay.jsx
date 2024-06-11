import { useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useState } from "react";

export default function RecipeDisplay(props) {

    return (
        <>
         <div id="content">
            <div id="cards-container">
            {
                props.recipes.map((recipe,k) => {
                    return <RecipeCard 
                        key={k}
                        arrayID={k}
                        title={recipe.title} 
                        notes={recipe.notes} 
                        items={recipe.items} 
                        effort={recipe.effort} 
                        ruid={recipe.ruid}
                        SetRecipes={props.SetRecipes}
                    />
                })
            }
            </div>
        </div>
        </>
    );
};