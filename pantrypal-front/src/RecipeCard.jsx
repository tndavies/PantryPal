import { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeCard(props) {
    const {title, notes, items, effort, ruid} = props.recipeInfo;
    const [modal, SetModal] = useState(false);

    //
    const deleteRecipe = () => {
        fetch('http://localhost:5000/recipe',
            {
                'method': 'DELETE',
                headers: {'Content-Type': 'application/json'},
                'body': JSON.stringify({'ruid': ruid})
            }
        ).then(res => {
            if(res.ok) {
                const filterCondition = (idxVal,idx) => (idx != props.arrayID) 
                props.SetRecipes( recipesArr => recipesArr.filter(filterCondition) );
            }
        });
    };
    //

    const setRecipeInfo = (newInfo) => {
        props.SetRecipes( recipesArr => {
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
            {modal && <RecipeModal 
                    btnLabel="Done" 
                    requestMethod="PATCH" 
                    stateFunc={SetModal}
                    recipeInfo={props.recipeInfo}
                    SetRecipes={props.SetRecipes}
                    SetRecipeInfo={setRecipeInfo}
                />
            }

            <div className="card">
                <label>Title: {title}</label> <br />
                <label>Notes: {notes}</label> <br />
                <label>Effort Level: {effort}</label> <br />
                <label>Items: {items}</label>

                <img className="recipe-thumbnail" src="https://www.allrecipes.com/thmb/4tLeVyFwUQ5Hj8-lv78MjhNagTw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg" />
                <br/>

                <button type="button" className="btn edit-btn" onClick={()=>SetModal(true)}>Edit</button>
                <button type="button" className="btn del-btn" onClick={deleteRecipe}>Delete</button>
            </div>
        </>
    );
};