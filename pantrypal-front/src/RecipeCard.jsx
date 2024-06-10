
export default function RecipeCard(props) {

    const editRecipe = () => {return undefined};
    const deleteRecipe = () => {return undefined};

    return (
        <>
            <div className="card">
                <label>Title: {props.title}</label> <br />
                <label>Notes: {props.notes}</label> <br />
                <label>Effort Level: {props.effort}</label> <br />
                <h5>Items:</h5>
                <label>
                    {props.items.map(
                        (item,idx) => 
                            <p key={idx}>{`Item ${idx}: ${item}`}</p>
                        )}
                </label>

                <img className="recipe-thumbnail" src="https://www.allrecipes.com/thmb/4tLeVyFwUQ5Hj8-lv78MjhNagTw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg" />
                <br/>

                <button type="button" className="btn edit-btn" onClick={editRecipe}>Edit</button>
                <button type="button" className="btn del-btn" onClick={deleteRecipe}>Delete</button>
            </div>
        </>
    );
};