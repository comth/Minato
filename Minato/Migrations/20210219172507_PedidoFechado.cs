using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class PedidoFechado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PedidoFechado",
                table: "Pedido",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PedidoFechado",
                table: "Pedido");
        }
    }
}
