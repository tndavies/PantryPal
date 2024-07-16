using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Linq;

public class Recipe
{
    [Required] public string Title { get; set; }
    [Required] public string ItemsString { get; set; }
    public string Description { get; set; }
    public int Flags { get; set; }
}

public class Database
{
    private static string _location = "C:\\dev\\PantryPal\\new backend\\data.db";

    private static SQLiteConnection EstablishConnection()
    {
        string ConnectionString = string.Format("Data Source={0}", _location);
        var context = new SQLiteConnection(ConnectionString);
        context.Open();

        return context;
    }

    public static void Execute(Action<SQLiteConnection> action)
    {
        var DatabaseContext = EstablishConnection();
        action(DatabaseContext);
        DatabaseContext.Close();
    }
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
    public string GetRecipes()
    {
        return "getting recipes ...";
    }
}
