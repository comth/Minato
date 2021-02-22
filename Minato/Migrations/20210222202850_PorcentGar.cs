using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class PorcentGar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CobrarPorcentGar",
                table: "Configuracao",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "PorcentGar",
                table: "Configuracao",
                type: "decimal(5,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CobrarPorcentGar",
                table: "Configuracao");

            migrationBuilder.DropColumn(
                name: "PorcentGar",
                table: "Configuracao");
        }
    }
}
