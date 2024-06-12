import { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeCard(props) {
    const [modal, SetModal] = useState(false);

    const deleteRecipe = () => {
        
        fetch('http://localhost:5000/recipe',
            {
                'method': 'DELETE',
                headers: {'Content-Type': 'application/json'},
                'body': JSON.stringify({'ruid': props.ruid})
            }
        ).then(res => {
            if(res.ok) {
                // props.SetRecipes(
                //     recipes => recipes.filter(
                //         (_,k) => (k != props.arrayID) 
                //     )
                // );
            }
        });

    };

    return (
        <>
            {modal && <RecipeModal 
                    btnLabel="Edit" 
                    requestMethod="PATCH" 
                    stateFunc={SetModal}
                    title={props.title}
                    notes={props.notes}
                    items={props.items}
                    effort={props.effort}
                    ruid={props.ruid}
                    SetRecipes={props.SetRecipes}
                />
            }

            <div className="card">
                <label>Title: {props.title}</label> <br />
                <label>Notes: {props.notes}</label> <br />
                <label>Effort Level: {props.effort}</label> <br />
                <label>Items: {props.items}</label>

                <img className="recipe-thumbnail" src="https://www.allrecipes.com/thmb/4tLeVyFwUQ5Hj8-lv78MjhNagTw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg" />
                <br/>

                <button type="button" className="btn edit-btn" onClick={()=>SetModal(true)}>Edit</button>
                <button type="button" className="btn del-btn" onClick={deleteRecipe}>Delete</button>
            </div>
        </>
    );
};