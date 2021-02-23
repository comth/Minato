using Microsoft.EntityFrameworkCore.Migrations;

namespace Minato.Migrations
{
    public partial class ConfEntrega : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PrecoEntrega",
                table: "Pedido",
                type: "decimal(3,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "CobrarEntrega",
                table: "Configuracao",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EntregaFixa",
                table: "Configuracao",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "ValorEntregaFixa",
                table: "Configuracao",
                type: "decimal(3,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrecoEntrega",
                table: "Pedido");

            migrationBuilder.DropColumn(
                name: "CobrarEntrega",
                table: "Configuracao");

            migrationBuilder.DropColumn(
                name: "EntregaFixa",
                table: "Configuracao");

            migrationBuilder.DropColumn(
                name: "ValorEntregaFixa",
                table: "Configuracao");
        }
    }
}
