using futuro_lab.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configura Entity Framework Core
builder.Services.AddDbContext<FuturoLabContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FuturoLabConnection")));

builder.Services.AddControllers();

// Configura CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Api Explorer and Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Futuro Lab API",
        Version = "v1",
        Description = "API per la gestione del personale e dell'anagrafica dei rifiuti",
        Contact = new OpenApiContact
        {
            Name = "Futuro Lab",
            Url = new Uri("https://github.com/LucaAntoniolli/futuro-lab")
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Futuro Lab API v1");
        c.RoutePrefix = string.Empty; // Apre Swagger alla root dell'API
    });

    // Apri il browser all'avvio con l'URL dalla configurazione
    var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
    lifetime.ApplicationStarted.Register(() =>
    {
        var apiUrl = builder.Configuration["ApplicationUrls:ApplicationAPI"] ?? "http://localhost:5000";
        
        try
        {
            System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
            {
                FileName = apiUrl,
                UseShellExecute = true
            });
        }
        catch
        {
            // Se l'apertura automatica fallisce, l'API continua comunque a funzionare
        }
    });
}

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
