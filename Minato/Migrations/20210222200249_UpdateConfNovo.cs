using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class UpdateConfNovo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PrecoPorKm",
                table: "Configuracao",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrecoPorKm",
                table: "Configuracao");
        }
    }
}
