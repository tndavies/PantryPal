
export default function RecipeModal() {

    return (
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>

                <label>Recipe Title</label> <br />
                <input type="text" required/>
                <br /> <br />

                <label>Notes</label> <br />
                <input type="text" /> 
                <br /> <br />

                <label>Ingredients List</label> <br />
                <input type="text" required/>
                <br /> <br />

                <label>Effort Rating</label> <br />
                <input type="number" min='1' max='3' required/>
                <br /> <br />

                <button type="button" class="modal-button">Submit</button>

            </div>
        </div>
    );

}