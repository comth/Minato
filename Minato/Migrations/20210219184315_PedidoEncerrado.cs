using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class PedidoEncerrado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PedidoFechado",
                table: "Pedido",
                newName: "PedidoEncerrado");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PedidoEncerrado",
                table: "Pedido",
                newName: "PedidoFechado");
        }
    }
}
