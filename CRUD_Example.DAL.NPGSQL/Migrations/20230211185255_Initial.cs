using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CRUDExample.DAL.NPGSQL.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SurveyDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnomalyType = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SurveyValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CoordX = table.Column<double>(name: "Coord_X", type: "double precision", nullable: false),
                    CoordY = table.Column<double>(name: "Coord_Y", type: "double precision", nullable: false),
                    Value = table.Column<double>(type: "double precision", nullable: false),
                    SurveyDataId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyValues_SurveyDatas_SurveyDataId",
                        column: x => x.SurveyDataId,
                        principalTable: "SurveyDatas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyValues_SurveyDataId",
                table: "SurveyValues",
                column: "SurveyDataId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyValues");

            migrationBuilder.DropTable(
                name: "SurveyDatas");
        }
    }
}
