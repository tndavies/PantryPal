import { useState } from "react";

export default function RecipeModal(props) {

    const submit = () => {
        // Get data from modal.
        const modal = document.getElementById('myModal');
        const title = modal.querySelector('#title').value;
        const notes = modal.querySelector('#notes').value;
        const items = modal.querySelector('#items').value;
        const effort = parseInt(modal.querySelector('#effort').value);

        // Ensure data is valid.
        const validEffort = effort && [1,2,3].includes(effort);
        if(!title) { alert('Title required'); return; }
        if(!items) {alert('Items required'); return; }
        if(!validEffort) {alert('Effort Rating is required (1-3)'); return;}

        // Send request to server.
        fetch('http://localhost:5000/recipe', 
         {
            'method': props.requestMethod,
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({
                'title': title,
                'notes': notes,
                'items': items,
                'effort': effort,
                'ruid': props.ruid
            })
         }
        ).then(res => {
            if(!res.ok) {
                alert('Failed to add recipe!');
            }

            // update the content panel.
            switch(props.requestMethod) {
                case "POST": // adding recipe
                    // SetRecipes(recipes => {

                    // });
                break;

                case "PATCH": // editing recipe
                    break;
            }

            props.stateFunc(false);
        });

    };

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={()=>props.stateFunc(false)}>&times;</span>

                <label>Recipe Title</label> <br />
                <input type="text" id="title" defaultValue={props.title} required />
                <br /> <br />

                <label>Notes</label> <br />
                <input type="text" id="notes" defaultValue={props.notes} /> 
                <br /> <br />

                <label>Ingredients List</label> <br />
                <input type="text" id="items" defaultValue={props.items} required/>
                <br /> <br />

                <label>Effort Rating</label> <br />
                <input type="number" min='1' max='3' id="effort" defaultValue={props.effort} required/>
                <br /> <br />

                <button type="button" className="modal-button" onClick={submit}>{props.btnLabel}</button>

            </div>
        </div>
    );

}