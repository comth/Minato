using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class FlagsPedido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PedidoDelivery",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PedidoDelivery",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "PedidoRetirada",
                table: "Pedido");
        }
    }
}
