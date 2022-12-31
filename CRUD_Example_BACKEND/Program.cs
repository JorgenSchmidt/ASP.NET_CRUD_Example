using CRUD_Example.Core.Interfaces.Entities;
using CRUD_Example.Data.PostgreeSQL.Services;
using NLog.Web;

// Configure service
var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.WebHost.UseNLog();
builder.Services.AddMvc();
builder.Services.AddControllers();
builder.Services.AddScoped<ISurveyData, SurveyService>();
builder.Services.AddCors(opt => opt.AddPolicy("Policy",
    builder => builder.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("*")));

// Configure
var app = builder.Build();
app.Logger.LogInformation("Log");
app.UseDeveloperExceptionPage();
app.UseRouting();
app.UseCors("Policy");
app.UseEndpoints(endpoints => endpoints.MapControllers());

// Run app
app.Run();