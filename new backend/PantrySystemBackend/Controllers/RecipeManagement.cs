using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
using System.ComponentModel.DataAnnotations;

public class Recipe
{
    public Recipe(int id, string title, string desc, string items, int flags)
    {
        ID = id;
        Title = title;
        Description = desc;
        ItemsString = items;
        Flags = flags;
    }

    [Required] public string Title { get; set; }
    [Required] public string ItemsString { get; set; }
    public string Description { get; set; }
    public int Flags { get; set; }
    public int ID { get; set; }
}

[Route("/recipes")]
[ApiController]
public class RecipeManagement : ControllerBase
{
    [HttpPost]
    public void StoreRecipe([FromBody] Recipe recipe)
    {
        Database.Execute((db) =>
        {
            SQLiteCommand query = new SQLiteCommand(
                 "INSERT INTO recipes (title,desc,items,flags) " +
                 "VALUES (@title,@desc,@items,@flags);",
            db);

            query.Parameters.AddWithValue("@title", recipe.Title);
            query.Parameters.AddWithValue("@desc", recipe.Description);
            query.Parameters.AddWithValue("@items", recipe.ItemsString);
            query.Parameters.AddWithValue("@flags", recipe.Flags);
        
            query.ExecuteNonQuery();
        });
    }

    [HttpPatch("{id}")]
    public void UpdateRecipe(int id, [FromBody] Recipe recipe)
    {
        Database.Execute((db) => 
        {
            SQLiteCommand query = new SQLiteCommand(
                "UPDATE recipes SET title=@title,desc=@desc," +
                "items=@items,flags=@flags WHERE id=@recipe_id;",
            db);

            query.Parameters.AddWithValue("@recipe_id", id);

            query.Parameters.AddWithValue("@title", recipe.Title);
            query.Parameters.AddWithValue("@desc", recipe.Description);
            query.Parameters.AddWithValue("@items", recipe.ItemsString);
            query.Parameters.AddWithValue("@flags", recipe.Flags);

            query.ExecuteNonQuery();
        });
    }

    [HttpDelete("{id}")]
    public void RemoveRecipe(int id)
    {
        Database.Execute((db) =>
        {
            SQLiteCommand query = new SQLiteCommand(
                "DELETE FROM recipes WHERE id=@recipe_id;", 
            db);

            query.Parameters.AddWithValue("@recipe_id", id);
            
            query.ExecuteNonQuery();
        });
    }

    [HttpGet]
    public List<Recipe> GetRecipes()
    {
        List<Recipe> recipes = new List<Recipe>();

        Database.Execute((db) => 
        { 
            SQLiteCommand query = new SQLiteCommand(
                "SELECT * FROM recipes;",
                db
            );

            var DataRows = query.ExecuteReader();
            while (DataRows.Read())
            {
                var ID = DataRows.GetInt32(0);
                var Title = DataRows.GetString(1);
                var Description = DataRows.GetString(2);
                var ItemsString = DataRows.GetString(3);
                var Flags = DataRows.GetInt32(4);

                recipes.Add(new Recipe(ID, Title, Description, ItemsString, Flags));
            }
        });

        return recipes;
    }
}
