using System.Data.SQLite;

public class Database
{
    private static Database _SingletonInstance = null;
    private static string _DatabasePath = "C:\\dev\\PantryPal\\new backend\\data.db";

    private Database() { }

    public static Database Instance
    {
        get
        {
            if(_SingletonInstance == null)
            {
                _SingletonInstance = new Database();
            }

            return _SingletonInstance;
        }
    }

    public static void Execute(Action<SQLiteConnection> action)
    {
        var DatabaseContext = EstablishConnection();
        action(DatabaseContext);
        DatabaseContext.Close();
    }

    private static SQLiteConnection EstablishConnection()
    {
        string ConnectionString = $"Data Source={_DatabasePath}";

        var context = new SQLiteConnection(ConnectionString);
        context.Open();

        return context;
    }
}