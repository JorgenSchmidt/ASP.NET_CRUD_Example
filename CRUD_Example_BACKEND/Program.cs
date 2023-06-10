using CRUD_Example.Core.Interfaces.Entities;
using CRUD_Example.DAL.NPGSQL;
using CRUD_Example.Data.PostgreeSQL.Services;
using Microsoft.EntityFrameworkCore;
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
builder.Services.AddDbContext<EfContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

// Configure
var app = builder.Build();
app.Logger.LogInformation("Log");
app.UseDeveloperExceptionPage();
app.UseRouting();
app.UseCors("Policy");
app.UseEndpoints(endpoints => endpoints.MapControllers());
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Run app
app.Run();