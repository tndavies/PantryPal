import { useState } from "react";

export default function RecipeModal(props) {

    const {title, notes, items, effort, ruid} = props.recipeInfo;

    const submit = () => {
        // Get data from modal.
        const modal = document.getElementById('myModal');
        const editedTitle = modal.querySelector('#title').value;
        const editedNotes = modal.querySelector('#notes').value;
        const editedItems = modal.querySelector('#items').value;
        const editedEffort = parseInt(modal.querySelector('#effort').value);

        // Ensure data is valid.
        const validEffort = editedEffort && [1,2,3].includes(editedEffort);
        if(!editedTitle) { alert('Title required'); return; }
        if(!editedItems) {alert('Items required'); return; }
        if(!validEffort) {alert('Effort Rating is required (1-3)'); return;}

        // Send request to server.
        fetch('http://localhost:5000/recipe', 
         {
            'method': props.requestMethod,
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({
                'title': editedTitle,
                'notes': editedNotes,
                'items': editedItems,
                'effort': editedEffort,
                'ruid': ruid // only matters for patch requests.
            })
         }
        ).then(res => {
            if(!res.ok) {
                alert('Failed to add recipe!');
                // throw new Error();
            }
            else return res.json();
        })
        .then(recipeEcho => {
            switch(props.requestMethod) {
                case 'POST':
                    props.SetRecipes(recipeArr => [...recipeArr, recipeEcho]);
                    break;

                case 'PATCH':
                    const newRecipeInfo = {
                        'title': editedTitle, 
                        'notes': editedNotes,
                        'items': editedItems,
                        'effort': editedEffort,
                    }
                    props.SetRecipeInfo(newRecipeInfo);
                    break;
            }
        })
        .catch(err => alert(err))
        .finally(()=>props.stateFunc(false));

    };

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={()=>props.stateFunc(false)}>&times;</span>

                <label>Recipe Title</label> <br />
                <input type="text" id="title" defaultValue={title} required />
                <br /> <br />

                <label>Notes</label> <br />
                <input type="text" id="notes" defaultValue={notes} /> 
                <br /> <br />

                <label>Ingredients List</label> <br />
                <input type="text" id="items" defaultValue={items} required/>
                <br /> <br />

                <label>Effort Rating</label> <br />
                <input type="number" min='1' max='3' id="effort" defaultValue={effort} required/>
                <br /> <br />

                <button type="button" className="modal-button" onClick={submit}>{props.btnLabel}</button>

            </div>
        </div>
    );

}