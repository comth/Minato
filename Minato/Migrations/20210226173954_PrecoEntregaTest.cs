using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class PrecoEntregaTest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrecoEntrega",
                table: "Pedido");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PrecoEntrega",
                table: "Pedido",
                type: "decimal(3,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
