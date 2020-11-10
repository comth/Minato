using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class Localidade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Localidade",
                table: "Endereco",
                maxLength: 80,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Localidade",
                table: "Endereco");
        }
    }
}
