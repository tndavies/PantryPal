using Microsoft.AspNetCore.Mvc;

[Route("/groceries")]
[ApiController]
public class Groceries : ControllerBase
{
    [HttpGet]
    public string GenerateGroceryList()
    {
        return "generating list ...";
    }
}