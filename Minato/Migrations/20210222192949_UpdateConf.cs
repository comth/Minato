using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class UpdateConf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CepRestaurante",
                table: "Configuracao",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KeyDistanceMatrix",
                table: "Configuracao",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NomeExibicao",
                table: "Configuracao",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CepRestaurante",
                table: "Configuracao");

            migrationBuilder.DropColumn(
                name: "KeyDistanceMatrix",
                table: "Configuracao");

            migrationBuilder.DropColumn(
                name: "NomeExibicao",
                table: "Configuracao");
        }
    }
}
