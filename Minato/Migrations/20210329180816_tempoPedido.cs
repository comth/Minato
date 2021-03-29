using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class tempoPedido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TempoEntrega",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempoEntrega",
                table: "Pedido");
        }
    }
}
