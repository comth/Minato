using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class TempoPreparo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TempoPreparo",
                table: "Produto",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempoPreparo",
                table: "Produto");
        }
    }
}
