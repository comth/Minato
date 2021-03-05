using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class FinishedTipoPedido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PedidoDelivery",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "PedidoLocal",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "PedidoRetirada",
                table: "Pedido");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PedidoDelivery",
                table: "Pedido",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PedidoLocal",
                table: "Pedido",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PedidoRetirada",
                table: "Pedido",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
