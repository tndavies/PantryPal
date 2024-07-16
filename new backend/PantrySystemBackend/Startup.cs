using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

public class ServerConfiguration
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers().AddNewtonsoftJson();
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseRouting();
        app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
}

public class ServerApplication
{
    public static void Main(string[] args)
    {
        IHostBuilder host = Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(
                webBuilder => { webBuilder.UseStartup<ServerConfiguration>(); }
            );

        host.Build().Run();
    }
}