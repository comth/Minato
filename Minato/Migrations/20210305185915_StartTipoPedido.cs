using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class StartTipoPedido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TipoPedido",
                table: "Pedido",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoPedido",
                table: "Pedido");
        }
    }
}
