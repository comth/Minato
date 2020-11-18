using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class CorrecaoPedido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdEndereco",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "IdUsuario",
                table: "Pedido");

            migrationBuilder.AddColumn<bool>(
                name: "PedidoLocal",
                table: "Pedido",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PedidoLocal",
                table: "Pedido");

            migrationBuilder.AddColumn<int>(
                name: "IdEndereco",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdUsuario",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
